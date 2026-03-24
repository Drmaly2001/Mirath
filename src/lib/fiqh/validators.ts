/**
 * التحقق من صحة مدخلات حساب المواريث
 */

import type { EstateInput, HeirInput, HeirType } from "./types";

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateInputs(
  estate: EstateInput,
  heirs: HeirInput[]
): ValidationResult {
  const errors: string[] = [];

  // التحقق من التركة
  if (estate.totalValue <= 0) {
    errors.push("قيمة التركة يجب أن تكون أكبر من صفر");
  }
  if (estate.debts < 0) {
    errors.push("الديون لا يمكن أن تكون سالبة");
  }
  if (estate.funeralCosts < 0) {
    errors.push("تكاليف التجهيز لا يمكن أن تكون سالبة");
  }
  if (estate.wasiyya < 0) {
    errors.push("الوصية لا يمكن أن تكون سالبة");
  }

  const afterDebts = estate.totalValue - estate.debts - estate.funeralCosts;
  if (afterDebts <= 0) {
    errors.push("التركة لا تكفي لسداد الديون وتكاليف التجهيز");
  } else if (estate.wasiyya > afterDebts / 3) {
    errors.push("الوصية لا يجوز أن تتجاوز ثلث التركة بعد الديون");
  }

  // التحقق من الورثة
  if (heirs.length === 0) {
    errors.push("يجب إدخال وارث واحد على الأقل");
  }

  // لا يمكن أن يكون هناك زوج وزوجة معاً (المتوفى إما ذكر أو أنثى)
  const hasHusband = heirs.some((h) => h.type === "husband");
  const hasWife = heirs.some((h) => h.type === "wife");
  if (hasHusband && hasWife) {
    errors.push("لا يمكن أن يكون هناك زوج وزوجة معاً — المتوفى إما ذكر أو أنثى");
  }

  // عدد الزوجات لا يتجاوز 4
  const wifeEntry = heirs.find((h) => h.type === "wife");
  if (wifeEntry && wifeEntry.count > 4) {
    errors.push("عدد الزوجات لا يتجاوز أربعاً");
  }

  // الزوج واحد فقط
  const husbandEntry = heirs.find((h) => h.type === "husband");
  if (husbandEntry && husbandEntry.count > 1) {
    errors.push("الزوج لا يمكن أن يكون أكثر من واحد");
  }

  // الأب والأم واحد فقط
  for (const singleHeir of [
    "father",
    "mother",
    "paternal_grandfather",
  ] as HeirType[]) {
    const entry = heirs.find((h) => h.type === singleHeir);
    if (entry && entry.count > 1) {
      errors.push(`${singleHeir} لا يمكن أن يكون أكثر من واحد`);
    }
  }

  // التحقق من أن كل عدد موجب
  for (const heir of heirs) {
    if (heir.count <= 0) {
      errors.push(`عدد الورثة يجب أن يكون موجباً`);
    }
  }

  return { valid: errors.length === 0, errors };
}
