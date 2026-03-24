import { IslamicDivider } from "@/components/ui/islamic-pattern";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-white/90 py-6">
      <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground">
        <IslamicDivider className="mb-4" />
        <p>﴿ لِّلرِّجَالِ نَصِيبٌ مِّمَّا تَرَكَ الْوَالِدَانِ وَالْأَقْرَبُونَ ﴾</p>
        <p className="mt-2">
          ميراث — حاسبة المواريث الإسلامية الذكية
        </p>
      </div>
    </footer>
  );
}
