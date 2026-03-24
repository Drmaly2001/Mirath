/**
 * المحرك الرئيسي لحساب المواريث الإسلامية
 * يجمع بين جميع الوحدات: الحجب، الفروض، العصبة، العول، الرد، الحالات الخاصة
 */

import type {
  EstateInput,
  HeirInput,
  CalculationResult,
  ShareResult,
  HeirType,
  Fraction,
} from "./types";
import { validateInputs } from "./validators";
import { applyHajb, has } from "./hajb";
import { calculateFardh } from "./fardh";
import { determineAsaba, distributeAsaba } from "./asaba";
import { applyAwl } from "./awl";
import { applyRadd } from "./radd";
import { detectSpecialCase, handleSpecialCase } from "./special-cases";
import { getEvidence } from "./evidence";
import { frac, sum, subtract, compare, ONE, ZERO, toNumber, add } from "./fraction";

export function calculateInheritance(
  estate: EstateInput,
  heirs: HeirInput[]
): CalculationResult {
  // 1. التحقق من المدخلات
  const validation = validateInputs(estate, heirs);
  if (!validation.valid) {
    throw new Error(validation.errors.join("\n"));
  }

  // 2. حساب صافي التركة
  const netEstate =
    estate.totalValue - estate.debts - estate.funeralCosts - estate.wasiyya;

  // 3. كشف الحالات الخاصة
  const specialCase = detectSpecialCase(heirs);

  // 4. تطبيق الحجب
  const { remaining, blocked } = applyHajb(heirs);

  // 5. إذا حالة خاصة → معالجة خاصة
  if (specialCase) {
    const specialShares = handleSpecialCase(specialCase, remaining);
    const shares: ShareResult[] = specialShares.map((s) => ({
      heir: s.heir,
      count: s.count,
      shareType: "fardh",
      fraction: s.fraction,
      amount: toNumber(s.fraction) * netEstate,
      perPersonAmount: (toNumber(s.fraction) * netEstate) / s.count,
      evidence: getEvidence(s.heir),
      explanation: s.explanation,
    }));

    return {
      netEstate,
      shares,
      totalAllocated: sum(shares.map((s) => s.fraction)),
      awlApplied: false,
      raddApplied: false,
      specialCase,
      hajbList: blocked,
      warnings: [],
    };
  }

  // 6. حساب الفروض
  const fardhResults = calculateFardh(remaining);

  // 7. حساب مجموع الفروض
  const totalFardh = sum(fardhResults.map((s) => s.fraction));

  // 8. تحديد العصبة
  const fardhHeirTypes = fardhResults.map((s) => s.heir);
  const asabaResults = determineAsaba(remaining, fardhHeirTypes);

  // === معالجة الأب/الجد كصاحب فرض + تعصيب ===
  const fatherAsFardh = fardhResults.find((f) => f.heir === "father");
  const fatherIsAlsoAsaba =
    fatherAsFardh &&
    (has(remaining, "daughter") || has(remaining, "daughter_of_son")) &&
    !has(remaining, "son") &&
    !has(remaining, "son_of_son");

  // 9. العول (المجموع > 1 ولا عصبة أو العصبة من الأب مع الفرض)
  if (compare(totalFardh, ONE) > 0) {
    const awlResult = applyAwl(fardhResults);
    const shares: ShareResult[] = awlResult.adjustedShares.map((s) => ({
      heir: s.heir as HeirType,
      count: s.count,
      shareType: "fardh",
      fraction: s.fraction,
      amount: toNumber(s.fraction) * netEstate,
      perPersonAmount: (toNumber(s.fraction) * netEstate) / s.count,
      evidence: getEvidence(s.heir as HeirType),
      explanation: s.explanation,
    }));

    return {
      netEstate,
      shares,
      totalAllocated: sum(shares.map((s) => s.fraction)),
      awlApplied: true,
      awlDetails: {
        originalBase: awlResult.originalBase,
        newBase: awlResult.newBase,
      },
      raddApplied: false,
      hajbList: blocked,
      warnings: [
        `المسألة فيها عول: أصل المسألة ${awlResult.originalBase} عال إلى ${awlResult.newBase}`,
      ],
    };
  }

  // 10. توزيع الباقي على العصبة
  if (asabaResults.length > 0 || fatherIsAlsoAsaba) {
    const remainder = subtract(ONE, totalFardh);
    const allShares: ShareResult[] = [];

    // أنصبة أصحاب الفروض
    for (const f of fardhResults) {
      // الأب صاحب فرض + تعصيب: يأخذ السدس + الباقي
      if (f.heir === "father" && fatherIsAlsoAsaba && asabaResults.length === 0) {
        const totalFatherShare = add(f.fraction, remainder);
        allShares.push({
          heir: f.heir as HeirType,
          count: f.count,
          shareType: "fardh_and_asaba",
          fraction: totalFatherShare,
          amount: toNumber(totalFatherShare) * netEstate,
          perPersonAmount: toNumber(totalFatherShare) * netEstate,
          evidence: getEvidence(f.heir as HeirType),
          explanation: f.explanation + " + الباقي تعصيباً",
        });
      } else {
        allShares.push({
          heir: f.heir as HeirType,
          count: f.count,
          shareType: "fardh",
          fraction: f.fraction,
          amount: toNumber(f.fraction) * netEstate,
          perPersonAmount: (toNumber(f.fraction) * netEstate) / f.count,
          evidence: getEvidence(f.heir as HeirType),
          explanation: f.explanation,
        });
      }
    }

    // أنصبة العصبة (إذا لم يكن الأب هو العاصب الوحيد مع الفرض)
    if (asabaResults.length > 0) {
      const asabaShares = distributeAsaba(asabaResults, remainder);
      for (const a of asabaShares) {
        allShares.push({
          heir: a.heir,
          count: a.count,
          shareType: "asaba",
          fraction: a.fraction,
          amount: toNumber(a.fraction) * netEstate,
          perPersonAmount: (toNumber(a.fraction) * netEstate) / a.count,
          evidence: getEvidence(a.heir),
          explanation: a.explanation,
        });
      }
    }

    return {
      netEstate,
      shares: allShares,
      totalAllocated: sum(allShares.map((s) => s.fraction)),
      awlApplied: false,
      raddApplied: false,
      hajbList: blocked,
      warnings: [],
    };
  }

  // 11. الرد (المجموع < 1 ولا عصبة)
  if (compare(totalFardh, ONE) < 0) {
    const raddResult = applyRadd(fardhResults);
    const shares: ShareResult[] = raddResult.adjustedShares.map((s) => ({
      heir: s.heir as HeirType,
      count: s.count,
      shareType: raddResult.redistributedTo.includes(s.heir as HeirType) ? "radd" : "fardh",
      fraction: s.fraction,
      amount: toNumber(s.fraction) * netEstate,
      perPersonAmount: (toNumber(s.fraction) * netEstate) / s.count,
      evidence: getEvidence(s.heir as HeirType),
      explanation: s.explanation,
    }));

    const warnings: string[] = [];
    if (raddResult.redistributedTo.length === 0) {
      warnings.push("الفائض يعود لبيت المال (لا يوجد من يُرد عليه غير الزوج/الزوجة)");
    }

    return {
      netEstate,
      shares,
      totalAllocated: sum(shares.map((s) => s.fraction)),
      awlApplied: false,
      raddApplied: true,
      raddDetails: {
        surplusFraction: raddResult.surplusFraction,
        redistributedTo: raddResult.redistributedTo,
      },
      hajbList: blocked,
      warnings,
    };
  }

  // 12. التوزيع الدقيق (المجموع = 1 بالضبط)
  const shares: ShareResult[] = fardhResults.map((f) => ({
    heir: f.heir as HeirType,
    count: f.count,
    shareType: "fardh" as const,
    fraction: f.fraction,
    amount: toNumber(f.fraction) * netEstate,
    perPersonAmount: (toNumber(f.fraction) * netEstate) / f.count,
    evidence: getEvidence(f.heir as HeirType),
    explanation: f.explanation,
  }));

  return {
    netEstate,
    shares,
    totalAllocated: ONE,
    awlApplied: false,
    raddApplied: false,
    hajbList: blocked,
    warnings: [],
  };
}
