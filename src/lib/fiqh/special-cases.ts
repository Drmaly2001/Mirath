/**
 * الحالات الخاصة المسماة في المواريث الإسلامية
 * حالات مشهورة لها أسماء خاصة في كتب الفقه
 */

import type { HeirInput, HeirType, SpecialCaseInfo, Fraction } from "./types";
import { has, countOf } from "./hajb";
import { frac } from "./fraction";

/**
 * كشف الحالات الخاصة من قائمة الورثة
 */
export function detectSpecialCase(heirs: HeirInput[]): SpecialCaseInfo | null {
  // العمرية الأولى: زوج + أم + أب (بدون فرع وارث وبدون إخوة 2+)
  if (isUmariyyahWithHusband(heirs)) {
    return {
      id: "umariyyah_husband",
      name: "Al-Umariyyah (with Husband)",
      nameArabic: "العمرية الأولى",
      description:
        "زوج + أم + أب — الأم تأخذ ثلث الباقي بعد نصيب الزوج (وليس ثلث التركة كلها)، لأنها لو أخذت الثلث لأخذت أكثر من الأب",
      resolution: "الزوج: النصف، الأم: ثلث الباقي (= السدس)، الأب: الباقي (= الثلث)",
    };
  }

  // العمرية الثانية: زوجة + أم + أب
  if (isUmariyyahWithWife(heirs)) {
    return {
      id: "umariyyah_wife",
      name: "Al-Umariyyah (with Wife)",
      nameArabic: "العمرية الثانية",
      description:
        "زوجة + أم + أب — الأم تأخذ ثلث الباقي بعد نصيب الزوجة",
      resolution: "الزوجة: الربع، الأم: ثلث الباقي (= الربع)، الأب: الباقي",
    };
  }

  // المشتركة (الحمارية): زوج + أم + إخوة لأم 2+ + أخ شقيق 1+
  if (isMushtaraka(heirs)) {
    return {
      id: "mushtaraka",
      name: "Al-Mushtaraka (Al-Himariyyah)",
      nameArabic: "المشتركة (الحمارية)",
      description:
        "زوج + أم + إخوة لأم (2+) + إخوة أشقاء — على مذهب الشافعي والمالكي: يشترك الأشقاء مع الإخوة لأم في الثلث بالتساوي. وعلى مذهب أبي حنيفة وأحمد: لا شيء للأشقاء",
      resolution: "الزوج: النصف، الأم: السدس، الإخوة لأم + الأشقاء: الثلث بالتساوي (عند الشافعي والمالكي)",
    };
  }

  return null;
}

function isUmariyyahWithHusband(heirs: HeirInput[]): boolean {
  const siblingCount =
    countOf(heirs, "full_brother") +
    countOf(heirs, "full_sister") +
    countOf(heirs, "paternal_brother") +
    countOf(heirs, "paternal_sister") +
    countOf(heirs, "maternal_brother") +
    countOf(heirs, "maternal_sister");

  return (
    has(heirs, "husband") &&
    has(heirs, "mother") &&
    has(heirs, "father") &&
    !has(heirs, "son") &&
    !has(heirs, "daughter") &&
    !has(heirs, "son_of_son") &&
    !has(heirs, "daughter_of_son") &&
    siblingCount < 2 &&
    heirs.filter((h) => h.count > 0).length === 3
  );
}

function isUmariyyahWithWife(heirs: HeirInput[]): boolean {
  const siblingCount =
    countOf(heirs, "full_brother") +
    countOf(heirs, "full_sister") +
    countOf(heirs, "paternal_brother") +
    countOf(heirs, "paternal_sister") +
    countOf(heirs, "maternal_brother") +
    countOf(heirs, "maternal_sister");

  return (
    has(heirs, "wife") &&
    has(heirs, "mother") &&
    has(heirs, "father") &&
    !has(heirs, "son") &&
    !has(heirs, "daughter") &&
    !has(heirs, "son_of_son") &&
    !has(heirs, "daughter_of_son") &&
    siblingCount < 2 &&
    heirs.filter((h) => h.count > 0).length === 3
  );
}

