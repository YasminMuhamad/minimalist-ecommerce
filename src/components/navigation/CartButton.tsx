import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/hooks/useLocale";
import { cn } from "@/lib/utils";

/**
 * Cart entry point with count badge. Phase 2 ships the control only — `count`
 * is supplied by the caller so the Cart phase can swap in real state without
 * touching the header (Risk 7).
 */
export function CartButton({
  count,
  className,
}: {
  count: number;
  className?: string;
}) {
  const { t } = useLocale();

  return (
    <Link
      to="/cart"
      className={cn(
        "relative inline-flex size-10 items-center justify-center rounded-md",
        "text-[var(--foreground)] transition-colors hover:bg-[var(--muted)]",
        className,
      )}
    >
      <ShoppingBag className="size-[18px]" aria-hidden="true" />
      <Badge
        aria-hidden="true"
        className="pointer-events-none absolute -top-0.5 end-0"
      >
        {count}
      </Badge>
      <span className="sr-only">{`${t.nav.cart} — ${count} ${t.nav.cartItems}`}</span>
    </Link>
  );
}
