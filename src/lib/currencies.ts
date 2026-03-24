/**
 * العملات المدعومة في التطبيق
 * تشمل: الدول العربية + الأفريقية + الأوروبية + عملات عالمية رئيسية
 */

export type CurrencyCode = string;

export interface CurrencyInfo {
  label: string;
  symbol: string;
  rateToUSD: number;
  region: "arab" | "africa" | "europe" | "global";
}

export const CURRENCIES: Record<string, CurrencyInfo> = {
  // ═══════════════════════════════════
  // الدول العربية
  // ═══════════════════════════════════
  SAR: { label: "ريال سعودي", symbol: "ر.س", rateToUSD: 3.75, region: "arab" },
  AED: { label: "درهم إماراتي", symbol: "د.إ", rateToUSD: 3.67, region: "arab" },
  KWD: { label: "دينار كويتي", symbol: "د.ك", rateToUSD: 0.31, region: "arab" },
  BHD: { label: "دينار بحريني", symbol: "د.ب", rateToUSD: 0.376, region: "arab" },
  OMR: { label: "ريال عماني", symbol: "ر.ع", rateToUSD: 0.385, region: "arab" },
  QAR: { label: "ريال قطري", symbol: "ر.ق", rateToUSD: 3.64, region: "arab" },
  EGP: { label: "جنيه مصري", symbol: "ج.م", rateToUSD: 50.0, region: "arab" },
  JOD: { label: "دينار أردني", symbol: "د.أ", rateToUSD: 0.709, region: "arab" },
  IQD: { label: "دينار عراقي", symbol: "د.ع", rateToUSD: 1310.0, region: "arab" },
  SDG: { label: "جنيه سوداني", symbol: "ج.س", rateToUSD: 601.0, region: "arab" },
  SYP: { label: "ليرة سورية", symbol: "ل.س", rateToUSD: 13000.0, region: "arab" },
  LBP: { label: "ليرة لبنانية", symbol: "ل.ل", rateToUSD: 89500.0, region: "arab" },
  YER: { label: "ريال يمني", symbol: "ر.ي", rateToUSD: 250.0, region: "arab" },
  LYD: { label: "دينار ليبي", symbol: "د.ل", rateToUSD: 4.85, region: "arab" },
  TND: { label: "دينار تونسي", symbol: "د.ت", rateToUSD: 3.12, region: "arab" },
  DZD: { label: "دينار جزائري", symbol: "د.ج", rateToUSD: 135.0, region: "arab" },
  MAD: { label: "درهم مغربي", symbol: "د.م", rateToUSD: 10.0, region: "arab" },
  MRU: { label: "أوقية موريتانية", symbol: "أ.م", rateToUSD: 39.7, region: "arab" },
  SOS: { label: "شلن صومالي", symbol: "ش.ص", rateToUSD: 571.0, region: "arab" },
  DJF: { label: "فرنك جيبوتي", symbol: "ف.ج", rateToUSD: 177.7, region: "arab" },
  KMF: { label: "فرنك قمري", symbol: "ف.ق", rateToUSD: 452.0, region: "arab" },
  PSE: { label: "شيكل فلسطيني", symbol: "₪", rateToUSD: 3.65, region: "arab" },

  // ═══════════════════════════════════
  // الدول الأفريقية (غير العربية)
  // ═══════════════════════════════════
  NGN: { label: "نايرا نيجيري", symbol: "₦", rateToUSD: 1550.0, region: "africa" },
  ZAR: { label: "راند جنوب أفريقي", symbol: "R", rateToUSD: 18.2, region: "africa" },
  KES: { label: "شلن كيني", symbol: "KSh", rateToUSD: 129.0, region: "africa" },
  GHS: { label: "سيدي غاني", symbol: "₵", rateToUSD: 15.5, region: "africa" },
  ETB: { label: "بر إثيوبي", symbol: "Br", rateToUSD: 127.0, region: "africa" },
  TZS: { label: "شلن تنزاني", symbol: "TSh", rateToUSD: 2650.0, region: "africa" },
  UGX: { label: "شلن أوغندي", symbol: "USh", rateToUSD: 3750.0, region: "africa" },
  XOF: { label: "فرنك غرب أفريقي (CFA)", symbol: "CFA", rateToUSD: 605.0, region: "africa" },
  XAF: { label: "فرنك وسط أفريقي (CFA)", symbol: "FCFA", rateToUSD: 605.0, region: "africa" },
  RWF: { label: "فرنك رواندي", symbol: "RF", rateToUSD: 1370.0, region: "africa" },
  MZN: { label: "ميتيكال موزمبيقي", symbol: "MT", rateToUSD: 63.9, region: "africa" },
  AOA: { label: "كوانزا أنغولي", symbol: "Kz", rateToUSD: 920.0, region: "africa" },
  ZMW: { label: "كواشا زامبي", symbol: "ZK", rateToUSD: 27.5, region: "africa" },
  BWP: { label: "بولا بوتسواني", symbol: "P", rateToUSD: 13.7, region: "africa" },
  MWK: { label: "كواشا مالاوي", symbol: "MK", rateToUSD: 1740.0, region: "africa" },
  GMD: { label: "دلاسي غامبي", symbol: "D", rateToUSD: 72.0, region: "africa" },
  SLL: { label: "ليون سيراليوني", symbol: "Le", rateToUSD: 22800.0, region: "africa" },
  ERN: { label: "ناكفا إريتري", symbol: "Nfk", rateToUSD: 15.0, region: "africa" },
  SCR: { label: "روبية سيشلية", symbol: "₨", rateToUSD: 14.3, region: "africa" },
  MUR: { label: "روبية موريشية", symbol: "₨", rateToUSD: 46.0, region: "africa" },
  CVE: { label: "إسكودو رأس أخضر", symbol: "$", rateToUSD: 101.5, region: "africa" },

  // ═══════════════════════════════════
  // الدول الأوروبية
  // ═══════════════════════════════════
  EUR: { label: "يورو", symbol: "€", rateToUSD: 0.92, region: "europe" },
  GBP: { label: "جنيه إسترليني", symbol: "£", rateToUSD: 0.79, region: "europe" },
  CHF: { label: "فرنك سويسري", symbol: "CHF", rateToUSD: 0.88, region: "europe" },
  SEK: { label: "كرونة سويدية", symbol: "kr", rateToUSD: 10.5, region: "europe" },
  NOK: { label: "كرونة نرويجية", symbol: "kr", rateToUSD: 10.9, region: "europe" },
  DKK: { label: "كرونة دنماركية", symbol: "kr", rateToUSD: 6.88, region: "europe" },
  PLN: { label: "زلوتي بولندي", symbol: "zł", rateToUSD: 4.0, region: "europe" },
  CZK: { label: "كرونة تشيكية", symbol: "Kč", rateToUSD: 23.5, region: "europe" },
  HUF: { label: "فورنت مجري", symbol: "Ft", rateToUSD: 375.0, region: "europe" },
  RON: { label: "لي روماني", symbol: "lei", rateToUSD: 4.6, region: "europe" },
  BGN: { label: "ليف بلغاري", symbol: "лв", rateToUSD: 1.8, region: "europe" },
  HRK: { label: "كونا كرواتي", symbol: "kn", rateToUSD: 7.0, region: "europe" },
  RSD: { label: "دينار صربي", symbol: "din", rateToUSD: 108.0, region: "europe" },
  ISK: { label: "كرونة آيسلندية", symbol: "kr", rateToUSD: 137.0, region: "europe" },
  TRY: { label: "ليرة تركية", symbol: "₺", rateToUSD: 38.5, region: "europe" },
  UAH: { label: "هريفنا أوكرانية", symbol: "₴", rateToUSD: 41.5, region: "europe" },
  GEL: { label: "لاري جورجي", symbol: "₾", rateToUSD: 2.75, region: "europe" },
  MDL: { label: "لي مولدوفي", symbol: "L", rateToUSD: 17.8, region: "europe" },
  ALL: { label: "ليك ألباني", symbol: "L", rateToUSD: 93.0, region: "europe" },
  MKD: { label: "دينار مقدوني", symbol: "ден", rateToUSD: 57.0, region: "europe" },
  BAM: { label: "مارك بوسني", symbol: "KM", rateToUSD: 1.8, region: "europe" },
  RUB: { label: "روبل روسي", symbol: "₽", rateToUSD: 92.0, region: "europe" },

  // ═══════════════════════════════════
  // عملات عالمية رئيسية
  // ═══════════════════════════════════
  USD: { label: "دولار أمريكي", symbol: "$", rateToUSD: 1.0, region: "global" },
  CAD: { label: "دولار كندي", symbol: "C$", rateToUSD: 1.37, region: "global" },
  AUD: { label: "دولار أسترالي", symbol: "A$", rateToUSD: 1.55, region: "global" },
  JPY: { label: "ين ياباني", symbol: "¥", rateToUSD: 154.0, region: "global" },
  CNY: { label: "يوان صيني", symbol: "¥", rateToUSD: 7.24, region: "global" },
  INR: { label: "روبية هندية", symbol: "₹", rateToUSD: 84.0, region: "global" },
  PKR: { label: "روبية باكستانية", symbol: "₨", rateToUSD: 278.0, region: "global" },
  BDT: { label: "تاكا بنغلاديشية", symbol: "৳", rateToUSD: 121.0, region: "global" },
  MYR: { label: "رينغيت ماليزي", symbol: "RM", rateToUSD: 4.47, region: "global" },
  IDR: { label: "روبية إندونيسية", symbol: "Rp", rateToUSD: 15800.0, region: "global" },
  BRL: { label: "ريال برازيلي", symbol: "R$", rateToUSD: 5.8, region: "global" },
};

export const REGION_LABELS: Record<string, string> = {
  arab: "الدول العربية",
  africa: "أفريقيا",
  europe: "أوروبا",
  global: "عملات عالمية",
};

export const DEFAULT_CURRENCY: CurrencyCode = "SAR";
