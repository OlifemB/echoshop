import { Product } from "@/common/types"
import { create } from "zustand/index"
import { message } from "antd"

interface FavoritesState {
  items: Map<string, Product>
  favoriteItemsArray: Product[]
  addFavorite: (product: Product) => void
  removeFavorite: (productId: string) => void
  isFavorite: (productId: string) => boolean
}

interface FavoritesState {
  items: Map<string, Product>
  favoriteItemsArray: Product[]
  addFavorite: (product: Product) => void
  removeFavorite: (productId: string) => void
  isFavorite: (productId: string) => boolean
  hydrate: (products: Product[]) => void
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  items: new Map(),

  favoriteItemsArray: [],

  addFavorite: (product) =>
    set((state) => {
      const newItems = new Map(state.items)
      if (!newItems.has(product.id)) {
        newItems.set(product.id, product)
        message.success(`${product.name} добавлен в избранное!`).then(() => null)
      } else {
        message.info(`${product.name} уже в избранном.`).then(() => null)
      }
      const updatedFavoritesArray = Array.from(newItems.values())
      return {
        items: newItems,
        favoriteItemsArray: updatedFavoritesArray
      }
    }),

  removeFavorite: (productId) =>
    set((state) => {
      const newItems = new Map(state.items)
      const productName = newItems.get(productId)?.name
      newItems.delete(productId)
      message.info(`${productName} удален из избранного.`).then(() => null)
      const updatedFavoritesArray = Array.from(newItems.values())
      return {
        items: newItems,
        favoriteItemsArray: updatedFavoritesArray
      }
    }),

  isFavorite: (productId) => get().items.has(productId),

  hydrate: (products) => {
    return set({
      items: new Map(products.map(p => [p.id, p])),
      favoriteItemsArray: products
    })
  },
}))