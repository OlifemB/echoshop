import { ProductCard } from "@/components/product/ProductCard";
import React from "react"

const ProductDetailPage: React.FC = () => {

  return (
    <div className="p-4 md:p-8 min-h-screen flex items-center justify-center container mx-auto">
      <ProductCard />
    </div>
  );
};

export default ProductDetailPage