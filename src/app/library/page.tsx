import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, AlertTriangle, Scale } from "lucide-react";

export default function LibraryPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="mb-2 text-3xl font-bold text-foreground">المكتبة الفقهية</h1>
          <p className="mb-8 text-muted-foreground">
            تعرّف على مصطلحات علم الفرائض والحالات الخاصة وفلسفة التوريث في الإسلام
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            <Link href="/library/terminology">
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <CardTitle>المصطلحات</CardTitle>
                  <CardDescription>
                    شرح مصطلحات علم الفرائض: الفرض، العصبة، العول، الرد، الحجب وغيرها
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/library/special-cases">
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20 text-accent-foreground">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <CardTitle>الحالات الخاصة</CardTitle>
                  <CardDescription>
                    العمريتان، المشتركة، المنبرية، الأكدرية — حالات مشهورة في تاريخ الفقه
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/library/philosophy">
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-primary/10 text-primary">
                    <Scale className="h-5 w-5" />
                  </div>
                  <CardTitle>الفلسفة الإسلامية</CardTitle>
                  <CardDescription>
                    حكمة التوزيع والمعادلة المالية بين الرجل والمرأة في نظام الميراث
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
