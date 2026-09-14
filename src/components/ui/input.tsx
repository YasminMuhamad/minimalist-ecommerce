import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-md border border-[var(--border)] bg-transparent px-3 text-sm",
        "text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]",
        "transition-colors outline-none focus-visible:border-[var(--ring)]",
        "aria-[invalid=true]:border-[var(--foreground)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);

Input.displayName = "Input";
