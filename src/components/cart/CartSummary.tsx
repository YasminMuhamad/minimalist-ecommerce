import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { useLocale } from "@/hooks/useLocale";
import { defaultCurrency } from "@/constants/site";
import { formatCurrency } from "@/utils/pricing";

export function CartSummary({ onNavigate }: { onNavigate?: () => void }) {
  const { subtotal, currency } = useCart();
  const { locale, t } = useLocale();
  const formatted = formatCurrency(
    subtotal,
    currency ?? defaultCurrency,
    locale,
  );
  return (
    <div className="border-t border-[var(--border)] pt-5">
      <div className="mb-4 flex justify-between text-sm">
        <span>{t.cart.subtotal}</span>
        <strong>{formatted}</strong>
      </div>
      <Link
        className="inline-flex h-10 w-full items-center justify-center rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)] hover:opacity-90"
        onClick={onNavigate}
        to="/checkout"
      >
        {t.cart.checkout}
      </Link>
    </div>
  );
}
