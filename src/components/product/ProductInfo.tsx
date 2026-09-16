import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocale } from "@/hooks/useLocale";
import type { Product } from "@/types";
import { AddToCartButton } from "./AddToCartButton";
import { ProductQuantitySelector } from "./ProductQuantitySelector";
import { ProductStockStatus } from "./ProductStockStatus";
import { ProductVariants } from "./ProductVariants";

export function ProductInfo({ product }: { product: Product }) {
  const { locale, t } = useLocale();
  const [quantity, setQuantity] = useState(1);
  const [variants, setVariants] = useState<Record<string, string | undefined>>(
    {},
  );
  const [added, setAdded] = useState(false);
  const title = product.title[locale] || product.title.en;
  const description = product.description?.[locale] || product.description?.en;
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
    <div className="flex flex-col">
      <Link
        className="mb-8 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
        to="/shop"
      >
        ← {t.productDetails.backToShop}
      </Link>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h1>
      <div className="mt-5 flex items-center gap-3">
        <span className="text-lg">{price}</span>
        {compare ? (
          <del className="text-sm text-[var(--muted-foreground)]">
            {compare}
          </del>
        ) : null}
      </div>
      <div className="mt-4">
        <ProductStockStatus stock={product.stock} />
      </div>
      {description ? (
        <div className="mt-8 border-t border-[var(--border)] pt-6">
          <h2 className="text-sm font-semibold">
            {t.productDetails.description}
          </h2>
          <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground)]">
            {description}
          </p>
        </div>
      ) : null}
      <div className="mt-8 space-y-6">
        {product.sizes?.length ? (
          <ProductVariants
            label={t.productDetails.size}
            onChange={(value) =>
              setVariants((current) => ({ ...current, size: value }))
            }
            options={product.sizes}
            value={variants.size}
          />
        ) : null}
        {product.colors?.length ? (
          <ProductVariants
            label={t.productDetails.color}
            onChange={(value) =>
              setVariants((current) => ({ ...current, color: value }))
            }
            options={product.colors}
            value={variants.color}
          />
        ) : null}
        <ProductQuantitySelector
          max={product.stock}
          onChange={setQuantity}
          quantity={quantity}
        />
        <AddToCartButton
          onAdded={() => setAdded(true)}
          product={product}
          quantity={quantity}
          selectedVariants={variants}
        />
        {added ? (
          <p
            aria-live="polite"
            className="text-center text-sm text-[var(--muted-foreground)]"
          >
            {t.productDetails.addedToCart}
          </p>
        ) : null}
      </div>
    </div>
  );
}
