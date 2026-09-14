import { CategoryLinks } from "@/components/navigation/CategoryLinks";
import { useLocale } from "@/hooks/useLocale";

/** Desktop category navigation (Step 13). */
export function MainNavigation() {
  const { t } = useLocale();

  return (
    <nav aria-label={t.nav.primary} className="hidden lg:block">
      <CategoryLinks variant="inline" />
    </nav>
  );
}
