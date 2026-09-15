import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocale } from "@/hooks/useLocale";
import type { CatalogFilters, Category } from "@/types";

export function ProductFilters({
  filters,
  categories,
  onApply,
  onClear,
}: {
  filters: CatalogFilters;
  categories: Category[];
  onApply: (filters: CatalogFilters) => void;
  onClear: () => void;
}) {
  const { locale, t } = useLocale();
  const [categoryId, setCategoryId] = useState(filters.categoryId ?? "");
  const [minPrice, setMinPrice] = useState(filters.minPrice?.toString() ?? "");
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice?.toString() ?? "");
  const apply = () =>
    onApply({
      categoryId: categoryId || undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      sort: filters.sort,
    });
  return (
    <div className="space-y-6">
      <div>
        <label
          className="mb-2 block text-xs font-medium uppercase tracking-wide"
          htmlFor="catalog-category"
        >
          {t.category.home}
        </label>
        <select
          className="h-11 w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-3 text-sm"
          id="catalog-category"
          onChange={(event) => setCategoryId(event.target.value)}
          value={categoryId}
        >
          <option value="">{t.catalog.allProducts}</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name[locale] || category.name.en}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <label className="space-y-2 text-xs" htmlFor="catalog-min">
          <span>{t.catalog.minPrice}</span>
          <Input
            id="catalog-min"
            min="0"
            onChange={(event) => setMinPrice(event.target.value)}
            type="number"
            value={minPrice}
          />
        </label>
        <label className="space-y-2 text-xs" htmlFor="catalog-max">
          <span>{t.catalog.maxPrice}</span>
          <Input
            id="catalog-max"
            min="0"
            onChange={(event) => setMaxPrice(event.target.value)}
            type="number"
            value={maxPrice}
          />
        </label>
      </div>
      <div className="flex gap-2">
        <Button className="flex-1" onClick={apply}>
          {t.catalog.apply}
        </Button>
        <Button onClick={onClear} variant="outline">
          {t.catalog.clearFilters}
        </Button>
      </div>
    </div>
  );
}
