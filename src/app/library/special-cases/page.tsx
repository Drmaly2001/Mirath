import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CASES = [
  {
    name: "العمرية الأولى",
    heirs: "زوج + أم + أب",
    problem: "لو أعطينا الأم الثلث (كما هو الأصل) لأخذت أكثر من الأب — وهذا مخالف لمبدأ \"للذكر مثل حظ الأنثيين\"",
    solution: "الزوج: النصف (1/2)، الأم: ثلث الباقي (= 1/6 من التركة)، الأب: الباقي (= 1/3 من التركة)",
    attribution: "سُميت بالعمرية نسبة لعمر بن الخطاب رضي الله عنه",
  },
  {
    name: "العمرية الثانية",
    heirs: "زوجة + أم + أب",
    problem: "نفس المشكلة: لو أخذت الأم الثلث لأخذت أكثر من الأب",
    solution: "الزوجة: الربع (1/4)، الأم: ثلث الباقي (= 1/4 من التركة)، الأب: الباقي (= 1/2 من التركة)",
    attribution: "قضاء عمر رضي الله عنه، ووافقه عثمان وزيد بن ثابت",
  },
  {
    name: "المشتركة (الحمارية)",
    heirs: "زوج + أم + إخوة لأم (2+) + إخوة أشقاء",
    problem: "الإخوة لأم يأخذون الثلث بنص القرآن. الأشقاء (وهم أقرب صلة) يكونون عصبة فلا يبقى لهم شيء!",
    solution: "عند الشافعي والمالكي: يشترك الأشقاء مع الإخوة لأم في الثلث بالتساوي. عند أبي حنيفة وأحمد: لا شيء للأشقاء (يطبق القاعدة العامة)",
    attribution: "عُرضت على عمر مرتين فحكم فيها بحكمين مختلفين",
  },
  {
    name: "المنبرية",
    heirs: "زوجة + أبوان + بنتان",
    problem: "مجموع الفروض: 1/8 + 1/6 + 1/6 + 2/3 = 27/24 (أكبر من الواحد) — عول",
    solution: "أصل المسألة 24 يعول إلى 27. الزوجة: 3/27، الأب: 4/27، الأم: 4/27، البنتان: 16/27",
    attribution: "سُميت لأن علي بن أبي طالب أجاب عنها وهو على المنبر",
  },
  {
    name: "الأكدرية",
    heirs: "زوج + أم + جد + أخت شقيقة",
    problem: "حالة فريدة تتعارض فيها قواعد الجد مع الأخت. الأخت تأخذ فرضاً ثم تُعصّب مع الجد",
    solution: "الزوج: النصف، الأم: الثلث، الجد: السدس، الأخت: النصف — ثم يعول من 6 إلى 9. ثم يُجمع نصيب الجد والأخت ويُقسم بينهما للذكر مثل حظ الأنثيين",
    attribution: "سُميت الأكدرية لأنها كدّرت على زيد بن ثابت أصوله",
  },
];

export default function SpecialCasesPage() {
  return (
    <>
      <Header />
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="mb-2 text-3xl font-bold text-foreground">الحالات الخاصة</h1>
          <p className="mb-8 text-muted-foreground">
            مسائل مشهورة في تاريخ الفقه الإسلامي لها أسماء خاصة
          </p>

          <div className="space-y-6">
            {CASES.map((c) => (
              <Card key={c.name}>
                <CardHeader>
                  <CardTitle className="text-lg text-primary">{c.name}</CardTitle>
                  <Badge variant="outline" className="w-fit">
                    {c.heirs}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground">المشكلة</p>
                    <p className="text-sm text-foreground">{c.problem}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground">الحل</p>
                    <p className="text-sm text-foreground">{c.solution}</p>
                  </div>
                  <p className="text-xs text-muted-foreground italic">{c.attribution}</p>
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
