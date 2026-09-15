import type { CatalogSort } from "@/types";
import { useLocale } from "@/hooks/useLocale";

export function ProductSort({
  value,
  onChange,
}: {
  value: CatalogSort;
  onChange: (sort: CatalogSort) => void;
}) {
  const { t } = useLocale();
  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="text-[var(--muted-foreground)]">{t.catalog.sort}</span>
      <select
        className="rounded-md border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
        onChange={(event) => onChange(event.target.value as CatalogSort)}
        value={value}
      >
        <option value="newest">{t.catalog.newest}</option>
        <option value="price-asc">{t.catalog.priceAsc}</option>
        <option value="price-desc">{t.catalog.priceDesc}</option>
      </select>
    </label>
  );
}
