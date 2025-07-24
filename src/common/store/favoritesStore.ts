import { Product } from "@/common/types"
import { create } from "zustand/index"
import { message } from "antd"

interface FavoritesState {
  items: Map<string, Product>;
  favoriteItemsArray: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  initializeFromLocalStorage: () => void;
}

const FAVORITES_STORAGE_KEY = 'echoshop_favorites';

const saveFavoritesToLocalStorage = (items: Map<string, Product>) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(Array.from(items.entries())));
  }
};

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  items: new Map(),
  favoriteItemsArray: [],

  initializeFromLocalStorage: () => {
    if (typeof window !== 'undefined') {
      const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (storedFavorites) {
        try {
          // Explicitly cast the parsed JSON to the expected array type for Map constructor
          const loadedItems = new Map(JSON.parse(storedFavorites) as Array<[string, Product]>);
          set({
            items: loadedItems,
            favoriteItemsArray: Array.from(loadedItems.values())
          });
        } catch (e) {
          console.error("Failed to parse favorites from localStorage", e);
          set({ items: new Map(), favoriteItemsArray: [] });
        }
      }
    }
  },

  addFavorite: (product) =>
    set((state) => {
      const newItems = new Map(state.items);
      if (!newItems.has(product.id)) {
        newItems.set(product.id, product);
        message.success(`${product.name} добавлен в избранное!`);
      } else {
        message.info(`${product.name} уже в избранном.`);
      }
      const updatedFavoritesArray = Array.from(newItems.values());
      saveFavoritesToLocalStorage(newItems);
      return {
        items: newItems,
        favoriteItemsArray: updatedFavoritesArray
      };
    }),

  removeFavorite: (productId) =>
    set((state) => {
      const newItems = new Map(state.items);
      const productName = newItems.get(productId)?.name;
      newItems.delete(productId);
      message.info(`${productName} удален из избранного.`).then(() => null);
      const updatedFavoritesArray = Array.from(newItems.values());
      saveFavoritesToLocalStorage(newItems);
      return {
        items: newItems,
        favoriteItemsArray: updatedFavoritesArray
      };
    }),

  isFavorite: (productId) => get().items.has(productId),
}));