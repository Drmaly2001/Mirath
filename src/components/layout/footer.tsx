import Link from "next/link";
import { IslamicDivider } from "@/components/ui/islamic-pattern";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-white/90 py-8">
      <div className="mx-auto max-w-6xl px-4">
        <IslamicDivider className="mb-6" />

        <div className="grid gap-8 text-sm sm:grid-cols-3">
          {/* العمود 1: عن التطبيق */}
          <div>
            <p className="mb-2 font-semibold text-foreground">ميراث</p>
            <p className="leading-relaxed text-muted-foreground">
              حاسبة المواريث الإسلامية الذكية — مرشد فقهي تعليمي مجاني ومفتوح المصدر
            </p>
          </div>

          {/* العمود 2: روابط سريعة */}
          <div>
            <p className="mb-2 font-semibold text-foreground">روابط سريعة</p>
            <ul className="space-y-1.5 text-muted-foreground">
              <li>
                <Link href="/calculator" className="hover:text-primary transition-colors">
                  الحاسبة
                </Link>
              </li>
              <li>
                <Link href="/library" className="hover:text-primary transition-colors">
                  المكتبة الفقهية
                </Link>
              </li>
              <li>
                <Link href="/library/philosophy" className="hover:text-primary transition-colors">
                  فلسفة الميراث
                </Link>
              </li>
              <li>
                <Link href="/library/special-cases" className="hover:text-primary transition-colors">
                  الحالات الخاصة
                </Link>
              </li>
            </ul>
          </div>

          {/* العمود 3: الآية */}
          <div>
            <p className="mb-2 font-semibold text-foreground">من القرآن الكريم</p>
            <p className="leading-relaxed text-muted-foreground">
              ﴿ لِّلرِّجَالِ نَصِيبٌ مِّمَّا تَرَكَ الْوَالِدَانِ وَالْأَقْرَبُونَ ﴾
            </p>
            <p className="mt-1 text-xs text-muted-foreground/70">سورة النساء: 7</p>
          </div>
        </div>

        <div className="mt-8 border-t border-border/40 pt-4 text-center text-xs text-muted-foreground">
          مجاني ومفتوح المصدر — صُنع بإتقان لخدمة المسلمين
        </div>
      </div>
    </footer>
  );
}
