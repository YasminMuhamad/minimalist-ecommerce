import { useLocale } from "@/hooks/useLocale";

export function ProductStockStatus({ stock }: { stock?: number }) {
  const { t } = useLocale();
  const label =
    stock === 0
      ? t.productDetails.soldOut
      : stock !== undefined && stock <= 5
        ? t.productDetails.lowStock
        : t.productDetails.inStock;
  return <p className="text-sm text-[var(--muted-foreground)]">{label}</p>;
}
