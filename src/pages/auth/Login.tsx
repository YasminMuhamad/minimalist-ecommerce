import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useLocale } from "@/hooks/useLocale";
import { Button } from "@/components/ui/button";

export function Login() {
  const { login, loginWithGoogle } = useAuth();
  const { t } = useLocale();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const destination =
    (location.state as { from?: { pathname?: string } } | null)?.from
      ?.pathname ?? "/account";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    if (!email || !email.includes("@"))
      return setError(t.validation.emailInvalid);
    if (!password) return setError(t.validation.passwordRequired);
    setBusy(true);
    const result = await login(email, password);
    setBusy(false);
    if (!result.ok) return setError(t.authError[result.code]);
    navigate(destination, { replace: true });
  }

  async function googleLogin() {
    setError(null);
    setBusy(true);
    const result = await loginWithGoogle();
    setBusy(false);
    if (!result.ok) return setError(t.authError[result.code]);
    navigate(destination, { replace: true });
  }

  return (
    <AuthFrame title={t.auth.loginTitle} subtitle={t.auth.loginSubtitle}>
      <form className="space-y-4" onSubmit={submit}>
        <Field
          id="login-email"
          label={t.auth.email}
          onChange={setEmail}
          placeholder={t.auth.emailPlaceholder}
          type="email"
          value={email}
        />
        <Field
          id="login-password"
          label={t.auth.password}
          onChange={setPassword}
          type="password"
          value={password}
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
          {busy ? t.auth.signingIn : t.auth.login}
        </Button>
      </form>
      <div className="my-5 flex items-center gap-3 text-xs text-[var(--muted-foreground)]">
        <span className="h-px flex-1 bg-[var(--border)]" />
        {t.auth.orContinueWithEmail}
        <span className="h-px flex-1 bg-[var(--border)]" />
      </div>
      <Button
        className="w-full"
        disabled={busy}
        onClick={googleLogin}
        type="button"
        variant="outline"
      >
        {t.auth.continueWithGoogle}
      </Button>
      <p className="mt-6 text-center text-sm text-[var(--muted-foreground)]">
        {t.auth.noAccount}{" "}
        <Link
          className="font-medium text-[var(--foreground)] underline"
          to="/register"
        >
          {t.auth.register}
        </Link>
      </p>
    </AuthFrame>
  );
}

function AuthFrame({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto flex w-full max-w-md items-center justify-center px-5 py-16 sm:px-8">
      <section className="w-full border border-[var(--border)] bg-[var(--background)] p-6 sm:p-8">
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-2 mb-8 text-sm text-[var(--muted-foreground)]">
          {subtitle}
        </p>
        {children}
      </section>
    </main>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block space-y-2 text-sm" htmlFor={id}>
      <span>{label}</span>
      <input
        className="h-11 w-full rounded-md border border-[var(--border)] bg-transparent px-3 outline-none focus:ring-2 focus:ring-[var(--ring)]"
        id={id}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required
        type={type}
        value={value}
      />
    </label>
  );
}
