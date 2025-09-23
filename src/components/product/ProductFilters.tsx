'use client'

import { isEmpty } from "lodash";
import React, { useCallback, useEffect, useMemo } from 'react';
import { Button, Input, Select, Slider } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useProductData } from "@/common/hooks/useProductData";
import { useFilterProductsStore } from "@/common/store/filterProductsStore";


export const ProductFilters = () => {
  const { products } = useProductData();
  const {
          searchTerm,
          priceRange,
          selectedCategories,
          selectedBrands,
          setSearchTerm,
          setPriceRange,
          setSelectedCategories,
          setSelectedBrands,
          setInitial
        } = useFilterProductsStore();

  const maxPrice = useMemo(() => {
    return products.reduce((max, p) => Math.max(max, p.price), 0);
  }, [products]);

  const minPrice = useMemo(() => {
    return products.reduce((min, p) => Math.min(min, p.price), Infinity);
  }, [products]);

  useEffect(() => {
    if (products.length > 0) {
      setPriceRange([minPrice, maxPrice]);
    }
  }, [products, minPrice, maxPrice, setPriceRange]);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(products.map((p) => p.category));
    return Array.from(uniqueCategories).map((cat) => ({ value: cat, label: cat }));
  }, [products]);

  const brands = useMemo(() => {
    const uniqueBrands = new Set(products.map((p) => p.brand));
    return Array.from(uniqueBrands).map((brand) => ({ value: brand, label: brand }));
  }, [products]);

  const handlePriceRangeChange = useCallback((value: number[]) => {
    const newMin = Math.max(0, value[0]);
    const newMax = Math.min(maxPrice > 0 ? maxPrice : 2000, value[1]);
    setPriceRange([newMin, newMax]);
  }, [maxPrice, setPriceRange]);

  return (
    <div className="lg:w-1/4 bg-white p-6 rounded-lg shadow-md h-min lg:sticky lg:top-24 relative">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Фильтры</h2>

      <div className="mb-4">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">Поиск по названию</label>
        <Input
          id="search"
          placeholder="Введите название товара"
          prefix={<SearchOutlined/>}
          value={searchTerm}
          onChange={setSearchTerm}
          className="rounded-md"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Категория</label>
        <Select
          loading={!isEmpty(selectedCategories)}
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
          loading={!isEmpty(selectedBrands)}
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
        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">Цена</label>
        <Slider
          range
          min={0}
          max={maxPrice > 0 ? maxPrice : 2000}
          value={priceRange}
          onChange={handlePriceRangeChange}
          tooltip={{ formatter: (value) => `${value} $` }}
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>{priceRange[0]} $</span>
          <span>{priceRange[1]} $</span>
        </div>
      </div>

      <Button
        onClick={() => setInitial(maxPrice)}
        className="w-full mt-4 rounded-md"
      >
        Сбросить фильтры
      </Button>
    </div>
  );
};