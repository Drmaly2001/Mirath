import type { Metadata } from "next";
import { Noto_Kufi_Arabic } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { IslamicPatternBg } from "@/components/ui/islamic-pattern";
import "./globals.css";

const notoKufiArabic = Noto_Kufi_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ميراث — حاسبة المواريث الإسلامية الذكية | حساب الإرث الشرعي مجاناً",
  description:
    "حاسبة مواريث إسلامية مجانية ودقيقة — احسب توزيع التركة على الورثة وفق الشريعة الإسلامية مع الأدلة القرآنية والشرح الفقهي. تدعم العول والرد والحجب والحالات الخاصة.",
  keywords:
    "حاسبة مواريث, حساب الإرث, تقسيم التركة, المواريث الإسلامية, علم الفرائض, حساب الميراث الشرعي, توزيع الميراث",
  openGraph: {
    title: "ميراث — حاسبة المواريث الإسلامية الذكية",
    description:
      "وزّع الميراث بدقة فقهية في دقائق — مع الأدلة القرآنية والشرح التعليمي",
    type: "website",
    locale: "ar_SA",
    siteName: "ميراث",
  },
  twitter: {
    card: "summary_large_image",
    title: "ميراث — حاسبة المواريث الإسلامية الذكية",
    description:
      "وزّع الميراث بدقة فقهية في دقائق — مجاني ومفتوح المصدر",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${notoKufiArabic.variable} h-full`}>
      <body className="relative min-h-full flex flex-col font-arabic antialiased">
        <IslamicPatternBg className="pointer-events-none fixed inset-0 z-0 text-primary" />
        <div className="relative z-10 flex min-h-full flex-col">
          <TooltipProvider>{children}</TooltipProvider>
        </div>
      </body>
    </html>
  );
}
