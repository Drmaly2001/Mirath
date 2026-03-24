/**
 * العملات المدعومة في التطبيق
 */

export type CurrencyCode =
  | "SAR"
  | "AED"
  | "KWD"
  | "BHD"
  | "OMR"
  | "QAR"
  | "EGP"
  | "JOD"
  | "IQD"
  | "SDG"
  | "USD";

export interface CurrencyInfo {
  label: string;
  symbol: string;
  rateToUSD: number; // سعر صرف تقريبي مقابل الدولار (لحساب الذهب)
}

export const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  SAR: { label: "ريال سعودي", symbol: "ر.س", rateToUSD: 3.75 },
  AED: { label: "درهم إماراتي", symbol: "د.إ", rateToUSD: 3.67 },
  KWD: { label: "دينار كويتي", symbol: "د.ك", rateToUSD: 0.31 },
  BHD: { label: "دينار بحريني", symbol: "د.ب", rateToUSD: 0.376 },
  OMR: { label: "ريال عماني", symbol: "ر.ع", rateToUSD: 0.385 },
  QAR: { label: "ريال قطري", symbol: "ر.ق", rateToUSD: 3.64 },
  EGP: { label: "جنيه مصري", symbol: "ج.م", rateToUSD: 50.0 },
  JOD: { label: "دينار أردني", symbol: "د.أ", rateToUSD: 0.709 },
  IQD: { label: "دينار عراقي", symbol: "د.ع", rateToUSD: 1310.0 },
  SDG: { label: "جنيه سوداني", symbol: "ج.س", rateToUSD: 601.0 },
  USD: { label: "دولار أمريكي", symbol: "$", rateToUSD: 1.0 },
};

export const DEFAULT_CURRENCY: CurrencyCode = "SAR";
