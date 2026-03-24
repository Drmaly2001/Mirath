import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PHILOSOPHY_MAP } from "@/lib/fiqh/philosophy";

export default function PhilosophyPage() {
  const entries = Object.values(PHILOSOPHY_MAP);

  return (
    <>
      <Header />
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="mb-2 text-3xl font-bold text-foreground">
            فلسفة الميراث في الإسلام
          </h1>
          <p className="mb-8 text-muted-foreground">
            لماذا هذا التوزيع؟ ما الحكمة وراء أحكام المواريث؟ وهل المرأة مظلومة حقاً؟
          </p>

          <div className="space-y-6">
            {entries.map((entry) => (
              <Card key={entry.title}>
                <CardHeader>
                  <CardTitle className="text-lg text-primary">
                    {entry.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm leading-relaxed text-foreground">
                    {entry.explanation}
                  </p>

                  {entry.financialBalance && (
                    <div className="rounded-lg bg-accent/10 p-4">
                      <p className="text-xs font-semibold text-accent-foreground mb-2">
                        المعادلة المالية
                      </p>
                      <p className="text-sm leading-relaxed text-foreground">
                        {entry.financialBalance}
                      </p>
                    </div>
                  )}

                  {entry.details && entry.details.length > 0 && (
                    <>
                      <Separator />
                      <ul className="space-y-3">
                        {entry.details.map((detail, i) => (
                          <li key={i} className="flex gap-3 text-sm leading-relaxed text-foreground">
                            <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                              {i + 1}
                            </span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
