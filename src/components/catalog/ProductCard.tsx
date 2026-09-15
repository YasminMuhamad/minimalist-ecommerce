import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { OptimizedImage } from "@/components/cloudinary/OptimizedImage";
import { useLocale } from "@/hooks/useLocale";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  const { locale, t } = useLocale();
  const title = product.title[locale] || product.title.en || product.title.ar;
  const discount =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round((1 - product.price / product.compareAtPrice) * 100)
      : 0;
  const price = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: product.currency,
  }).format(product.price);
  const compare = product.compareAtPrice
    ? new Intl.NumberFormat(locale, {
        style: "currency",
        currency: product.currency,
      }).format(product.compareAtPrice)
    : null;
  return (
    <article className="group min-w-0">
      <Link aria-label={title} className="block" to={`/product/${product.id}`}>
        <div className="aspect-[4/5] overflow-hidden bg-[var(--muted)]">
          <OptimizedImage
            alt={product.images[0]?.alt?.[locale] || title}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            src={product.images[0]?.url}
            transformations={{ width: 640, height: 800, crop: "fill" }}
          />
        </div>
        <div className="space-y-2 pt-4">
          <div className="flex items-start justify-between gap-3">
            <h2 className="line-clamp-2 text-sm font-medium">{title}</h2>
            {discount > 0 ? (
              <Badge>
                {discount}% {t.catalog.discount}
              </Badge>
            ) : null}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span>{price}</span>
            {compare ? (
              <del className="text-xs text-[var(--muted-foreground)]">
                {compare}
              </del>
            ) : null}
          </div>
          <p className="text-xs text-[var(--muted-foreground)]">
            {product.stock === 0 ? t.catalog.soldOut : t.catalog.inStock}
          </p>
        </div>
      </Link>
    </article>
  );
}
