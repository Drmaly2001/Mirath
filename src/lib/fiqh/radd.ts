/**
 * الرد — إعادة توزيع الفائض عندما لا يستغرق أصحاب الفروض التركة ولا يوجد عصبة
 * القاعدة: الفائض يُرد على أصحاب الفروض تناسبياً، ما عدا الزوج/الزوجة
 */

import type { Fraction, HeirType } from "./types";
import { frac, subtract, ONE, sum, multiply, add, ZERO, toNumber } from "./fraction";

interface FardhEntry {
  heir: string;
  count: number;
  fraction: Fraction;
  explanation: string;
}

export interface RaddResult {
  adjustedShares: FardhEntry[];
  surplusFraction: Fraction;
  redistributedTo: HeirType[];
}

/**
 * تطبيق الرد
 * 1. حساب الفائض = 1 - مجموع الفروض
 * 2. تحديد أصحاب الفروض المستحقين للرد (ما عدا الزوج/الزوجة)
 * 3. توزيع الفائض تناسبياً حسب فروضهم
 */
export function applyRadd(fardhShares: FardhEntry[]): RaddResult {
  const totalFardh = sum(fardhShares.map((s) => s.fraction));
  const surplus = subtract(ONE, totalFardh);

  // الزوج والزوجة لا يُرد عليهما (على مذهب الجمهور)
  const spouseTypes: string[] = ["husband", "wife"];
  const nonSpouseShares = fardhShares.filter((s) => !spouseTypes.includes(s.heir));
  const spouseShares = fardhShares.filter((s) => spouseTypes.includes(s.heir));

  // إذا لم يكن هناك أصحاب فروض غير الزوج/الزوجة، الفائض لبيت المال
  if (nonSpouseShares.length === 0) {
    return {
      adjustedShares: fardhShares,
      surplusFraction: surplus,
      redistributedTo: [],
    };
  }

  // مجموع فروض غير الأزواج
  const nonSpouseTotal = sum(nonSpouseShares.map((s) => s.fraction));

  // توزيع الفائض تناسبياً
  const adjustedNonSpouse = nonSpouseShares.map((share) => {
    // نسبة هذا الوارث من إجمالي فروض غير الأزواج
    const proportion = frac(
      share.fraction.num * nonSpouseTotal.den,
      share.fraction.den * nonSpouseTotal.num
    );
    // نصيبه من الفائض
    const extra = multiply(surplus, proportion);
    // النصيب النهائي
    const newFraction = add(share.fraction, extra);

    return {
      ...share,
      fraction: newFraction,
      explanation: share.explanation + " (مع الرد)",
    };
  });

  return {
    adjustedShares: [...spouseShares, ...adjustedNonSpouse],
    surplusFraction: surplus,
    redistributedTo: nonSpouseShares.map((s) => s.heir as HeirType),
  };
}
