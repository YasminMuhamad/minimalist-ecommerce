import { Link } from "react-router-dom";
import { useLocale } from "@/hooks/useLocale";

export function OrderSuccess({ orderId }: { orderId: string }) {
  const { t } = useLocale();
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-5 text-center">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted-foreground)]">
        {t.checkout.successTitle}
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">
        {t.checkout.successText}
      </h1>
      <p className="mt-6 text-sm text-[var(--muted-foreground)]">
        {t.checkout.orderReference}: {orderId}
      </p>
      <Link
        className="mt-8 inline-flex h-10 items-center justify-center rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary-foreground)] hover:opacity-90"
        to="/shop"
      >
        {t.checkout.continue}
      </Link>
    </main>
  );
}
