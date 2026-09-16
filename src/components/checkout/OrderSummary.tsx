import { useCart } from "@/hooks/useCart";
import { useLocale } from "@/hooks/useLocale";
import { CheckoutItem } from "./CheckoutItem";
import { defaultCurrency } from "@/constants/site";
import { formatCurrency } from "@/utils/pricing";

export function OrderSummary() {
  const { items, subtotal, currency } = useCart();
  const { locale, t } = useLocale();
  const total = formatCurrency(subtotal, currency ?? defaultCurrency, locale);
  const variantLabel = (key: string) =>
    key === "size"
      ? t.productDetails.size
      : key === "color"
        ? t.productDetails.color
        : key;
  return (
    <section className="space-y-5">
      <h2 className="text-lg font-semibold">{t.checkout.orderSummary}</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.lineId}>
            <CheckoutItem item={item} />
            {item.selectedVariants ? (
              <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                {Object.entries(item.selectedVariants)
                  .filter(([, value]) => value)
                  .map(([key, value]) => `${variantLabel(key)}: ${value}`)
                  .join(" · ")}
              </p>
            ) : null}
          </div>
        ))}
      </div>
      <div className="flex justify-between border-t border-[var(--border)] pt-4 text-sm font-semibold">
        <span>{t.cart.subtotal}</span>
        <span>{total}</span>
      </div>
    </section>
  );
}
