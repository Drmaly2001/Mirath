/**
 * قواعد الحجب في المواريث الإسلامية
 * الحجب نوعان: حجب حرمان (إسقاط كامل) وحجب نقصان (تقليل النصيب)
 */

import type { HeirInput, HeirType, HajbInfo } from "./types";

/** مساعد: هل يوجد وارث من نوع معين */
function has(heirs: HeirInput[], type: HeirType): boolean {
  return heirs.some((h) => h.type === type && h.count > 0);
}

/** مساعد: عدد الورثة من نوع معين */
function countOf(heirs: HeirInput[], type: HeirType): number {
  return heirs.find((h) => h.type === type)?.count ?? 0;
}

/** هل يوجد فرع وارث (أولاد أو أولاد ابن) */
function hasDescendant(heirs: HeirInput[]): boolean {
  return (
    has(heirs, "son") ||
    has(heirs, "daughter") ||
    has(heirs, "son_of_son") ||
    has(heirs, "daughter_of_son")
  );
}

/** هل يوجد فرع وارث ذكر */
function hasMaleDescendant(heirs: HeirInput[]): boolean {
  return has(heirs, "son") || has(heirs, "son_of_son");
}

/**
 * قواعد حجب الحرمان (الإسقاط الكامل)
 * يُعيد قائمة بالورثة المحجوبين مع السبب
 */
export function applyHajb(heirs: HeirInput[]): {
  remaining: HeirInput[];
  blocked: HajbInfo[];
} {
  const blocked: HajbInfo[] = [];
  const remaining: HeirInput[] = [];

  for (const heir of heirs) {
    const blockReason = getBlockReason(heir.type, heirs);
    if (blockReason) {
      blocked.push(blockReason);
    } else {
      remaining.push({ ...heir });
    }
  }

  return { remaining, blocked };
}

