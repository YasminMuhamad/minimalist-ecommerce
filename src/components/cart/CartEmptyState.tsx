import { Link } from "react-router-dom";
import { useLocale } from "@/hooks/useLocale";

export function CartEmptyState({ onNavigate }: { onNavigate?: () => void }) {
  const { t } = useLocale();
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
      <p className="text-sm text-[var(--muted-foreground)]">{t.cart.empty}</p>
      <Link
        className="mt-5 inline-flex h-10 items-center justify-center rounded-md border border-[var(--border)] px-4 py-2 text-sm hover:bg-[var(--muted)]"
        onClick={onNavigate}
        to="/shop"
      >
        {t.cart.continueShopping}
      </Link>
    </div>
  );
}
