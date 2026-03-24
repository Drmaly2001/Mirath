/**
 * حساب أصحاب الفروض
 * الفروض الستة المقدرة في القرآن: 1/2, 1/4, 1/8, 2/3, 1/3, 1/6
 */

import type { HeirInput, HeirType, Fraction } from "./types";
import { frac } from "./fraction";
import { hasDescendant, hasMaleDescendant, has, countOf } from "./hajb";

interface FardhResult {
  heir: HeirType;
  count: number;
  fraction: Fraction;
  explanation: string;
}

/**
 * حساب فروض جميع أصحاب الفروض
 * يُستدعى بعد تطبيق الحجب (الورثة المحجوبين أُزيلوا بالفعل)
 */
export function calculateFardh(heirs: HeirInput[]): FardhResult[] {
  const results: FardhResult[] = [];

  for (const heir of heirs) {
    const fardhShare = getFardhShare(heir.type, heir.count, heirs);
    if (fardhShare) {
      results.push({
        heir: heir.type,
        count: heir.count,
        ...fardhShare,
      });
    }
  }

  return results;
}

function getFardhShare(
  type: HeirType,
  count: number,
  allHeirs: HeirInput[]
): { fraction: Fraction; explanation: string } | null {
  switch (type) {
    // === الزوج ===
    case "husband":
      if (hasDescendant(allHeirs)) {
        return { fraction: frac(1, 4), explanation: "الزوج مع وجود الفرع الوارث: الربع" };
      }
      return { fraction: frac(1, 2), explanation: "الزوج بدون فرع وارث: النصف" };

    // === الزوجة (أو الزوجات يتشاركن) ===
    case "wife":
      if (hasDescendant(allHeirs)) {
        return { fraction: frac(1, 8), explanation: "الزوجة مع وجود الفرع الوارث: الثمن" };
      }
      return { fraction: frac(1, 4), explanation: "الزوجة بدون فرع وارث: الربع" };

    // === الأب ===
    case "father":
      if (hasMaleDescendant(allHeirs)) {
        // فرض فقط مع الابن أو ابن الابن
        return { fraction: frac(1, 6), explanation: "الأب مع وجود الفرع الوارث الذكر: السدس فرضاً" };
      }
      if (hasDescendant(allHeirs)) {
        // فرض + تعصيب مع البنت أو بنت الابن (السدس + الباقي)
        return { fraction: frac(1, 6), explanation: "الأب مع وجود الفرع الوارث الأنثى: السدس فرضاً والباقي تعصيباً" };
      }
      // عاصب بالنفس (لا فرض)
      return null;

    // === الأم ===
    case "mother": {
      if (hasDescendant(allHeirs)) {
        return { fraction: frac(1, 6), explanation: "الأم مع وجود الفرع الوارث: السدس" };
      }
      // عدد الإخوة والأخوات (من أي جهة)
      const siblingCount =
        countOf(allHeirs, "full_brother") +
        countOf(allHeirs, "full_sister") +
        countOf(allHeirs, "paternal_brother") +
        countOf(allHeirs, "paternal_sister") +
        countOf(allHeirs, "maternal_brother") +
        countOf(allHeirs, "maternal_sister");

      if (siblingCount >= 2) {
        return { fraction: frac(1, 6), explanation: "الأم مع وجود اثنين أو أكثر من الإخوة: السدس" };
      }
      // ملاحظة: حالة العمريتين تُعالج في special-cases.ts
      return { fraction: frac(1, 3), explanation: "الأم بدون فرع وارث وأقل من اثنين من الإخوة: الثلث" };
    }

    // === الجد لأب (يأخذ حكم الأب عند عدم وجوده مع اختلافات) ===
    case "paternal_grandfather":
      if (hasMaleDescendant(allHeirs)) {
        return { fraction: frac(1, 6), explanation: "الجد مع وجود الفرع الوارث الذكر: السدس فرضاً" };
      }
      if (hasDescendant(allHeirs)) {
        return { fraction: frac(1, 6), explanation: "الجد مع وجود الفرع الوارث الأنثى: السدس فرضاً والباقي تعصيباً" };
      }
      return null; // عاصب بالنفس

    // === الجدات ===
    case "paternal_grandmother":
    case "maternal_grandmother": {
      // الجدة أو الجدات يشتركن في السدس
      const otherGrandmother =
        type === "paternal_grandmother" ? "maternal_grandmother" : "paternal_grandmother";
      if (has(allHeirs, otherGrandmother)) {
        // السدس مشترك بين الجدتين
        return { fraction: frac(1, 6), explanation: "الجدة: السدس (مشترك مع الجدة الأخرى)" };
      }
      return { fraction: frac(1, 6), explanation: "الجدة: السدس" };
    }

    // === البنت ===
    case "daughter":
      if (has(allHeirs, "son")) {
        return null; // تعصيب بالغير مع الابن
      }
      if (count === 1) {
        return { fraction: frac(1, 2), explanation: "البنت الواحدة بدون ابن: النصف" };
      }
      // بنتان فأكثر
      return { fraction: frac(2, 3), explanation: "البنتان فأكثر بدون ابن: الثلثان" };

    // === بنت الابن ===
    case "daughter_of_son":
      if (has(allHeirs, "son_of_son")) {
        return null; // تعصيب بالغير
      }
      if (!has(allHeirs, "daughter")) {
        if (count === 1) {
          return { fraction: frac(1, 2), explanation: "بنت الابن الواحدة بدون بنت وبدون ابن ابن: النصف" };
        }
        return { fraction: frac(2, 3), explanation: "بنات الابن بدون بنت وبدون ابن ابن: الثلثان" };
      }
      // مع بنت واحدة: تكملة الثلثين
      if (countOf(allHeirs, "daughter") === 1) {
        return { fraction: frac(1, 6), explanation: "بنت الابن مع بنت واحدة: السدس تكملة للثلثين" };
      }
      return null;

    // === الأخت الشقيقة ===
    case "full_sister":
      if (has(allHeirs, "full_brother")) {
        return null; // تعصيب بالغير
      }
      // عصبة مع الغير (مع البنات)
      if (has(allHeirs, "daughter") || has(allHeirs, "daughter_of_son")) {
        return null; // تصبح عاصبة مع الغير
      }
      if (count === 1) {
        return { fraction: frac(1, 2), explanation: "الأخت الشقيقة الواحدة: النصف" };
      }
      return { fraction: frac(2, 3), explanation: "الأختان الشقيقتان فأكثر: الثلثان" };

    // === الأخت لأب ===
    case "paternal_sister":
      if (has(allHeirs, "paternal_brother")) {
        return null; // تعصيب بالغير
      }
      if (has(allHeirs, "daughter") || has(allHeirs, "daughter_of_son")) {
        return null; // عصبة مع الغير
      }
      if (!has(allHeirs, "full_sister") && !has(allHeirs, "full_brother")) {
        if (count === 1) {
          return { fraction: frac(1, 2), explanation: "الأخت لأب الواحدة بدون أخت شقيقة: النصف" };
        }
        return { fraction: frac(2, 3), explanation: "الأخوات لأب بدون أخت شقيقة: الثلثان" };
      }
      // مع أخت شقيقة واحدة: السدس تكملة الثلثين
      if (countOf(allHeirs, "full_sister") === 1) {
        return { fraction: frac(1, 6), explanation: "الأخت لأب مع أخت شقيقة واحدة: السدس تكملة للثلثين" };
      }
      return null;

    // === الأخ لأم / الأخت لأم (يتساوون ذكوراً وإناثاً) ===
    case "maternal_brother":
    case "maternal_sister": {
      const totalMaternal =
        countOf(allHeirs, "maternal_brother") + countOf(allHeirs, "maternal_sister");
      if (totalMaternal === 1) {
        return { fraction: frac(1, 6), explanation: "الواحد من الإخوة لأم: السدس" };
      }
      // اثنان فأكثر: الثلث يتشاركونه بالتساوي
      return { fraction: frac(1, 3), explanation: "الإخوة لأم اثنان فأكثر: الثلث بالتساوي" };
    }

    // الابن وابن الابن: عاصبون لا فرض لهم
    case "son":
    case "son_of_son":
      return null;

    default:
      return null;
  }
}