function getBlockReason(
  heir: HeirType,
  heirs: HeirInput[]
): HajbInfo | null {
  switch (heir) {
    // الجد لأب: يحجبه الأب
    case "paternal_grandfather":
      if (has(heirs, "father"))
        return {
          heir,
          blockedBy: "father",
          type: "hirman",
          explanation: "الجد يُحجب بالأب",
        };
      break;

    // الجدة لأب: تحجبها الأم أو الأب
    case "paternal_grandmother":
      if (has(heirs, "mother"))
        return {
          heir,
          blockedBy: "mother",
          type: "hirman",
          explanation: "الجدة لأب تُحجب بالأم",
        };
      if (has(heirs, "father"))
        return {
          heir,
          blockedBy: "father",
          type: "hirman",
          explanation: "الجدة لأب تُحجب بالأب",
        };
      break;

    // الجدة لأم: تحجبها الأم
    case "maternal_grandmother":
      if (has(heirs, "mother"))
        return {
          heir,
          blockedBy: "mother",
          type: "hirman",
          explanation: "الجدة لأم تُحجب بالأم",
        };
      break;

    // ابن الابن: يحجبه الابن
    case "son_of_son":
      if (has(heirs, "son"))
        return {
          heir,
          blockedBy: "son",
          type: "hirman",
          explanation: "ابن الابن يُحجب بالابن",
        };
      break;

    // بنت الابن: تحجبها الابن، أو بنتان فأكثر بدون ابن ابن
    case "daughter_of_son":
      if (has(heirs, "son"))
        return {
          heir,
          blockedBy: "son",
          type: "hirman",
          explanation: "بنت الابن تُحجب بالابن",
        };
      if (countOf(heirs, "daughter") >= 2 && !has(heirs, "son_of_son"))
        return {
          heir,
          blockedBy: "daughter",
          type: "hirman",
          explanation:
            "بنت الابن تُحجب ببنتين فأكثر إذا لم يكن معها ابن ابن يعصّبها",
        };
      break;

    // الأخ الشقيق: يحجبه الابن أو ابن الابن أو الأب
    case "full_brother":
      if (has(heirs, "son"))
        return { heir, blockedBy: "son", type: "hirman", explanation: "الأخ الشقيق يُحجب بالابن" };
      if (has(heirs, "son_of_son"))
        return { heir, blockedBy: "son_of_son", type: "hirman", explanation: "الأخ الشقيق يُحجب بابن الابن" };
      if (has(heirs, "father"))
        return { heir, blockedBy: "father", type: "hirman", explanation: "الأخ الشقيق يُحجب بالأب" };
      break;

    // الأخت الشقيقة: نفس حجب الأخ الشقيق (إلا في حالة التعصيب مع البنات)
    case "full_sister":
      if (has(heirs, "son"))
        return { heir, blockedBy: "son", type: "hirman", explanation: "الأخت الشقيقة تُحجب بالابن" };
      if (has(heirs, "son_of_son"))
        return { heir, blockedBy: "son_of_son", type: "hirman", explanation: "الأخت الشقيقة تُحجب بابن الابن" };
      if (has(heirs, "father"))
        return { heir, blockedBy: "father", type: "hirman", explanation: "الأخت الشقيقة تُحجب بالأب" };
      break;

    // الأخ لأب: كل ما يحجب الشقيق + الأخ الشقيق
    case "paternal_brother":
      if (has(heirs, "son"))
        return { heir, blockedBy: "son", type: "hirman", explanation: "الأخ لأب يُحجب بالابن" };
      if (has(heirs, "son_of_son"))
        return { heir, blockedBy: "son_of_son", type: "hirman", explanation: "الأخ لأب يُحجب بابن الابن" };
      if (has(heirs, "father"))
        return { heir, blockedBy: "father", type: "hirman", explanation: "الأخ لأب يُحجب بالأب" };
      if (has(heirs, "full_brother"))
        return { heir, blockedBy: "full_brother", type: "hirman", explanation: "الأخ لأب يُحجب بالأخ الشقيق" };
      break;

    // الأخت لأب
    case "paternal_sister":
      if (has(heirs, "son"))
        return { heir, blockedBy: "son", type: "hirman", explanation: "الأخت لأب تُحجب بالابن" };
      if (has(heirs, "son_of_son"))
        return { heir, blockedBy: "son_of_son", type: "hirman", explanation: "الأخت لأب تُحجب بابن الابن" };
      if (has(heirs, "father"))
        return { heir, blockedBy: "father", type: "hirman", explanation: "الأخت لأب تُحجب بالأب" };
      if (has(heirs, "full_brother"))
        return { heir, blockedBy: "full_brother", type: "hirman", explanation: "الأخت لأب تُحجب بالأخ الشقيق" };
      if (countOf(heirs, "full_sister") >= 2 && !has(heirs, "paternal_brother"))
        return {
          heir,
          blockedBy: "full_sister",
          type: "hirman",
          explanation: "الأخت لأب تُحجب بأختين شقيقتين فأكثر إذا لم يكن معها أخ لأب",
        };
      break;

    // الأخ لأم والأخت لأم: يحجبهم الفرع الوارث والأب والجد
    case "maternal_brother":
    case "maternal_sister":
      if (hasDescendant(heirs))
        return {
          heir,
          blockedBy: has(heirs, "son") ? "son" : "daughter",
          type: "hirman",
          explanation: "الإخوة لأم يُحجبون بالفرع الوارث",
        };
      if (has(heirs, "father"))
        return { heir, blockedBy: "father", type: "hirman", explanation: "الإخوة لأم يُحجبون بالأب" };
      if (has(heirs, "paternal_grandfather"))
        return {
          heir,
          blockedBy: "paternal_grandfather",
          type: "hirman",
          explanation: "الإخوة لأم يُحجبون بالجد",
        };
      break;
  }

  return null;
}

/**
 * مساعد لتحديد حجب النقصان (يُستخدم في fardh.ts)
 * مثلاً: الزوج ينقص من 1/2 إلى 1/4 بوجود الفرع الوارث
 */
export { hasDescendant, hasMaleDescendant, has, countOf };
