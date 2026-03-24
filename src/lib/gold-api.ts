/**
 * جلب سعر الذهب الحالي من مصادر متعددة
 * يحاول عدة APIs ويحفظ النتيجة في sessionStorage
 */

import { type CurrencyCode, CURRENCIES } from "./currencies";

export interface GoldPriceResult {
  pricePerGramUSD: number;
  pricePerGram24K: number;
  timestamp: number;
  source: "frankfurter" | "exchangerate" | "cache" | "fallback";
  sourceName: string;
}

const CACHE_KEY = "mirath_gold_price";
const CACHE_DURATION = 30 * 60 * 1000; // 30 دقيقة
const OUNCE_TO_GRAM = 31.1035;

// سعر الذهب التقريبي بالدولار للأونصة (يُحدّث دورياً كـ fallback)
const FALLBACK_GOLD_USD_PER_OUNCE = 3020;

interface CachedPrice {
  pricePerOunceUSD: number;
  timestamp: number;
  sourceName: string;
}

function getCached(): CachedPrice | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cached: CachedPrice = JSON.parse(raw);
    if (Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached;
    }
    return null;
  } catch {
    return null;
  }
}

function setCache(pricePerOunceUSD: number, sourceName: string) {
  try {
    const data: CachedPrice = { pricePerOunceUSD, timestamp: Date.now(), sourceName };
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    // sessionStorage غير متاح
  }
}

/**
 * محاولة 1: Frankfurter API (مجاني بالكامل، بدون مفتاح)
 * يجلب سعر XAU بالدولار عبر أسعار العملات
 */
async function tryFrankfurter(): Promise<number | null> {
  try {
    const res = await fetch(
      "https://api.frankfurter.dev/v1/latest?base=XAU&symbols=USD",
      { signal: AbortSignal.timeout(8000) }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const usdPerOunce = data?.rates?.USD;
    if (usdPerOunce && usdPerOunce > 500) return usdPerOunce;
    return null;
  } catch {
    return null;
  }
}

/**
 * محاولة 2: Exchange Rate API (مجاني، يعطي XAU/USD)
 */
async function tryExchangeRate(): Promise<number | null> {
  try {
    const res = await fetch(
      "https://open.er-api.com/v6/latest/XAU",
      { signal: AbortSignal.timeout(8000) }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const usdPerOunce = data?.rates?.USD;
    if (usdPerOunce && usdPerOunce > 500) return usdPerOunce;
    return null;
  } catch {
    return null;
  }
}

/**
 * جلب سعر الذهب لكل غرام بالعملة المحددة
 */
export async function fetchGoldPrice(
  currency: CurrencyCode
): Promise<GoldPriceResult> {
  const rate = CURRENCIES[currency]?.rateToUSD ?? 1;

  // 1. التحقق من الكاش
  const cached = getCached();
  if (cached) {
    const pricePerGramUSD = cached.pricePerOunceUSD / OUNCE_TO_GRAM;
    return {
      pricePerGramUSD,
      pricePerGram24K: pricePerGramUSD * rate,
      timestamp: cached.timestamp,
      source: "cache",
      sourceName: cached.sourceName + " (محفوظ مؤقتاً)",
    };
  }

  // 2. محاولة Frankfurter API
  const frankfurterPrice = await tryFrankfurter();
  if (frankfurterPrice) {
    setCache(frankfurterPrice, "Frankfurter API — البنك المركزي الأوروبي");
    const pricePerGramUSD = frankfurterPrice / OUNCE_TO_GRAM;
    return {
      pricePerGramUSD,
      pricePerGram24K: pricePerGramUSD * rate,
      timestamp: Date.now(),
      source: "frankfurter",
      sourceName: "Frankfurter API — البنك المركزي الأوروبي",
    };
  }

  // 3. محاولة Exchange Rate API
  const erPrice = await tryExchangeRate();
  if (erPrice) {
    setCache(erPrice, "Exchange Rate API — Open ER");
    const pricePerGramUSD = erPrice / OUNCE_TO_GRAM;
    return {
      pricePerGramUSD,
      pricePerGram24K: pricePerGramUSD * rate,
      timestamp: Date.now(),
      source: "exchangerate",
      sourceName: "Exchange Rate API — Open ER",
    };
  }

  // 4. Fallback: سعر تقريبي ثابت
  const fallbackPerGram = FALLBACK_GOLD_USD_PER_OUNCE / OUNCE_TO_GRAM;
  return {
    pricePerGramUSD: fallbackPerGram,
    pricePerGram24K: fallbackPerGram * rate,
    timestamp: Date.now(),
    source: "fallback",
    sourceName: "سعر تقريبي (تعذّر الاتصال بالإنترنت)",
  };
}

/**
 * حساب سعر الغرام لعيار معين من سعر عيار 24
 */
export function priceForKarat(price24K: number, karat: number): number {
  return (price24K * karat) / 24;
}

/**
 * العيارات المدعومة
 */
export const GOLD_KARATS = [24, 22, 21, 18] as const;
export type GoldKarat = (typeof GOLD_KARATS)[number];
