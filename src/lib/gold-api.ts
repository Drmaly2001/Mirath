/**
 * جلب سعر الذهب الحالي
 * يستخدم API مجاني ويحفظ النتيجة في sessionStorage
 */

import { type CurrencyCode, CURRENCIES } from "./currencies";

export interface GoldPriceResult {
  pricePerGramUSD: number;
  pricePerGram24K: number; // بالعملة المطلوبة
  timestamp: number;
  source: "api" | "cache" | "fallback";
}

const CACHE_KEY = "mirath_gold_price";
const CACHE_DURATION = 30 * 60 * 1000; // 30 دقيقة
const OUNCE_TO_GRAM = 31.1035;

// سعر تقريبي احتياطي (يُستخدم عند فشل API)
const FALLBACK_GOLD_USD_PER_OUNCE = 2650;

interface CachedPrice {
  pricePerOunceUSD: number;
  timestamp: number;
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

function setCache(pricePerOunceUSD: number) {
  try {
    const data: CachedPrice = { pricePerOunceUSD, timestamp: Date.now() };
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    // sessionStorage غير متاح
  }
}

/**
 * جلب سعر الذهب لكل غرام بالعملة المحددة
 */
export async function fetchGoldPrice(
  currency: CurrencyCode
): Promise<GoldPriceResult> {
  const rate = CURRENCIES[currency].rateToUSD;

  // التحقق من الكاش أولاً
  const cached = getCached();
  if (cached) {
    const pricePerGramUSD = cached.pricePerOunceUSD / OUNCE_TO_GRAM;
    return {
      pricePerGramUSD,
      pricePerGram24K: pricePerGramUSD * rate,
      timestamp: cached.timestamp,
      source: "cache",
    };
  }

  // محاولة جلب من API مجاني
  try {
    // API 1: goldpricez (لا يحتاج مفتاح)
    const res = await fetch(
      "https://data-asg.goldprice.org/dbXRates/USD",
      { signal: AbortSignal.timeout(5000) }
    );

    if (res.ok) {
      const data = await res.json();
      // هذا API يعيد السعر لكل أونصة
      const pricePerOunceUSD = data?.items?.[0]?.xauPrice ?? FALLBACK_GOLD_USD_PER_OUNCE;
      setCache(pricePerOunceUSD);

      const pricePerGramUSD = pricePerOunceUSD / OUNCE_TO_GRAM;
      return {
        pricePerGramUSD,
        pricePerGram24K: pricePerGramUSD * rate,
        timestamp: Date.now(),
        source: "api",
      };
    }
  } catch {
    // فشل API — نستخدم السعر الاحتياطي
  }

  // Fallback: سعر تقريبي
  const fallbackPerGram = FALLBACK_GOLD_USD_PER_OUNCE / OUNCE_TO_GRAM;
  return {
    pricePerGramUSD: fallbackPerGram,
    pricePerGram24K: fallbackPerGram * rate,
    timestamp: Date.now(),
    source: "fallback",
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
