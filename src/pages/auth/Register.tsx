import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useLocale } from "@/hooks/useLocale";

export function Register() {
  const { register } = useAuth();
  const { t } = useLocale();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    if (!values.email || !values.email.includes("@"))
      return setError(t.validation.emailInvalid);
    if (values.password.length < 8)
      return setError(t.validation.passwordTooShort);
    if (!values.confirm) return setError(t.validation.confirmRequired);
    if (values.password !== values.confirm)
      return setError(t.validation.passwordMismatch);
    setBusy(true);
    const result = await register(values.email, values.password);
    setBusy(false);
    if (!result.ok) return setError(t.authError[result.code]);
    navigate("/account", { replace: true });
  }

  return (
    <main className="mx-auto flex w-full max-w-md items-center justify-center px-5 py-16 sm:px-8">
      <section className="w-full border border-[var(--border)] bg-[var(--background)] p-6 sm:p-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          {t.auth.registerTitle}
        </h1>
        <p className="mt-2 mb-8 text-sm text-[var(--muted-foreground)]">
          {t.auth.registerSubtitle}
        </p>
        <form className="space-y-4" onSubmit={submit}>
          <Field
            id="register-email"
            label={t.auth.email}
            onChange={(email) =>
              setValues((current) => ({ ...current, email }))
            }
            type="email"
            value={values.email}
          />
          <Field
            id="register-password"
            label={t.auth.password}
            onChange={(password) =>
              setValues((current) => ({ ...current, password }))
            }
            type="password"
            value={values.password}
          />
          <p className="-mt-2 text-xs text-[var(--muted-foreground)]">
            {t.auth.passwordHint}
          </p>
          <Field
            id="register-confirm"
            label={t.auth.confirmPassword}
            onChange={(confirm) =>
              setValues((current) => ({ ...current, confirm }))
            }
            type="password"
            value={values.confirm}
          />
          {error ? (
            <p
              aria-live="polite"
              className="text-sm text-red-700 dark:text-red-300"
              role="alert"
            >
              {error}
            </p>
          ) : null}
          <Button className="w-full" disabled={busy} type="submit">
            {busy ? t.auth.creatingAccount : t.auth.register}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-[var(--muted-foreground)]">
          {t.auth.haveAccount}{" "}
          <Link
            className="font-medium text-[var(--foreground)] underline"
            to="/login"
          >
            {t.auth.login}
          </Link>
        </p>
      </section>
    </main>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type: string;
}) {
  return (
    <label className="block space-y-2 text-sm" htmlFor={id}>
      <span>{label}</span>
      <input
        className="h-11 w-full rounded-md border border-[var(--border)] bg-transparent px-3 outline-none focus:ring-2 focus:ring-[var(--ring)]"
        id={id}
        onChange={(event) => onChange(event.target.value)}
        required
        type={type}
        value={value}
      />
    </label>
  );
}
