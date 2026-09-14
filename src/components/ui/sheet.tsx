import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const CLOSE_DURATION_MS = 200;

export interface SheetProps {
  open: boolean;
  onClose: () => void;
  /** Accessible name for the dialog, also rendered as the visible heading. */
  title: string;
  closeLabel: string;
  children: ReactNode;
  className?: string;
}

/**
 * Drawer anchored to the inline-start edge, so it opens from the left in LTR
 * and from the right in RTL without any direction-specific branching.
 *
 * Hand-rolled rather than pulled from a dialog library: the project's UI
 * primitives carry no Radix dependency, and Phase 2's file boundary does not
 * cover adding packages. Accessibility is therefore implemented explicitly —
 * focus trap, focus restore, Escape, scroll lock and `aria-modal`.
 *
 * The panel unmounts when closed, so its links are never reachable by keyboard
 * or screen reader while hidden.
 */
export function Sheet({
  open,
  onClose,
  title,
  closeLabel,
  children,
  className,
}: SheetProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(open);
  const [shown, setShown] = useState(false);

  // Defer unmount until the close transition finishes.
  useEffect(() => {
    if (open) {
      const frame = requestAnimationFrame(() => {
        setMounted(true);
        setShown(true);
      });
      return () => cancelAnimationFrame(frame);
    }

    const frame = requestAnimationFrame(() => setShown(false));
    const timer = setTimeout(() => setMounted(false), CLOSE_DURATION_MS);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [open]);

  // Prevent the page behind the drawer from scrolling.
  useEffect(() => {
    if (!mounted) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mounted]);

  // Focus management and keyboard handling.
  useEffect(() => {
    if (!open || !mounted) return;
    const panel = panelRef.current;
    if (!panel) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusable = () =>
      Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (element) => element.offsetParent !== null,
      );

    focusable()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusable();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [open, mounted, onClose]);

  const handleOverlayClick = useCallback(() => onClose(), [onClose]);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50">
      <div
        className={cn(
          "absolute inset-0 bg-[var(--foreground)]/20 transition-opacity duration-200",
          shown ? "opacity-100" : "opacity-0",
        )}
        onClick={handleOverlayClick}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "absolute inset-y-0 start-0 flex w-[min(20rem,85vw)] flex-col",
          "border-e border-[var(--border)] bg-[var(--background)] shadow-xl",
          "transition-transform duration-200 ease-out",
          shown ? "translate-x-0" : "-translate-x-full rtl:translate-x-full",
          className,
        )}
      >
        <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
          <span className="text-sm font-semibold tracking-tight">{title}</span>
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="inline-flex size-9 items-center justify-center rounded-md transition-colors hover:bg-[var(--muted)]"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}
