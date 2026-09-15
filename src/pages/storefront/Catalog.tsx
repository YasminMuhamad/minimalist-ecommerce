import { useState } from "react";
import { useParams } from "react-router-dom";
import { ProductFilters } from "@/components/catalog/ProductFilters";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { CatalogEmptyState } from "@/components/catalog/CatalogEmptyState";
import { CatalogSkeleton } from "@/components/catalog/CatalogSkeleton";
import { ProductPagination } from "@/components/catalog/ProductPagination";
import { ProductToolbar } from "@/components/catalog/ProductToolbar";
import { Sheet } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCatalogFilters } from "@/hooks/useCatalogFilters";
import { useLocale } from "@/hooks/useLocale";
import { useProducts } from "@/hooks/useProducts";
import type { CatalogFilters } from "@/types";

export function Catalog() {
  const { categoryId } = useParams();
  const { locale, t } = useLocale();
  const { filters, setFilters, setSort, clearFilters } =
    useCatalogFilters(categoryId);
  const {
    products,
    categories,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
    refresh,
  } = useProducts(filters);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const activeCategory = categories.find(
    (category) => category.id === filters.categoryId,
  );
  const hasFilters = Boolean(
    filters.categoryId ||
    filters.minPrice !== undefined ||
    filters.maxPrice !== undefined,
  );

  function applyFilters(next: CatalogFilters) {
    setFilters(next);
    setFiltersOpen(false);
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 lg:py-16">
      <header className="mb-10 max-w-2xl">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
          {activeCategory ? activeCategory.name[locale] : t.nav.shop}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {activeCategory ? activeCategory.name[locale] : t.catalog.title}
        </h1>
        <p className="mt-4 text-sm leading-6 text-[var(--muted-foreground)]">
          {t.catalog.subtitle}
        </p>
      </header>
      <ProductToolbar
        count={products.length}
        onOpenFilters={() => setFiltersOpen(true)}
        onSort={setSort}
        priceRangeActive={
          filters.minPrice !== undefined || filters.maxPrice !== undefined
        }
        sort={filters.sort}
      />
      <div className="mt-8 grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <h2 className="mb-5 text-sm font-semibold">{t.catalog.filters}</h2>
            <ProductFilters
              categories={categories}
              filters={filters}
              onApply={applyFilters}
              onClear={clearFilters}
            />
          </div>
        </aside>
        <section aria-live="polite" className="min-w-0">
          {loading ? (
            <CatalogSkeleton />
          ) : error ? (
            <div className="border border-[var(--border)] px-6 py-16 text-center">
              <p className="text-sm">{t.catalog.error}</p>
              <Button
                className="mt-5"
                onClick={() => void refresh()}
                variant="outline"
              >
                {t.catalog.retry}
              </Button>
            </div>
          ) : products.length === 0 ? (
            <CatalogEmptyState filtered={hasFilters} onClear={clearFilters} />
          ) : (
            <>
              <ProductGrid products={products} />
              <ProductPagination
                hasMore={hasMore}
                loading={loadingMore}
                onLoadMore={() => void loadMore()}
              />
            </>
          )}
        </section>
      </div>
      <Sheet
        closeLabel={t.nav.closeMenu}
        onClose={() => setFiltersOpen(false)}
        open={filtersOpen}
        title={t.catalog.filters}
      >
        <ProductFilters
          categories={categories}
          filters={filters}
          onApply={applyFilters}
          onClear={() => {
            clearFilters();
            setFiltersOpen(false);
          }}
        />
      </Sheet>
    </main>
  );
}

export function Category() {
  return <Catalog />;
}
