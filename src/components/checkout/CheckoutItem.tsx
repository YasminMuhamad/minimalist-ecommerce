import { useLocale } from "@/hooks/useLocale";
import type { CartItem } from "@/types";

export function CheckoutItem({ item }: { item: CartItem }) {
  const { locale } = useLocale();
  const title = item.title[locale] || item.title.en;
  const total = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: item.currency,
  }).format(item.unitPrice * item.quantity);
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span>
        {title} × {item.quantity}
      </span>
      <span>{total}</span>
    </div>
  );
}
