import { Sheet } from "@/components/ui/sheet";
import { useCart } from "@/hooks/useCart";
import { useLocale } from "@/hooks/useLocale";
import { CartEmptyState } from "./CartEmptyState";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";

export function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { items } = useCart();
  const { t } = useLocale();
  return (
    <Sheet
      closeLabel={t.nav.closeMenu}
      onClose={onClose}
      open={open}
      title={t.cart.title}
    >
      <div className="flex min-h-full flex-col">
        {items.length === 0 ? (
          <CartEmptyState onNavigate={onClose} />
        ) : (
          <>
            <div className="flex-1 space-y-5">
              {items.map((item) => (
                <CartItem item={item} key={item.lineId} />
              ))}
            </div>
            <CartSummary onNavigate={onClose} />
          </>
        )}
      </div>
    </Sheet>
  );
}
