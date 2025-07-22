import { create } from "zustand/index"

interface FilterProductsStore {
  searchTerm: string
  setSearchTerm: (searchTerm: string) => void
  priceRange: [number, number] | [0, 2000]
  setPriceRange: (price: [number, number]) => void
  selectedCategory?: [string] | []
  setSelectedCategory: (selectedCategory: [string]) => void
  selectedBrand?: [string] | []
  setSelectedBrand: (selectedBrand: [string]) => void
  setInitial: () => void

}

export const useFilterProductsStore = create<FilterProductsStore>(
  (set) => ({
    searchTerm: '',
    priceRange: [0, 2000],
    selectedCategory: [],
    selectedBrand: [],

    setSearchTerm: (newSearchTerm) =>
      set({
        searchTerm: newSearchTerm
      }),

    setPriceRange: (newPriceRange) =>
      set({
        priceRange: newPriceRange
      }),

    setSelectedCategory: (newSelectedCategory) =>
      set({
        selectedCategory: newSelectedCategory
      }),

    setSelectedBrand: (newSelectedBrand) =>
      set({
        selectedBrand: newSelectedBrand
      }),

    setInitial: () =>
      set({
        searchTerm: '',
        priceRange: [0, 2000],
        selectedCategory: [],
        selectedBrand: [],
      })
  })
)