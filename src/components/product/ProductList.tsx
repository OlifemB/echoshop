import {useMemo, useState} from "react";
import {mockProducts} from "@/mock/products";
import {Button, Input, Select, Slider} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {ProductCard} from "@/components/product/ProductCard";

export const ProductList: React.FC<{ setCurrentPage: (page: string, id?: string) => void }> = ({ setCurrentPage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>(undefined);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(mockProducts.map((p) => p.category));
    return [{ value: undefined, label: 'Все категории' }, ...Array.from(uniqueCategories).map((cat) => ({ value: cat, label: cat }))];
  }, []);

  const brands = useMemo(() => {
    const uniqueBrands = new Set(mockProducts.map((p) => p.brand));
    return [{ value: undefined, label: 'Все бренды' }, ...Array.from(uniqueBrands).map((brand) => ({ value: brand, label: brand }))];
  }, []);

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesBrand = selectedBrand ? product.brand === selectedBrand : true;
      return matchesSearch && matchesCategory && matchesPrice && matchesBrand;
    });
  }, [searchTerm, selectedCategory, priceRange, selectedBrand]);

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Наши товары</h1>

      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        {/* Filters and Search */}
        <div className="lg:w-1/4 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Фильтры</h2>

          <div className="mb-4">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">Поиск по названию</label>
            <Input
              id="search"
              placeholder="Введите название товара"
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Категория</label>
            <Select
              id="category"
              placeholder="Выберите категорию"
              value={selectedCategory}
              onChange={setSelectedCategory}
              options={categories}
              className="w-full rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-2">Бренд</label>
            <Select
              id="brand"
              placeholder="Выберите бренд"
              value={selectedBrand}
              onChange={setSelectedBrand}
              options={brands}
              className="w-full rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">Цена (₽)</label>
            <Slider
              range
              min={0}
              max={2000}
              defaultValue={[0, 2000]}
              value={priceRange}
              onChange={(value) => setPriceRange(value as [number, number])}
              tooltip={{ formatter: (value) => `${value} ₽` }}
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>{priceRange[0]} ₽</span>
              <span>{priceRange[1]} ₽</span>
            </div>
          </div>

          <Button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory(undefined);
              setPriceRange([0, 2000]);
              setSelectedBrand(undefined);
            }}
            className="w-full mt-4 rounded-md"
          >
            Сбросить фильтры
          </Button>
        </div>

        {/* Product Grid */}
        <div className="lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} setCurrentPage={setCurrentPage} />
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