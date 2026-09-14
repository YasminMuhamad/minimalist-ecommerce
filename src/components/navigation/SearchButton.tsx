import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";
import { cn } from "@/lib/utils";

/**
 * Search entry point. Phase 2 provides the action and its destination only —
 * the product search engine is explicitly out of scope, so this routes to the
 * shop where search lands in a later phase.
 */
export function SearchButton({ className }: { className?: string }) {
  const { t } = useLocale();

  return (
    <Link
      to="/shop"
      aria-label={t.nav.openSearch}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-md",
        "text-[var(--foreground)] transition-colors hover:bg-[var(--muted)]",
        className,
      )}
    >
      <Search className="size-[18px]" aria-hidden="true" />
    </Link>
  );
}
