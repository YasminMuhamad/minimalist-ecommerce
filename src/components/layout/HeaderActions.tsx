import { CartButton } from "@/components/navigation/CartButton";
import { LanguageToggle } from "@/components/navigation/LanguageToggle";
import { SearchButton } from "@/components/navigation/SearchButton";
import { ThemeToggle } from "@/components/navigation/ThemeToggle";
import { UserMenu } from "@/components/navigation/UserMenu";
import { useCart } from "@/hooks/useCart";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { useState } from "react";

/**
 * The header's interactive controls: search, language, theme, cart and account
 * (Step 14). Each control owns its own behaviour; this only arranges them.
 */
export function HeaderActions() {
  const { totalItems } = useCart();
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center gap-0.5">
      <SearchButton />
      <LanguageToggle />
      <ThemeToggle />
      <CartButton count={totalItems} onClick={() => setOpen(true)} />
      <UserMenu />
      <CartDrawer onClose={() => setOpen(false)} open={open} />
    </div>
  );
}
