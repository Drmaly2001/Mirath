import Link from "next/link";
import {
  Scale,
  BookOpen,
  Calculator,
  ChevronLeft,
  Users,
  GraduationCap,
  Gavel,
  Presentation,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IslamicDivider } from "@/components/ui/islamic-pattern";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* ===== Hero ===== */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background/80 to-background/80 py-20 md:py-32">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <Badge variant="secondary" className="mb-6 text-sm">
              <Sparkles className="ml-1 h-3.5 w-3.5" />
              مجاني بالكامل — لا اشتراك ولا إعلانات
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              وزّع الميراث بدقة فقهية
              <br />
              <span className="text-primary">في دقائق معدودة</span>
            </h1>
            <p className="mx-auto mb-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              أول حاسبة مواريث عربية تجمع بين الحساب الدقيق بالكسور والشرح
              التعليمي مع الأدلة القرآنية — حتى لو لم تدرس علم الفرائض من قبل
            </p>
            <div className="mx-auto mb-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                30+ حالة فقهية
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                أدلة قرآنية لكل نصيب
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                طباعة وتنزيل ومشاركة
              </span>
            </div>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/calculator">
                <Button size="lg" className="gap-2 text-base">
                  ابدأ الحساب مجاناً
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/library">
                <Button variant="outline" size="lg" className="gap-2 text-base">
                  تصفّح المكتبة الفقهية
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ===== أرقام وحقائق ===== */}
        <section className="border-t border-border/60 py-14">
          <div className="mx-auto max-w-5xl px-4">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <StatCard number="30+" label="حالة فقهية مغطاة" />
              <StatCard number="6" label="فروض قرآنية مقدّرة" />
              <StatCard number="100%" label="دقة بالكسور" />
              <StatCard number="4+" label="حالات خاصة مسماة" />
            </div>
          </div>
        </section>

        {/* ===== المميزات ===== */}
        <section className="relative border-t border-border/60 py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="mb-2 text-center text-2xl font-bold text-foreground">
              ماذا يقدم لك ميراث؟
            </h2>
            <IslamicDivider className="mb-8" />
            <div className="grid gap-6 md:grid-cols-3">
              <FeatureCard
                icon={<Calculator className="h-6 w-6" />}
                title="حساب دقيق بالكسور"
                description="محرك فقهي يحسب بالكسور الحقيقية (1/2، 1/6، 2/3) وليس بالأعداد العشرية — نفس الطريقة التي يحسب بها العلماء يدوياً"
              />
              <FeatureCard
                icon={<BookOpen className="h-6 w-6" />}
                title="شرح مع الدليل"
                description="لكل وارث: الآية القرآنية، الشرح الفقهي، وحكمة التوزيع. اضغط على 'التفسير والدليل' لترى التفاصيل"
              />
              <FeatureCard
                icon={<Scale className="h-6 w-6" />}
                title="معالجة الحالات المعقدة"
                description="العول، الرد، الحجب، العمريتان، المشتركة — كل الحالات المعقدة تُكتشف وتُعالج تلقائياً مع الشرح"
              />
            </div>
          </div>
        </section>

        {/* ===== كيف يعمل؟ ===== */}
        <section className="border-t border-border/60 bg-primary/[0.03] py-16">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="mb-2 text-center text-2xl font-bold text-foreground">
              كيف يعمل؟
            </h2>
            <IslamicDivider className="mb-10" />
            <div className="grid gap-8 md:grid-cols-3">
              <StepCard
                number="1"
                title="أدخل التركة"
                description="حدد قيمة التركة الإجمالية واخصم الديون وتكاليف التجهيز والوصية"
              />
              <StepCard
                number="2"
                title="حدد الورثة"
                description="اختر الورثة خطوة بخطوة: الزوجية، الأبناء، الأصول، ثم الحواشي"
              />
              <StepCard
                number="3"
                title="احصل على النتائج"
                description="نصيب كل وارث بالكسر والمبلغ مع الدليل القرآني — قابل للطباعة والمشاركة"
              />
            </div>
          </div>
        </section>

        {/* ===== لمن هذا التطبيق؟ ===== */}
        <section className="border-t border-border/60 py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="mb-2 text-center text-2xl font-bold text-foreground">
              لمن هذا التطبيق؟
            </h2>
            <IslamicDivider className="mb-8" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <AudienceCard
                icon={<Users className="h-6 w-6" />}
                title="العائلات"
                description="لتوزيع التركة بين الورثة بعدالة شرعية وشفافية كاملة"
              />
              <AudienceCard
                icon={<GraduationCap className="h-6 w-6" />}
                title="طلاب العلم الشرعي"
                description="لفهم علم الفرائض تطبيقياً ومقارنة نتائجك مع المحرك"
              />
              <AudienceCard
                icon={<Gavel className="h-6 w-6" />}
                title="المحامون والقضاة"
                description="أداة مساعدة سريعة في قضايا الأحوال الشخصية والتركات"
              />
              <AudienceCard
                icon={<Presentation className="h-6 w-6" />}
                title="المعلمون والدعاة"
                description="لشرح أحكام المواريث بوسيلة تفاعلية مع الأدلة والتفسير"
              />
            </div>
          </div>
        </section>

        {/* ===== لماذا ميراث؟ ===== */}
        <section className="border-t border-border/60 bg-primary/[0.03] py-16">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="mb-2 text-center text-2xl font-bold text-foreground">
              لماذا ميراث؟
            </h2>
            <IslamicDivider className="mb-8" />
            <div className="grid gap-4 sm:grid-cols-2">
              <WhyItem text="دقة فقهية: حساب بالكسور الحقيقية وليس بالأعداد العشرية التقريبية" />
              <WhyItem text="شرح تعليمي: لكل نصيب الآية القرآنية والدليل الشرعي والحكمة" />
              <WhyItem text="الحالات الخاصة: العمريتان والمشتركة والمنبرية والأكدرية" />
              <WhyItem text="العول والرد: كشف ومعالجة تلقائية مع شرح مبسّط للمستخدم" />
              <WhyItem text="الحجب: كشف تلقائي لمن يُحجب ولماذا مع ذكر القاعدة الفقهية" />
              <WhyItem text="طباعة وتنزيل: احفظ النتائج كملف أو اطبعها أو شاركها مباشرة" />
              <WhyItem text="مكتبة فقهية: مصطلحات وحالات خاصة وفلسفة الميراث في الإسلام" />
              <WhyItem text="مجاني ومفتوح المصدر: لا إعلانات ولا اشتراك ولا جمع بيانات" />
            </div>
          </div>
        </section>

        {/* ===== أسئلة شائعة ===== */}
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
                  الرجل تماماً أو أكثر منه أو ترث هي ولا يرث هو.
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
                  يتم تخفيض جميع الأنصبة بنسبة متساوية حتى تتوافق مع التركة.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q5">
                <AccordionTrigger>ما هو الرد؟</AccordionTrigger>
                <AccordionContent>
                  الرد عكس العول — يحدث عندما لا يستغرق أصحاب الفروض كل التركة ولا يوجد
                  عاصب. يُعاد الفائض على أصحاب الفروض بنسبة أنصبتهم ما عدا الزوجين.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q6">
                <AccordionTrigger>ما معنى الحجب في الميراث؟</AccordionTrigger>
                <AccordionContent>
                  الحجب هو منع وارث من ميراثه كلياً أو جزئياً بسبب وجود وارث آخر أقرب.
                  مثلاً: الابن يحجب الأخ الشقيق (حجب حرمان). والفرع الوارث ينقص نصيب
                  الزوج من النصف إلى الربع (حجب نقصان).
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q7">
                <AccordionTrigger>هل الوصية لوارث جائزة؟</AccordionTrigger>
                <AccordionContent>
                  لا تجوز الوصية لوارث عند جمهور العلماء، لقول النبي ﷺ: «إن الله قد أعطى
                  كل ذي حق حقه فلا وصية لوارث». والوصية تكون لغير الوارث فقط وبحد أقصى
                  ثلث التركة.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q8">
                <AccordionTrigger>هل هذه الحاسبة تغني عن استشارة عالم شرعي؟</AccordionTrigger>
                <AccordionContent>
                  الحاسبة أداة تعليمية ومساعدة تعطيك الحساب الفقهي الصحيح للحالات
                  الأساسية. لكن في الحالات المعقدة أو المتنازع عليها يُنصح باستشارة
                  عالم شرعي أو محامٍ متخصص في الأحوال الشخصية.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* ===== CTA نهائي ===== */}
        <section className="border-t border-border/60 bg-primary/[0.03] py-16">
          <div className="mx-auto max-w-2xl px-4 text-center">
            <h2 className="mb-3 text-2xl font-bold text-foreground">
              جاهز لحساب الميراث؟
            </h2>
            <p className="mb-6 text-muted-foreground">
              أدخل بيانات التركة والورثة واحصل على التوزيع الشرعي الدقيق مع
              الأدلة والشرح — خلال دقائق
            </p>
            <Link href="/calculator">
              <Button size="lg" className="gap-2 text-base">
                ابدأ الحساب الآن
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* ===== الآية القرآنية ===== */}
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

// === مكونات مساعدة ===

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-white/80 p-5 text-center backdrop-blur-sm">
      <p className="text-3xl font-bold text-primary">{number}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
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

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-primary-foreground shadow-md">
        {number}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function AudienceCard({
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
      <CardHeader className="items-center text-center">
        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription className="text-sm leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

function WhyItem({ text }: { text: string }) {
  return (
    <div className="flex gap-3 rounded-lg border border-border/60 bg-white/80 p-4 backdrop-blur-sm">
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
      <p className="text-sm leading-relaxed text-foreground">{text}</p>
    </div>
  );
}
