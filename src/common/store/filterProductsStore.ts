import { create } from "zustand/index"

interface FilterProductsStore {
  searchTerm: string;
  setSearchTerm: (searchTerm: React.ChangeEvent<HTMLInputElement>) => void;
  priceRange: number[];
  setPriceRange: (price: number[]) => void;
  selectedCategories: string[] | null | undefined;
  setSelectedCategories: (selectedCategory: string[]) => void;
  selectedBrands: string[] | null | undefined;
  setSelectedBrands: (selectedBrand: string[]) => void;
  setInitial: (minPrice:number,maxPrice: number) => void;
}

export const useFilterProductsStore = create<FilterProductsStore>(
  (set) => ({
    searchTerm: '',
    priceRange: [0, 1],
    selectedCategories: null,
    selectedBrands: null,

    setSearchTerm: (newSearchTerm) =>
      set({
        searchTerm: newSearchTerm.target.value
      }),

    setPriceRange: (newPriceRange) =>
      set({
        priceRange: newPriceRange
      }),

    setSelectedCategories: (newSelectedCategory) =>
      set({
        selectedCategories: newSelectedCategory
      }),

    setSelectedBrands: (newSelectedBrand) =>
      set({
        selectedBrands: newSelectedBrand
      }),

    setInitial: (minPrice,maxPrice) =>
      set({
        searchTerm: '',
        priceRange: [minPrice, maxPrice],
        selectedCategories: null,
        selectedBrands: null,
      })
  })
);