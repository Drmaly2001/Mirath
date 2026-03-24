/**
 * حساب العصبة (الورثة بالتعصيب)
 * العصبة: من يأخذ الباقي بعد أصحاب الفروض
 * ثلاثة أنواع: عصبة بالنفس، عصبة بالغير، عصبة مع الغير
 */

import type { HeirInput, HeirType, Fraction } from "./types";
import { has, countOf } from "./hajb";
import { frac } from "./fraction";

export interface AsabaResult {
  heir: HeirType;
  count: number;
  maleCount: number;
  femaleCount: number;
  ratio: number; // نسبة الحصة لكل شخص (ذكر = 2، أنثى = 1 في العصبة بالغير)
  explanation: string;
}

/**
 * تحديد العصبة من بين الورثة المتبقين (بعد الحجب)
 * الترتيب: الابن > ابن الابن > الأب > الجد > الأخ الشقيق > الأخ لأب ...
 */
export function determineAsaba(
  heirs: HeirInput[],
  fardhHeirTypes: HeirType[]
): AsabaResult[] {
  const results: AsabaResult[] = [];

  // === 1. عصبة بالنفس + عصبة بالغير (الابن مع البنت) ===

  // الابن (عصبة بالنفس) — والبنت معه عصبة بالغير
  if (has(heirs, "son")) {
    const sons = countOf(heirs, "son");
    const daughters = has(heirs, "daughter") ? countOf(heirs, "daughter") : 0;
    if (daughters > 0) {
      results.push({
        heir: "son",
        count: sons + daughters,
        maleCount: sons,
        femaleCount: daughters,
        ratio: 2, // للذكر مثل حظ الأنثيين
        explanation: "الأبناء والبنات: للذكر مثل حظ الأنثيين",
      });
    } else {
      results.push({
        heir: "son",
        count: sons,
        maleCount: sons,
        femaleCount: 0,
        ratio: 1,
        explanation: "الابن عصبة بالنفس",
      });
    }
    return results; // الابن يحجب من دونه في العصبة
  }

  // ابن الابن (+ بنت الابن)
  if (has(heirs, "son_of_son")) {
    const sons = countOf(heirs, "son_of_son");
    const daughters = has(heirs, "daughter_of_son")
      ? countOf(heirs, "daughter_of_son")
      : 0;
    if (daughters > 0) {
      results.push({
        heir: "son_of_son",
        count: sons + daughters,
        maleCount: sons,
        femaleCount: daughters,
        ratio: 2,
        explanation: "أبناء وبنات الابن: للذكر مثل حظ الأنثيين",
      });
    } else {
      results.push({
        heir: "son_of_son",
        count: sons,
        maleCount: sons,
        femaleCount: 0,
        ratio: 1,
        explanation: "ابن الابن عصبة بالنفس",
      });
    }
    return results;
  }

  // الأب (عصبة بالنفس عند عدم وجود الفرع الوارث)
  // ملاحظة: إذا كان الأب صاحب فرض + تعصيب (مع بنت)، يُعالج بشكل خاص في engine.ts
  if (has(heirs, "father") && !fardhHeirTypes.includes("father")) {
    results.push({
      heir: "father",
      count: 1,
      maleCount: 1,
      femaleCount: 0,
      ratio: 1,
      explanation: "الأب عصبة بالنفس (لا فرع وارث)",
    });
    return results;
  }

  // الجد (مثل الأب عند عدم وجوده)
  if (has(heirs, "paternal_grandfather") && !fardhHeirTypes.includes("paternal_grandfather")) {
    results.push({
      heir: "paternal_grandfather",
      count: 1,
      maleCount: 1,
      femaleCount: 0,
      ratio: 1,
      explanation: "الجد عصبة بالنفس",
    });
    return results;
  }

  // === 2. عصبة مع الغير (الأخوات مع البنات) ===
  const hasDaughters = has(heirs, "daughter") || has(heirs, "daughter_of_son");

  // الأخ الشقيق (+ الأخت الشقيقة عصبة بالغير)
  if (has(heirs, "full_brother")) {
    const brothers = countOf(heirs, "full_brother");
    const sisters = has(heirs, "full_sister") ? countOf(heirs, "full_sister") : 0;
    if (sisters > 0) {
      results.push({
        heir: "full_brother",
        count: brothers + sisters,
        maleCount: brothers,
        femaleCount: sisters,
        ratio: 2,
        explanation: "الإخوة والأخوات الأشقاء: للذكر مثل حظ الأنثيين",
      });
    } else {
      results.push({
        heir: "full_brother",
        count: brothers,
        maleCount: brothers,
        femaleCount: 0,
        ratio: 1,
        explanation: "الأخ الشقيق عصبة بالنفس",
      });
    }
    return results;
  }

  // الأخت الشقيقة (عصبة مع الغير — مع البنات)
  if (has(heirs, "full_sister") && hasDaughters) {
    results.push({
      heir: "full_sister",
      count: countOf(heirs, "full_sister"),
      maleCount: 0,
      femaleCount: countOf(heirs, "full_sister"),
      ratio: 1,
      explanation: "الأخت الشقيقة عصبة مع الغير (مع البنات)",
    });
    return results;
  }

  // الأخ لأب (+ الأخت لأب)
  if (has(heirs, "paternal_brother")) {
    const brothers = countOf(heirs, "paternal_brother");
    const sisters = has(heirs, "paternal_sister") ? countOf(heirs, "paternal_sister") : 0;
    if (sisters > 0) {
      results.push({
        heir: "paternal_brother",
        count: brothers + sisters,
        maleCount: brothers,
        femaleCount: sisters,
        ratio: 2,
        explanation: "الإخوة والأخوات لأب: للذكر مثل حظ الأنثيين",
      });
    } else {
      results.push({
        heir: "paternal_brother",
        count: brothers,
        maleCount: brothers,
        femaleCount: 0,
        ratio: 1,
        explanation: "الأخ لأب عصبة بالنفس",
      });
    }
    return results;
  }

  // الأخت لأب (عصبة مع الغير — مع البنات)
  if (has(heirs, "paternal_sister") && hasDaughters) {
    results.push({
      heir: "paternal_sister",
      count: countOf(heirs, "paternal_sister"),
      maleCount: 0,
      femaleCount: countOf(heirs, "paternal_sister"),
      ratio: 1,
      explanation: "الأخت لأب عصبة مع الغير (مع البنات)",
    });
    return results;
  }

  return results;
}

