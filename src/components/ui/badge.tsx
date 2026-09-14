import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type BadgeProps = HTMLAttributes<HTMLSpanElement>;

/**
 * Small count indicator. Positioned by the caller so it can follow the writing
 * direction with logical utilities rather than hard-coded left/right.
 */
export function Badge({ className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-w-5 items-center justify-center rounded-full px-1.5",
        "bg-[var(--primary)] text-[var(--primary-foreground)]",
        "text-[11px] font-semibold leading-5 tabular-nums",
        className,
      )}
      {...props}
    />
  );
}
