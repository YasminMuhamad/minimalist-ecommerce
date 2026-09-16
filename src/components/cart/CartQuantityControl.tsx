import { Minus, Plus } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useLocale } from "@/hooks/useLocale";

export function CartQuantityControl({
  lineId,
  quantity,
}: {
  lineId: string;
  quantity: number;
}) {
  const { decrementItem, incrementItem } = useCart();
  const { t } = useLocale();
  return (
    <div className="flex items-center border border-[var(--border)]">
      <button
        aria-label={t.cart.decrease}
        className="inline-flex size-8 items-center justify-center hover:bg-[var(--muted)]"
        onClick={() => decrementItem(lineId)}
        type="button"
      >
        <Minus className="size-3" />
      </button>
      <span className="w-7 text-center text-sm">{quantity}</span>
      <button
        aria-label={t.cart.increase}
        className="inline-flex size-8 items-center justify-center hover:bg-[var(--muted)]"
        onClick={() => incrementItem(lineId)}
        type="button"
      >
        <Plus className="size-3" />
      </button>
    </div>
  );
}
