import { useState } from "react";
import { OptimizedImage } from "@/components/cloudinary/OptimizedImage";
import type { Product } from "@/types";

export function ProductGallery({ product }: { product: Product }) {
  const [selected, setSelected] = useState(0);
  const active = product.images[selected] ?? product.images[0];
  return (
    <div className="space-y-4">
      <div className="aspect-square overflow-hidden bg-[var(--muted)] sm:aspect-[4/5]">
        <OptimizedImage
          alt={active?.alt?.en ?? product.title.en}
          className="size-full object-cover"
          src={active?.url}
          transformations={{ width: 1000, height: 1200, crop: "limit" }}
        />
      </div>
      {product.images.length > 1 ? (
        <div className="grid grid-cols-5 gap-3">
          {product.images.map((image, index) => (
            <button
              aria-label={`Image ${index + 1}`}
              className={`aspect-square overflow-hidden border ${index === selected ? "border-[var(--foreground)]" : "border-[var(--border)]"}`}
              key={image.url}
              onClick={() => setSelected(index)}
              type="button"
            >
              <OptimizedImage
                alt=""
                className="size-full object-cover"
                src={image.url}
                transformations={{ width: 180, height: 180, crop: "fill" }}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
