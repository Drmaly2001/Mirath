/**
 * حساب الكسور بدقة — بدون أعداد عشرية
 * جميع حسابات المواريث تتم بالكسور لضمان الدقة الفقهية
 */

import type { Fraction } from "./types";

/** القاسم المشترك الأكبر (GCD) */
export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

/** المضاعف المشترك الأصغر (LCM) */
export function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

/** تبسيط الكسر */
export function simplify(f: Fraction): Fraction {
  if (f.num === 0) return { num: 0, den: 1 };
  const d = gcd(Math.abs(f.num), Math.abs(f.den));
  const sign = f.den < 0 ? -1 : 1;
  return { num: (sign * f.num) / d, den: (sign * f.den) / d };
}

/** إنشاء كسر مبسّط */
export function frac(num: number, den: number): Fraction {
  if (den === 0) throw new Error("المقام لا يمكن أن يكون صفراً");
  return simplify({ num, den });
}

/** جمع كسرين */
export function add(a: Fraction, b: Fraction): Fraction {
  const den = lcm(a.den, b.den);
  const num = a.num * (den / a.den) + b.num * (den / b.den);
  return simplify({ num, den });
}

/** طرح كسرين */
export function subtract(a: Fraction, b: Fraction): Fraction {
  return add(a, { num: -b.num, den: b.den });
}

/** ضرب كسرين */
export function multiply(a: Fraction, b: Fraction): Fraction {
  return simplify({ num: a.num * b.num, den: a.den * b.den });
}

/** قسمة كسرين */
export function divide(a: Fraction, b: Fraction): Fraction {
  if (b.num === 0) throw new Error("لا يمكن القسمة على صفر");
  return multiply(a, { num: b.den, den: b.num });
}

/** مقارنة كسرين: يعيد -1 أو 0 أو 1 */
export function compare(a: Fraction, b: Fraction): number {
  const diff = a.num * b.den - b.num * a.den;
  if (diff < 0) return -1;
  if (diff > 0) return 1;
  return 0;
}

/** هل الكسران متساويان */
export function equals(a: Fraction, b: Fraction): boolean {
  return compare(a, b) === 0;
}

/** تحويل الكسر إلى رقم عشري */
export function toNumber(f: Fraction): number {
  return f.num / f.den;
}

/** كسر الصفر */
export const ZERO: Fraction = { num: 0, den: 1 };

/** كسر الواحد */
export const ONE: Fraction = { num: 1, den: 1 };

/** جمع مصفوفة كسور */
export function sum(fractions: Fraction[]): Fraction {
  return fractions.reduce((acc, f) => add(acc, f), ZERO);
}

/** إيجاد المقام المشترك الأصغر (أصل المسألة) لمجموعة كسور */
export function findLCD(fractions: Fraction[]): number {
  if (fractions.length === 0) return 1;
  return fractions.reduce((acc, f) => lcm(acc, f.den), 1);
}
