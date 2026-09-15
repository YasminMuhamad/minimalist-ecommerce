import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/useLocale";

export function ProductPagination({
  hasMore,
  loading,
  onLoadMore,
}: {
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
}) {
  const { t } = useLocale();
  if (!hasMore)
    return (
      <p className="py-10 text-center text-xs text-[var(--muted-foreground)]">
        {t.catalog.end}
      </p>
    );
  return (
    <div className="flex justify-center py-10">
      <Button disabled={loading} onClick={onLoadMore} variant="outline">
        {loading ? t.catalog.loadingMore : t.catalog.loadMore}
      </Button>
    </div>
  );
}
