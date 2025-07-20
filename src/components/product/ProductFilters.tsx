import React, {useMemo,} from 'react';
import {Button, Input, Select, Slider} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {mockProducts} from "@/mock/products";
import {useFilterProductsStore} from "@/store";

export const ProductFilters = () => {
  const {
    searchTerm,
    selectedCategory,
    priceRange,
    selectedBrand,
    setSearchTerm,
    setSelectedCategory,
    setPriceRange,
    setSelectedBrand,
    setInitial
  } = useFilterProductsStore()

  const categories = useMemo(() => {
    const uniqueCategories = new Set(mockProducts.map((p) => p.category));
    return [{
      value: undefined,
      label: 'Все категории'
    }, ...Array.from(uniqueCategories)
      .map((cat) => ({
          value: cat,
          label: cat
        })
      )
    ];
  }, []);

  const brands = useMemo(() => {
    const uniqueBrands = new Set(mockProducts
      .map((p) => p.brand));
    return [{
      value: undefined,
      label: 'Все бренды'
    }, ...Array.from(uniqueBrands).map((brand) => ({
        value: brand,
        label: brand
      })
    )
    ];
  }, []);

  // const sliderPrices = mockProducts.reduce((_, current) => ({
  //     [current+'']:current
  //   }),{})

  return (
    <div className="lg:w-1/4 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Фильтры</h2>

      <div className="mb-4">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">Поиск по названию</label>
        <Input
          id="search"
          placeholder="Введите название товара"
          prefix={<SearchOutlined/>}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-md"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">Категория</label>
        <Select
          id="category"
          allowClear={true}
          mode="multiple"
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
          allowClear={true}
          mode="multiple"
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
          // marks={sliderPrices}
          // step={null}
          min={0}
          max={2000}
          defaultValue={[0, 2000]}
          value={priceRange}
          onChange={(value) => setPriceRange(value as [number, number])}
          tooltip={{formatter: (value) => `${value} ₽`}}
        />
        <div className="flex justify-between text-sm text-gray-600">
          <span>{priceRange[0]} ₽</span>
          <span>{priceRange[1]} ₽</span>
        </div>
      </div>

      <Button
        onClick={() => setInitial()}
        className="w-full mt-4 rounded-md"
      >
        Сбросить фильтры
      </Button>
    </div>
  );
};