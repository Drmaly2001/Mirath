/**
 * العول — التخفيض التناسبي عندما تتجاوز الفروض التركة
 * يحدث عندما يكون مجموع أنصبة أصحاب الفروض أكبر من الواحد الصحيح
 */

import type { Fraction } from "./types";
import { findLCD, frac } from "./fraction";

interface FardhEntry {
  heir: string;
  count: number;
  fraction: Fraction;
  explanation: string;
}

export interface AwlResult {
  originalBase: number; // أصل المسألة الأصلي
  newBase: number; // أصل المسألة بعد العول
  adjustedShares: FardhEntry[];
}

/**
 * تطبيق العول
 * الخوارزمية:
 * 1. إيجاد المقام المشترك الأصغر (أصل المسألة)
 * 2. تحويل كل فرض إلى بسطه على أصل المسألة
 * 3. جمع البسوط
 * 4. إذا المجموع > أصل المسألة، يصبح أصل المسألة الجديد = المجموع
 * 5. كل وارث يحتفظ ببسطه على الأصل الجديد
 */
export function applyAwl(fardhShares: FardhEntry[]): AwlResult {
  // أصل المسألة = المقام المشترك الأصغر
  const originalBase = findLCD(fardhShares.map((s) => s.fraction));

  // تحويل كل فرض إلى بسطه على أصل المسألة
  const numerators = fardhShares.map(
    (s) => (s.fraction.num * originalBase) / s.fraction.den
  );

  // مجموع البسوط
  const totalNumerators = numerators.reduce((a, b) => a + b, 0);

  // أصل المسألة الجديد = مجموع البسوط (لأنه أكبر من الأصل)
  const newBase = totalNumerators;

  // الأنصبة المعدلة
  const adjustedShares = fardhShares.map((share, i) => ({
    ...share,
    fraction: frac(numerators[i], newBase),
    explanation: share.explanation + ` (تم تخفيضه بسبب العول من ${originalBase} إلى ${newBase})`,
  }));

  return { originalBase, newBase, adjustedShares };
}
