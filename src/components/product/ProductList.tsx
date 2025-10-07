'use client'

import React, { useMemo } from 'react';
import { isNil } from 'lodash'
import { useDebounce } from "@/common/hooks/useDebounce";
import { useProductData } from "@/common/hooks/useProductData";
import { useFilterProductsStore } from "@/common/store/filterProductsStore";
import { ProductListCard } from "@/components/product/ProductListCard";
import { ErrorComponent } from "@/components/shared/Error";
import { Spinner } from "@/components/shared/Spinner";


export const ProductList: React.FC = () => {
  const { searchTerm, priceRange, selectedCategories, selectedBrands } = useFilterProductsStore();
  const { products, loading, error } = useProductData();
  const debouncedPriceRange = useDebounce(priceRange, 300);

  const filteredProducts = useMemo(() => {
    if (loading) return [];

    // !!! FIX HERE TO FETCH
    return products.filter((product) => {
      const matchesSearch = searchTerm
        ? product.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      const matchesCategory = isNil(selectedCategories)
        || (selectedCategories.length === 0 || selectedCategories.includes(product.category));
      const matchesBrand = isNil(selectedBrands)
        || (selectedBrands.length === 0 || selectedBrands.includes(product.brand));
      const matchesPrice = product.price >= debouncedPriceRange[0] && product.price <= debouncedPriceRange[1];

      return matchesSearch && matchesCategory && matchesPrice && matchesBrand;
    });
  }, [loading, products, searchTerm, selectedCategories, debouncedPriceRange, selectedBrands]);

  if (loading) {
    return <Spinner tip={'"Загрузка данных..."'}/>;
  }
  if (error) {
    return <ErrorComponent message={error}/>;
  }

  return (
    <div className="lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductListCard key={product.id} product={product} />
        ))
      ) : (
        <div className="col-span-full text-center text-gray-600 text-lg py-10 bg-white rounded-lg shadow-md">
          Товары не найдены по вашему запросу.
        </div>
      )}
    </div>
  );
};