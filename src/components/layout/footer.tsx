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

          {/* العمود 3: حديث نبوي */}
          <div>
            <p className="mb-2 font-semibold text-foreground">من السنة النبوية</p>
            <p className="leading-relaxed text-muted-foreground">
              قال رسول الله ﷺ: «تعلَّموا الفرائضَ وعلِّموها الناسَ، فإنَّه نصفُ العلمِ، وهو يُنسى، وهو أوَّلُ شيءٍ يُنزعُ من أمَّتي»
            </p>
            <p className="mt-1 text-xs text-muted-foreground/70">رواه ابن ماجه والدارقطني عن أبي هريرة رضي الله عنه</p>
          </div>
        </div>

        <div className="mt-8 border-t border-border/40 pt-4 text-center text-xs text-muted-foreground">
          <p>مجاني ومفتوح المصدر — صُنع بإتقان لخدمة المسلمين</p>
          <p className="mt-2">
            تم التطوير بواسطة{" "}
            <a
              href="https://drmliAi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              drmliAi.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
