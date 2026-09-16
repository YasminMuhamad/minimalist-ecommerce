import type { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { useLocale } from "@/hooks/useLocale";
import type { ShippingDetails } from "@/types";

export function ShippingForm({
  values,
  errors,
  onChange,
}: {
  values: ShippingDetails;
  errors: Partial<Record<keyof ShippingDetails, string>>;
  onChange: (field: keyof ShippingDetails, value: string) => void;
}) {
  const { t } = useLocale();
  const fields: { key: keyof ShippingDetails; label: string; type?: string }[] =
    [
      ["fullName", t.checkout.fullName],
      ["phone", t.checkout.phone],
      ["email", t.checkout.email, "email"],
      ["address", t.checkout.address],
      ["city", t.checkout.city],
      ["country", t.checkout.country],
      ["postalCode", t.checkout.postalCode],
    ].map(([key, label, type]) => ({
      key: key as keyof ShippingDetails,
      label: label as string,
      type: type as string | undefined,
    }));
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {fields.map((field) => (
        <label
          className={`space-y-2 text-sm ${field.key === "address" ? "sm:col-span-2" : ""}`}
          htmlFor={`shipping-${field.key}`}
          key={field.key}
        >
          <span>{field.label}</span>
          <Input
            aria-invalid={Boolean(errors[field.key])}
            id={`shipping-${field.key}`}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              onChange(field.key, event.target.value)
            }
            type={field.type ?? "text"}
            value={values[field.key] ?? ""}
          />
          {errors[field.key] ? (
            <span className="text-xs text-red-700 dark:text-red-300">
              {errors[field.key]}
            </span>
          ) : null}
        </label>
      ))}
      <label
        className="space-y-2 text-sm sm:col-span-2"
        htmlFor="shipping-notes"
      >
        <span>{t.checkout.notes}</span>
        <textarea
          className="min-h-24 w-full rounded-md border border-[var(--border)] bg-transparent p-3 text-sm outline-none focus:ring-2 focus:ring-[var(--ring)]"
          id="shipping-notes"
          onChange={(event) => onChange("additionalNotes", event.target.value)}
          value={values.additionalNotes ?? ""}
        />
      </label>
    </div>
  );
}
