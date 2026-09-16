import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CatalogSkeleton } from "@/components/catalog/CatalogSkeleton";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { useProduct } from "@/hooks/useProduct";
import { useLocale } from "@/hooks/useLocale";

export function ProductDetails() {
  const { productId } = useParams();
  const { product, loading, error, refresh } = useProduct(productId);
  const { t } = useLocale();
  if (loading)
    return (
      <main className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <CatalogSkeleton count={2} />
      </main>
    );
  if (error || !product)
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-5 text-center">
        <p className="text-lg font-medium">
          {error ? t.productDetails.loadError : t.productDetails.notFound}
        </p>
        {error ? (
          <Button
            className="mt-5"
            onClick={() => void refresh()}
            variant="outline"
          >
            {t.catalog.retry}
          </Button>
        ) : (
          <Link className="mt-5 underline" to="/shop">
            {t.productDetails.backToShop}
          </Link>
        )}
      </main>
    );
  return (
    <main className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:py-16">
      <ProductGallery product={product} />
      <ProductInfo product={product} />
    </main>
  );
}
