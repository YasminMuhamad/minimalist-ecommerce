import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useLocale } from "@/hooks/useLocale";
import type { Product } from "@/types";

export function AddToCartButton({
  product,
  quantity,
  selectedVariants,
  onAdded,
}: {
  product: Product;
  quantity: number;
  selectedVariants: Record<string, string | undefined>;
  onAdded: () => void;
}) {
  const { addItem } = useCart();
  const { t } = useLocale();
  const missingSize = Boolean(product.sizes?.length && !selectedVariants.size);
  const missingColor = Boolean(
    product.colors?.length && !selectedVariants.color,
  );
  const disabled = product.stock === 0 || missingSize || missingColor;
  return (
    <Button
      className="w-full"
      disabled={disabled}
      onClick={() => {
        addItem(product, quantity, selectedVariants);
        onAdded();
      }}
      type="button"
    >
      {product.stock === 0
        ? t.productDetails.soldOut
        : t.productDetails.addToCart}
    </Button>
  );
}
