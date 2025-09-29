import { ProductFilters } from "@/components/product/ProductFilters";
import { ProductList } from "@/components/product/ProductList";
import React from "react"

const Products: React.FC = () => {
  return (
    <div className="p-4 md:p-8 min-h-screen container mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Наши товары</h1>

      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        <ProductFilters/>
        <ProductList/>
      </div>
    </div>
  )
}

export default Products