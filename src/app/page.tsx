import Link from "next/link";
import { Scale, BookOpen, Calculator, ChevronLeft } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IslamicDivider } from "@/components/ui/islamic-pattern";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background/80 to-background/80 py-20 md:py-32">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
              <Scale className="h-8 w-8" />
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              حاسبة المواريث الإسلامية الذكية
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              ليس مجرد آلة حساب — بل مرشد فقهي تعليمي يجمع بين{" "}
              <span className="font-semibold text-primary">الدقة الفقهية</span> والشرح
              الفلسفي وتجربة المستخدم الاحترافية
            </p>
            <Link href="/calculator">
              <Button size="lg" className="gap-2 text-base">
                ابدأ الحساب
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="relative py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="mb-2 text-center text-2xl font-bold text-foreground">
              ماذا يقدم لك ميراث؟
            </h2>
            <IslamicDivider className="mb-8" />
            <div className="grid gap-6 md:grid-cols-3">
              <FeatureCard
                icon={<Calculator className="h-6 w-6" />}
                title="حساب دقيق"
                description="محرك فقهي يغطي جميع حالات المواريث: الفروض، العصبة، العول، الرد، والحجب بكسور دقيقة"
              />
              <FeatureCard
                icon={<BookOpen className="h-6 w-6" />}
                title="شرح وأدلة"
                description="لكل نصيب الآية القرآنية والدليل الفقهي مع شرح فلسفي لحكمة التوزيع في الشريعة الإسلامية"
              />
              <FeatureCard
                icon={<Scale className="h-6 w-6" />}
                title="المقارنة العادلة"
                description="توضيح المعادلة المالية الكاملة بين الرجل والمرأة مع مراعاة المهر والنفقة والالتزامات"
              />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-border/60 py-16">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="mb-2 text-center text-2xl font-bold text-foreground">
              أسئلة شائعة
            </h2>
            <IslamicDivider className="mb-8" />
            <Accordion className="w-full">
              <AccordionItem value="q1">
                <AccordionTrigger>ما هو علم الفرائض (المواريث)؟</AccordionTrigger>
                <AccordionContent>
                  علم الفرائض هو العلم الذي يُعرف به من يرث ومن لا يرث، ومقدار نصيب كل
                  وارث من التركة. سمّاه النبي ﷺ «نصف العلم» لأهميته، وأحكامه منصوص عليها
                  في القرآن الكريم (سورة النساء: الآيات 11 و12 و176) وفي السنة النبوية.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q2">
                <AccordionTrigger>ما الذي يُخصم من التركة قبل التوزيع؟</AccordionTrigger>
                <AccordionContent>
                  تُخصم من التركة بالترتيب: (1) تكاليف تجهيز الميت ودفنه، (2) سداد
                  ديون المتوفى، (3) تنفيذ الوصية بحد أقصى ثلث التركة. وما بقي بعد ذلك
                  هو الذي يُوزع على الورثة.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q3">
                <AccordionTrigger>هل المرأة دائماً تأخذ نصف الرجل؟</AccordionTrigger>
                <AccordionContent>
                  لا. هذا من أكثر المفاهيم الخاطئة شيوعاً. المرأة تأخذ نصف الرجل في 4
                  حالات فقط من أصل أكثر من 30 حالة. وفي حالات كثيرة ترث المرأة مثل
                  الرجل تماماً (كالأم والأب مع وجود ابن — كلاهما السدس)، أو أكثر منه
                  (كبنت واحدة مع أب — البنت النصف والأب الثلث)، أو ترث هي ولا يرث هو.
                  التفصيل الكامل في{" "}
                  <Link href="/library/philosophy" className="font-medium text-primary hover:underline">
                    صفحة الفلسفة
                  </Link>.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q4">
                <AccordionTrigger>ما هو العول؟</AccordionTrigger>
                <AccordionContent>
                  العول يحدث عندما يكون مجموع أنصبة أصحاب الفروض أكبر من التركة. الحل:
                  يتم تخفيض جميع الأنصبة بنسبة متساوية حتى تتوافق مع التركة. مثلاً: إذا
                  كان أصل المسألة 6 ومجموع السهام 8، يصبح الأصل الجديد 8 ويأخذ كل وارث
                  سهامه من 8 بدلاً من 6.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q5">
                <AccordionTrigger>ما هو الرد؟</AccordionTrigger>
                <AccordionContent>
                  الرد عكس العول — يحدث عندما لا يستغرق أصحاب الفروض كل التركة ولا يوجد
                  عاصب. في هذه الحالة يُعاد الفائض على أصحاب الفروض بنسبة أنصبتهم، ما
                  عدا الزوج أو الزوجة فلا يُرد عليهما على مذهب الجمهور.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q6">
                <AccordionTrigger>ما معنى الحجب في الميراث؟</AccordionTrigger>
                <AccordionContent>
                  الحجب هو منع وارث من ميراثه كلياً أو جزئياً بسبب وجود وارث آخر أقرب.
                  مثلاً: الابن يحجب الأخ الشقيق (حجب حرمان — لا يرث شيئاً). والفرع
                  الوارث ينقص نصيب الزوج من النصف إلى الربع (حجب نقصان).
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q7">
                <AccordionTrigger>ما الفرق بين صاحب الفرض والعاصب؟</AccordionTrigger>
                <AccordionContent>
                  صاحب الفرض: من له نصيب محدد في القرآن (النصف، الربع، الثمن، الثلثان،
                  الثلث، السدس). مثل: الزوج، الزوجة، الأم، البنت المنفردة.
                  <br /><br />
                  العاصب: من يأخذ ما بقي بعد أصحاب الفروض. إذا لم يبقَ شيء لا يأخذ
                  شيئاً، وإذا انفرد أخذ المال كله. مثل: الابن، الأخ الشقيق.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q8">
                <AccordionTrigger>هل الوصية لوارث جائزة؟</AccordionTrigger>
                <AccordionContent>
                  لا تجوز الوصية لوارث عند جمهور العلماء، لقول النبي ﷺ: «إن الله قد أعطى
                  كل ذي حق حقه فلا وصية لوارث». والوصية تكون لغير الوارث فقط، وبحد أقصى
                  ثلث التركة بعد سداد الديون.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q9">
                <AccordionTrigger>هل هذه الحاسبة تغني عن استشارة عالم شرعي؟</AccordionTrigger>
                <AccordionContent>
                  الحاسبة أداة تعليمية ومساعدة تعطيك الحساب الفقهي الصحيح للحالات
                  الأساسية. لكن في الحالات المعقدة أو المتنازع عليها بين المذاهب، أو عند
                  وجود وقف أو هبة أو ظروف خاصة، يُنصح باستشارة عالم شرعي أو محامٍ
                  متخصص في الأحوال الشخصية.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Quran verse */}
        <section className="border-t border-border/60 bg-primary/5 py-12">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <p className="text-xl font-semibold leading-relaxed text-foreground">
              ﴿ لِّلرِّجَالِ نَصِيبٌ مِّمَّا تَرَكَ الْوَالِدَانِ وَالْأَقْرَبُونَ
              وَلِلنِّسَاءِ نَصِيبٌ مِّمَّا تَرَكَ الْوَالِدَانِ وَالْأَقْرَبُونَ
              مِمَّا قَلَّ مِنْهُ أَوْ كَثُرَ ۚ نَصِيبًا مَّفْرُوضًا ﴾
            </p>
            <p className="mt-3 text-sm text-muted-foreground">سورة النساء — الآية 7</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="border-border/60 transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="text-sm leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
