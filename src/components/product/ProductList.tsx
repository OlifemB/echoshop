import {useMemo} from "react";
import {mockProducts} from "@/mock/products";
import {ProductCard} from "@/components/product/ProductCard";
import {ProductFilters} from "@/components/product/ProductFilters";
import {useFilterProductsStore} from "@/store";

export const ProductList: React.FC<{ setCurrentPage: (page: string, id?: string) => void }> = ({setCurrentPage}) => {
  const {
    searchTerm,
    selectedCategory,
    priceRange,
    selectedBrand
  } = useFilterProductsStore()

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      // Логика фильтрации для мультиселекта: если ничего не выбрано, то все подходят
      const matchesCategory = selectedCategory?.length === 0 || selectedCategory?.includes(product.category);
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      // Логика фильтрации для мультиселекта: если ничего не выбрано, то все подходят
      const matchesBrand = selectedBrand.length === 0 || selectedBrand?.includes(product.brand);
      return matchesSearch && matchesCategory && matchesPrice && matchesBrand;
    });
  }, [searchTerm, selectedCategory, priceRange, selectedBrand]); //

  console.log('selectedBrand', selectedBrand)

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Наши товары</h1>

      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        {/* Filters and Search */}
        <ProductFilters/>

        {/* Product Grid */}
        <div className="lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} setCurrentPage={setCurrentPage}/>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-600 text-lg py-10 bg-white rounded-lg shadow-md">
              Товары не найдены по вашему запросу.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};