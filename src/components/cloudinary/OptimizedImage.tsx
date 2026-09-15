import { useState } from "react";
import { optimizedCloudinaryUrl } from "@/lib/cloudinary/transformations";
import { useLocale } from "@/hooks/useLocale";
import type { CloudinaryTransformOptions } from "@/types";

interface OptimizedImageProps extends Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  "src"
> {
  src?: string;
  transformations?: CloudinaryTransformOptions;
}

export function OptimizedImage({
  src,
  alt,
  transformations,
  className,
  ...props
}: OptimizedImageProps) {
  const { t } = useLocale();
  const [failed, setFailed] = useState(false);
  if (!src || failed)
    return (
      <div
        aria-label={alt || t.catalog.imageUnavailable}
        className={`flex items-center justify-center bg-[var(--muted)] text-xs text-[var(--muted-foreground)] ${className ?? ""}`}
        role="img"
      >
        {t.catalog.imageUnavailable}
      </div>
    );
  return (
    <img
      alt={alt ?? ""}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
      src={optimizedCloudinaryUrl(src, transformations)}
      {...props}
    />
  );
}
