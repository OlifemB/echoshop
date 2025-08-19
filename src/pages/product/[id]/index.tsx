import { ProductCard } from "@/components/product/ProductCard";
import { useRouter } from "next/router";
import React from "react"

const ProductDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log('product id' + id)

  return (
    <div className="p-4 md:p-8 min-h-screen flex items-center justify-center container mx-auto">
      <ProductCard />
    </div>
  );
};

export default ProductDetailPage