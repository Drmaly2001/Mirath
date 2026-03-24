import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("ar-SA", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

const ARABIC_FRACTION_NAMES: Record<string, string> = {
  "1/2": "النصف",
  "1/3": "الثلث",
  "2/3": "الثلثان",
  "1/4": "الربع",
  "3/4": "ثلاثة أرباع",
  "1/6": "السدس",
  "5/6": "خمسة أسداس",
  "1/8": "الثمن",
  "3/8": "ثلاثة أثمان",
};

export function fractionToArabicName(num: number, den: number): string {
  const key = `${num}/${den}`;
  return ARABIC_FRACTION_NAMES[key] || `${num}/${den}`;
}