function isMushtaraka(heirs: HeirInput[]): boolean {
  const maternalCount = countOf(heirs, "maternal_brother") + countOf(heirs, "maternal_sister");
  return (
    has(heirs, "husband") &&
    has(heirs, "mother") &&
    maternalCount >= 2 &&
    (has(heirs, "full_brother") || has(heirs, "full_sister")) &&
    !has(heirs, "son") &&
    !has(heirs, "daughter") &&
    !has(heirs, "father") &&
    !has(heirs, "paternal_grandfather")
  );
}

/**
 * معالجة الحالة الخاصة وإرجاع الأنصبة مباشرة
 */
export function handleSpecialCase(
  specialCase: SpecialCaseInfo,
  heirs: HeirInput[]
): { heir: HeirType; count: number; fraction: Fraction; explanation: string }[] {
  switch (specialCase.id) {
    case "umariyyah_husband":
      return [
        { heir: "husband", count: 1, fraction: frac(1, 2), explanation: "الزوج: النصف" },
        {
          heir: "mother",
          count: 1,
          fraction: frac(1, 6),
          explanation: "الأم: ثلث الباقي بعد نصيب الزوج (= سدس التركة) — العمرية",
        },
        {
          heir: "father",
          count: 1,
          fraction: frac(1, 3),
          explanation: "الأب: الباقي (= ثلث التركة) — العمرية",
        },
      ];

    case "umariyyah_wife":
      return [
        { heir: "wife", count: countOf(heirs, "wife"), fraction: frac(1, 4), explanation: "الزوجة: الربع" },
        {
          heir: "mother",
          count: 1,
          fraction: frac(1, 4),
          explanation: "الأم: ثلث الباقي بعد نصيب الزوجة (= ربع التركة) — العمرية",
        },
        {
          heir: "father",
          count: 1,
          fraction: frac(1, 2),
          explanation: "الأب: الباقي (= نصف التركة) — العمرية",
        },
      ];

    case "mushtaraka": {
      // على مذهب الشافعي والمالكي: الأشقاء يشتركون مع الإخوة لأم في الثلث
      const maternalCount = countOf(heirs, "maternal_brother") + countOf(heirs, "maternal_sister");
      const fullBrothers = countOf(heirs, "full_brother");
      const fullSisters = countOf(heirs, "full_sister");
      const totalSharing = maternalCount + fullBrothers + fullSisters;

      const shares: { heir: HeirType; count: number; fraction: Fraction; explanation: string }[] = [
        { heir: "husband", count: 1, fraction: frac(1, 2), explanation: "الزوج: النصف" },
        { heir: "mother", count: 1, fraction: frac(1, 6), explanation: "الأم: السدس" },
      ];

      // الثلث مشترك بين الجميع بالتساوي
      if (countOf(heirs, "maternal_brother") > 0) {
        shares.push({
          heir: "maternal_brother",
          count: countOf(heirs, "maternal_brother"),
          fraction: frac(countOf(heirs, "maternal_brother"), 3 * totalSharing),
          explanation: "الإخوة لأم: يشتركون في الثلث — المشتركة (الحمارية)",
        });
      }
      if (countOf(heirs, "maternal_sister") > 0) {
        shares.push({
          heir: "maternal_sister",
          count: countOf(heirs, "maternal_sister"),
          fraction: frac(countOf(heirs, "maternal_sister"), 3 * totalSharing),
          explanation: "الأخوات لأم: يشتركن في الثلث — المشتركة (الحمارية)",
        });
      }
      if (fullBrothers > 0) {
        shares.push({
          heir: "full_brother",
          count: fullBrothers,
          fraction: frac(fullBrothers, 3 * totalSharing),
          explanation: "الإخوة الأشقاء: يشتركون في الثلث مع الإخوة لأم — المشتركة (الحمارية)",
        });
      }
      if (fullSisters > 0) {
        shares.push({
          heir: "full_sister",
          count: fullSisters,
          fraction: frac(fullSisters, 3 * totalSharing),
          explanation: "الأخوات الشقيقات: يشتركن في الثلث — المشتركة (الحمارية)",
        });
      }

      return shares;
    }

    default:
      return [];
  }
}
