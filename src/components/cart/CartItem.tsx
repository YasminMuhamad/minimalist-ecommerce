import { Link } from "react-router-dom";
import { useLocale } from "@/hooks/useLocale";
import { useCart } from "@/hooks/useCart";
import { OptimizedImage } from "@/components/cloudinary/OptimizedImage";
import { CartQuantityControl } from "./CartQuantityControl";
import type { CartItem as CartItemType } from "@/types";

export function CartItem({ item }: { item: CartItemType }) {
  const { locale, t } = useLocale();
  const { removeItem } = useCart();
  const title = item.title[locale] || item.title.en;
  const price = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: item.currency,
  }).format(item.unitPrice * item.quantity);
  const variantLabel = (key: string) =>
    key === "size"
      ? t.productDetails.size
      : key === "color"
        ? t.productDetails.color
        : key;
  return (
    <article className="flex gap-3">
      <Link
        className="size-20 shrink-0 overflow-hidden bg-[var(--muted)]"
        to={`/product/${item.productId}`}
      >
        <OptimizedImage
          alt={title}
          className="size-full object-cover"
          src={item.image?.url}
          transformations={{ width: 160, height: 160, crop: "fill" }}
        />
      </Link>
      <div className="min-w-0 flex-1">
        <div className="flex justify-between gap-2">
          <Link
            className="line-clamp-2 text-sm font-medium"
            to={`/product/${item.productId}`}
          >
            {title}
          </Link>
          <button
            aria-label={t.cart.remove}
            className="text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            onClick={() => removeItem(item.lineId)}
            type="button"
          >
            {t.cart.remove}
          </button>
        </div>
        {item.selectedVariants && (
          <p className="mt-1 text-xs text-[var(--muted-foreground)]">
            {Object.entries(item.selectedVariants)
              .filter(([, value]) => value)
              .map(([key, value]) => `${variantLabel(key)}: ${value}`)
              .join(" · ")}
          </p>
        )}
        <div className="mt-3 flex items-center justify-between">
          <CartQuantityControl lineId={item.lineId} quantity={item.quantity} />
          <span className="text-sm">{price}</span>
        </div>
      </div>
    </article>
  );
}
