import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/useLocale";

export function CatalogEmptyState({
  filtered,
  onClear,
}: {
  filtered: boolean;
  onClear: () => void;
}) {
  const { t } = useLocale();
  return (
    <div className="border border-dashed border-[var(--border)] px-6 py-20 text-center">
      <p className="text-lg font-medium">
        {filtered ? t.catalog.emptyFiltered : t.catalog.empty}
      </p>
      {filtered ? (
        <Button className="mt-6" onClick={onClear} variant="outline">
          {t.catalog.clearFilters}
        </Button>
      ) : null}
    </div>
  );
}
