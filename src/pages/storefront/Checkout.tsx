import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { ShippingForm } from "@/components/checkout/ShippingForm";
import { OrderSuccess } from "@/components/checkout/OrderSuccess";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useLocale } from "@/hooks/useLocale";
import { createCheckoutOrder } from "@/services/orderService";
import type { ShippingDetails } from "@/types";

const initialShipping: ShippingDetails = {
  fullName: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  country: "",
  postalCode: "",
  additionalNotes: "",
};

export function Checkout() {
  const { items, clearCart } = useCart();
  const { user } = useAuth();
  const { t } = useLocale();
  const navigate = useNavigate();
  const [values, setValues] = useState<ShippingDetails>({
    ...initialShipping,
    email: user?.email ?? "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ShippingDetails, string>>
  >({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  if (orderId) return <OrderSuccess orderId={orderId} />;
  if (items.length === 0)
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-5 text-center">
        <p className="text-lg">{t.checkout.emptyCart}</p>
        <Link className="mt-5 underline" to="/shop">
          {t.cart.continueShopping}
        </Link>
      </main>
    );
  const update = (field: keyof ShippingDetails, value: string) =>
    setValues((current) => ({ ...current, [field]: value }));
  const validate = () => {
    const nextErrors: Partial<Record<keyof ShippingDetails, string>> = {};
    for (const field of [
      "fullName",
      "phone",
      "email",
      "address",
      "city",
      "country",
      "postalCode",
    ] as const)
      if (!values[field].trim()) nextErrors[field] = t.checkout.required;
    if (values.email && !values.email.includes("@"))
      nextErrors.email = t.checkout.invalidEmail;
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };
  async function submit() {
    if (!validate()) return;
    setBusy(true);
    setError(null);
    try {
      const createdId = await createCheckoutOrder(items, values, user?.uid);
      clearCart();
      setOrderId(createdId);
      navigate("/checkout", { replace: true });
    } catch {
      setError(t.checkout.orderError);
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 lg:py-16">
      <h1 className="text-4xl font-semibold tracking-tight">
        {t.checkout.title}
      </h1>
      <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <section>
          <h2 className="mb-6 text-lg font-semibold">{t.checkout.shipping}</h2>
          <ShippingForm errors={errors} onChange={update} values={values} />
          {error ? (
            <p
              aria-live="polite"
              className="mt-5 text-sm text-red-700 dark:text-red-300"
              role="alert"
            >
              {error}
            </p>
          ) : null}
          <Button
            className="mt-8 w-full sm:w-auto"
            disabled={busy}
            onClick={() => void submit()}
            type="button"
          >
            {busy ? t.checkout.placingOrder : t.checkout.placeOrder}
          </Button>
        </section>
        <aside className="h-fit border border-[var(--border)] p-6">
          <OrderSummary />
        </aside>
      </div>
    </main>
  );
}
