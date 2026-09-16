import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { CartItem, CartState, Currency, Product } from "@/types";

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  currency: Currency | null;
  addItem: (
    product: Product,
    quantity: number,
    selectedVariants?: Record<string, string | undefined>,
  ) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  incrementItem: (lineId: string) => void;
  decrementItem: (lineId: string) => void;
  removeItem: (lineId: string) => void;
  clearCart: () => void;
}

const storageKey = "minimalist-commerce-cart";
import { CartContext } from "./cart-context";

function lineIdentity(
  productId: string,
  selectedVariants?: Record<string, string | undefined>,
) {
  const variants = Object.entries(selectedVariants ?? {})
    .filter(([, value]) => value)
    .sort(([first], [second]) => first.localeCompare(second));
  return [productId, ...variants.map(([key, value]) => `${key}:${value}`)].join(
    "|",
  );
}

function readCart(): CartState {
  try {
    const parsed = JSON.parse(
      localStorage.getItem(storageKey) ?? "",
    ) as Partial<CartState>;
    if (parsed.version !== 1 || !Array.isArray(parsed.items))
      return { version: 1, items: [] };
    return {
      version: 1,
      items: parsed.items.filter((item): item is CartItem =>
        Boolean(
          item &&
          typeof item.lineId === "string" &&
          typeof item.productId === "string" &&
          typeof item.quantity === "number",
        ),
      ),
    };
  } catch {
    return { version: 1, items: [] };
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CartState>(readCart);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state]);

  const value = useMemo<CartContextValue>(() => {
    const addItem = (
      product: Product,
      quantity: number,
      selectedVariants?: Record<string, string | undefined>,
    ) => {
      const lineId = lineIdentity(product.id, selectedVariants);
      setState((current) => {
        const cartCurrency = current.items[0]?.currency;
        if (cartCurrency && cartCurrency !== product.currency) return current;
        const existing = current.items.find((item) => item.lineId === lineId);
        const nextQuantity = Math.min(
          (existing?.quantity ?? 0) + quantity,
          product.stock ?? Number.MAX_SAFE_INTEGER,
        );
        const item: CartItem = {
          lineId,
          productId: product.id,
          title: product.title,
          image: product.images[0],
          unitPrice: product.price,
          currency: product.currency,
          quantity: nextQuantity,
          stock: product.stock,
          selectedVariants,
        };
        return {
          version: 1,
          items: existing
            ? current.items.map((entry) =>
                entry.lineId === lineId ? item : entry,
              )
            : [...current.items, item],
        };
      });
    };
    const updateQuantity = (lineId: string, quantity: number) =>
      setState((current) => ({
        version: 1,
        items: current.items.map((item) =>
          item.lineId === lineId
            ? {
                ...item,
                quantity: Math.max(
                  1,
                  Math.min(quantity, item.stock ?? Number.MAX_SAFE_INTEGER),
                ),
              }
            : item,
        ),
      }));
    const incrementItem = (lineId: string) => {
      const item = state.items.find((entry) => entry.lineId === lineId);
      if (item) updateQuantity(lineId, item.quantity + 1);
    };
    const decrementItem = (lineId: string) => {
      const item = state.items.find((entry) => entry.lineId === lineId);
      if (item && item.quantity > 1) updateQuantity(lineId, item.quantity - 1);
    };
    const removeItem = (lineId: string) =>
      setState((current) => ({
        version: 1,
        items: current.items.filter((item) => item.lineId !== lineId),
      }));
    const clearCart = () => setState({ version: 1, items: [] });
    return {
      items: state.items,
      currency: state.items[0]?.currency ?? null,
      totalItems: state.items.reduce((total, item) => total + item.quantity, 0),
      subtotal: state.items.reduce(
        (total, item) => total + item.unitPrice * item.quantity,
        0,
      ),
      addItem,
      updateQuantity,
      incrementItem,
      decrementItem,
      removeItem,
      clearCart,
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
