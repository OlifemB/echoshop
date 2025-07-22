'use client'

import { Product } from "@/types"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { Slider, Input, Select, Button } from 'antd'
import { ProductCard } from "@/components/product/ProductCard"
import { SearchOutlined } from '@ant-design/icons'
import { useDebounce } from '@/hooks/useDebounce'

const ProductList: React.FC<{ products: Product[]; setCurrentPage: (page: string, id?: string) => void }> = ({
  products,
  setCurrentPage
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])

  const maxPrice = useMemo(() => {
    return products.reduce((max, p) => Math.max(max, p.price), 0)
  }, [products])

  const [tempPriceRange, setTempPriceRange] = useState<[number, number]>([0, 2000])
  const debouncedPriceRange = useDebounce(tempPriceRange, 300)

  useEffect(() => {
    if (products.length > 0) {
      setTempPriceRange([0, maxPrice])
    }
  }, [products, maxPrice])

  const categories = useMemo(() => {
    const uniqueCategories = new Set(products.map((p) => p.category))
    return Array.from(uniqueCategories).map((cat) => ({ value: cat, label: cat }))
  }, [products])

  const brands = useMemo(() => {
    const uniqueBrands = new Set(products.map((p) => p.brand))
    return Array.from(uniqueBrands).map((brand) => ({ value: brand, label: brand }))
  }, [products])

  const handlePriceRangeChange = useCallback((value: number[]) => {
    const newMin = Math.max(0, value[0])
    const newMax = Math.min(maxPrice > 0 ? maxPrice : 2000, value[1])
    setTempPriceRange([newMin, newMax])
  }, [maxPrice])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = searchTerm ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) : true
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
      const matchesPrice = product.price >= debouncedPriceRange[0] && product.price <= debouncedPriceRange[1]
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand)
      return matchesSearch && matchesCategory && matchesPrice && matchesBrand
    })
  }, [searchTerm, selectedCategories, debouncedPriceRange, selectedBrands, products])

  return (
    <div className="p-4 md:p-8 min-h-screen container mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Наши товары</h1>

      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        <div className="lg:w-1/4 bg-white p-6 rounded-lg shadow-md h-min lg:sticky lg:top-24 relative">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Фильтры</h2>

          <div className="mb-4">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">Поиск по названию</label>
            <Input
              id="search"
              placeholder="Введите название товара"
              prefix={<SearchOutlined/>}
              value={searchTerm}
              onChange={(e) => (e.target.value)}
              className="rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Категория</label>
            <Select
              id="category"
              mode="multiple"
              placeholder="Выберите категории"
              value={selectedCategories}
              onChange={setSelectedCategories}
              options={categories}
              className="w-full rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-2">Бренд</label>
            <Select
              id="brand"
              mode="multiple"
              placeholder="Выберите бренды"
              value={selectedBrands}
              onChange={setSelectedBrands}
              options={brands}
              className="w-full rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">Цена (₽)</label>
            <Slider
              range
              min={0}
              max={maxPrice > 0 ? maxPrice : 2000}
              value={tempPriceRange}
              onChange={e => handlePriceRangeChange(e)}
              tooltip={{ formatter: (value) => `${value} ₽` }}
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>{tempPriceRange[0]} ₽</span> {/* Display immediate value */}
              <span>{tempPriceRange[1]} ₽</span> {/* Display immediate value */}
            </div>
          </div>

          <Button
            onClick={() => {
              setSearchTerm('')
              setSelectedCategories([])
              setTempPriceRange([0, maxPrice > 0 ? maxPrice : 2000])
              setSelectedBrands([])
            }}
            className="w-full mt-4 rounded-md"
          >
            Сбросить фильтры
          </Button>
        </div>

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
  )
}

export default ProductList