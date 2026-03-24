import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TERMS = [
  {
    term: "الفرض",
    definition: "النصيب المقدّر شرعاً في كتاب الله تعالى. الفروض المقدرة ستة: النصف، الربع، الثمن، الثلثان، الثلث، السدس.",
  },
  {
    term: "العصبة",
    definition: "من يرث بلا تقدير (أي يأخذ ما بقي بعد أصحاب الفروض). إذا انفرد أخذ المال كله.",
  },
  {
    term: "العول",
    definition: "زيادة في سهام الفريضة عن أصل المسألة، فتنقص أنصبة الورثة بنسبة متساوية. يحدث عندما يكون مجموع الفروض أكبر من التركة.",
  },
  {
    term: "الرد",
    definition: "إعادة الفائض إلى أصحاب الفروض إذا لم يستغرقوا التركة ولم يوجد عاصب. يُرد على الجميع ما عدا الزوجين.",
  },
  {
    term: "الحجب",
    definition: "منع شخص من الميراث كلياً (حجب حرمان) أو إنقاص نصيبه (حجب نقصان) بسبب وجود وارث أقرب.",
  },
  {
    term: "أصل المسألة",
    definition: "المقام المشترك الأصغر لجميع مقامات فروض الورثة. يمثل عدد الأسهم الكلية للمسألة.",
  },
  {
    term: "التعصيب بالغير",
    definition: "أن تصبح الأنثى عاصبة بوجود ذكر من درجتها (مثل البنت مع الابن). يأخذون الباقي: للذكر مثل حظ الأنثيين.",
  },
  {
    term: "التعصيب مع الغير",
    definition: "أن تصبح الأخوات عاصبات بوجود البنات (وإن لم يكن معهن أخ). مثال: أخت شقيقة مع بنت.",
  },
  {
    term: "الكلالة",
    definition: "من مات وليس له ولد ولا والد. في الكلالة ترث الإخوة والأخوات.",
  },
  {
    term: "ذوو الأرحام",
    definition: "الأقارب الذين ليسوا من أصحاب الفروض ولا من العصبة (مثل الخال، العمة، ابن البنت). يرثون عند عدم وجود أصحاب الفروض والعصبة.",
  },
];

export default function TerminologyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="mb-2 text-3xl font-bold text-foreground">مصطلحات علم الفرائض</h1>
          <p className="mb-8 text-muted-foreground">
            المصطلحات الأساسية في علم المواريث الإسلامية
          </p>

          <div className="space-y-4">
            {TERMS.map((t) => (
              <Card key={t.term}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-primary">{t.term}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-foreground">{t.definition}</p>
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
