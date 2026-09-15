import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductSort } from "./ProductSort";
import { useLocale } from "@/hooks/useLocale";
import type { CatalogSort } from "@/types";

export function ProductToolbar({
  count,
  sort,
  onSort,
  onOpenFilters,
  priceRangeActive,
}: {
  count: number;
  sort: CatalogSort;
  onSort: (sort: CatalogSort) => void;
  onOpenFilters: () => void;
  priceRangeActive: boolean;
}) {
  const { t } = useLocale();
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-y border-[var(--border)] py-4">
      <p className="text-sm text-[var(--muted-foreground)]">
        {count} {t.catalog.results}
      </p>
      <div className="flex items-center gap-3">
        <Button className="md:hidden" onClick={onOpenFilters} variant="outline">
          <Filter className="size-4" />
          {t.catalog.filters}
        </Button>
        <div className="text-end">
          <ProductSort onChange={onSort} value={sort} />
          {priceRangeActive && sort === "newest" ? (
            <p className="mt-1 text-[11px] text-[var(--muted-foreground)]">
              {t.catalog.priceRangeNewestNote}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