/**
 * توزيع الباقي على العصبة
 * ratio=2 يعني للذكر مثل حظ الأنثيين
 */
export function distributeAsaba(
  asabaResults: AsabaResult[],
  remainder: Fraction
): { heir: HeirType; count: number; fraction: Fraction; explanation: string }[] {
  if (asabaResults.length === 0) return [];

  // في الغالب يكون هناك مجموعة عصبة واحدة (بسبب قاعدة الأقرب)
  const group = asabaResults[0];
  const totalShares = group.maleCount * group.ratio + group.femaleCount;

  const results: { heir: HeirType; count: number; fraction: Fraction; explanation: string }[] = [];

  if (group.femaleCount > 0 && group.ratio === 2) {
    // مجموعة مختلطة ذكور وإناث
    // حصة الذكور
    const maleTotal = frac(remainder.num * group.maleCount * 2, remainder.den * totalShares);
    results.push({
      heir: group.heir,
      count: group.maleCount,
      fraction: maleTotal,
      explanation: group.explanation,
    });

    // حصة الإناث — نحدد النوع
    const femaleType = getFemaleCounterpart(group.heir);
    const femaleTotal = frac(remainder.num * group.femaleCount, remainder.den * totalShares);
    results.push({
      heir: femaleType,
      count: group.femaleCount,
      fraction: femaleTotal,
      explanation: group.explanation,
    });
  } else {
    results.push({
      heir: group.heir,
      count: group.count,
      fraction: remainder,
      explanation: group.explanation,
    });
  }

  return results;
}

function getFemaleCounterpart(maleHeir: HeirType): HeirType {
  switch (maleHeir) {
    case "son": return "daughter";
    case "son_of_son": return "daughter_of_son";
    case "full_brother": return "full_sister";
    case "paternal_brother": return "paternal_sister";
    default: return maleHeir;
  }
}
