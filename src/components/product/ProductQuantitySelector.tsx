import { Minus, Plus } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

export function ProductQuantitySelector({
  quantity,
  max,
  onChange,
}: {
  quantity: number;
  max?: number;
  onChange: (quantity: number) => void;
}) {
  const { t } = useLocale();
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm">{t.productDetails.quantity}</span>
      <div className="flex items-center border border-[var(--border)]">
        <button
          aria-label={t.cart.decrease}
          className="inline-flex size-9 items-center justify-center hover:bg-[var(--muted)]"
          onClick={() => onChange(Math.max(1, quantity - 1))}
          type="button"
        >
          <Minus className="size-3" />
        </button>
        <span className="w-8 text-center text-sm">{quantity}</span>
        <button
          aria-label={t.cart.increase}
          className="inline-flex size-9 items-center justify-center hover:bg-[var(--muted)]"
          onClick={() =>
            onChange(Math.min(max ?? Number.MAX_SAFE_INTEGER, quantity + 1))
          }
          type="button"
        >
          <Plus className="size-3" />
        </button>
      </div>
    </div>
  );
}
