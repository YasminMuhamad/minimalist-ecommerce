import { useLocale } from "@/hooks/useLocale";

export function CatalogSkeleton({ count = 8 }: { count?: number }) {
  const { t } = useLocale();
  return (
    <div
      aria-label={t.catalog.loading}
      className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6"
    >
      {Array.from({ length: count }, (_, index) => (
        <div className="animate-pulse" key={index}>
          <div className="aspect-[4/5] bg-[var(--muted)]" />
          <div className="mt-4 h-4 w-3/4 bg-[var(--muted)]" />
          <div className="mt-3 h-3 w-1/3 bg-[var(--muted)]" />
        </div>
      ))}
    </div>
  );
}
