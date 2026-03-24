/**
 * أنواع المحرك الفقهي لحساب المواريث الإسلامية
 */

/** أنواع الورثة */
export type HeirType =
  | "husband"
  | "wife"
  | "son"
  | "daughter"
  | "father"
  | "mother"
  | "paternal_grandfather"
  | "paternal_grandmother"
  | "maternal_grandmother"
  | "full_brother"
  | "full_sister"
  | "paternal_brother"
  | "paternal_sister"
  | "maternal_brother"
  | "maternal_sister"
  | "son_of_son"
  | "daughter_of_son";

/** كسر (بسط / مقام) */
export interface Fraction {
  num: number;
  den: number;
}

/** مدخلات وارث */
export interface HeirInput {
  type: HeirType;
  count: number;
}

/** مدخلات التركة */
export interface EstateInput {
  totalValue: number;
  debts: number;
  wasiyya: number;
  funeralCosts: number;
}

/** دليل فقهي */
export interface EvidenceItem {
  type: "quran" | "hadith" | "ijma" | "qiyas";
  source: string;
  text: string;
  explanation: string;
}

/** نوع النصيب */
export type ShareType = "fardh" | "asaba" | "fardh_and_asaba" | "radd";

/** نتيجة نصيب وارث واحد */
export interface ShareResult {
  heir: HeirType;
  count: number;
  shareType: ShareType;
  fraction: Fraction;
  amount: number;
  perPersonAmount: number;
  evidence: EvidenceItem[];
  explanation: string;
  hajbNote?: string;
}

/** معلومات الحجب */
export interface HajbInfo {
  heir: HeirType;
  blockedBy: HeirType;
  type: "hirman" | "nuqsan";
  explanation: string;
}

/** حالة خاصة مسماة */
export interface SpecialCaseInfo {
  id: string;
  name: string;
  nameArabic: string;
  description: string;
  resolution: string;
}

/** نتيجة الحساب الكاملة */
export interface CalculationResult {
  netEstate: number;
  shares: ShareResult[];
  totalAllocated: Fraction;
  awlApplied: boolean;
  awlDetails?: { originalBase: number; newBase: number };
  raddApplied: boolean;
  raddDetails?: { surplusFraction: Fraction; redistributedTo: HeirType[] };
  specialCase?: SpecialCaseInfo;
  hajbList: HajbInfo[];
  warnings: string[];
}

/** الأسماء العربية للورثة */
export const HEIR_LABELS: Record<HeirType, string> = {
  husband: "الزوج",
  wife: "الزوجة",
  son: "الابن",
  daughter: "البنت",
  father: "الأب",
  mother: "الأم",
  paternal_grandfather: "الجد لأب",
  paternal_grandmother: "الجدة لأب",
  maternal_grandmother: "الجدة لأم",
  full_brother: "الأخ الشقيق",
  full_sister: "الأخت الشقيقة",
  paternal_brother: "الأخ لأب",
  paternal_sister: "الأخت لأب",
  maternal_brother: "الأخ لأم",
  maternal_sister: "الأخت لأم",
  son_of_son: "ابن الابن",
  daughter_of_son: "بنت الابن",
};
