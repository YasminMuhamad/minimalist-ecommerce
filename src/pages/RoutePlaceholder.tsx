import { useLocale } from "@/hooks/useLocale";

export function RoutePlaceholder({
  translationKey,
}: {
  translationKey: keyof ReturnType<typeof useLocale>["t"]["routes"];
}) {
  const { t } = useLocale();
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl items-center justify-center px-6 py-16 text-center">
      <div>
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-[var(--muted-foreground)]">
          {t.app.tagline}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight">
          {t.routes[translationKey]}
        </h1>
      </div>
    </main>
  );
}
