import {Product} from "@/types";
import {create} from "zustand/index";
import {notification} from "antd";

interface FavoritesState {
  items: Map<string, Product>;
  favoriteItemsArray: Product[]; // Добавлено для оптимизации рендеринга
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  items: new Map(),

  favoriteItemsArray: [], // Инициализация

  addFavorite: (product) =>
    set((state) => {
      const newItems = new Map(state.items);
      if (!newItems.has(product.id)) {
        newItems.set(product.id, product);
        notification.success({
          message: 'Товар добавлен в избранное!',
          description: `${product.name} добавлен в избранное!`,
          placement: 'topRight',
          duration: 2,
        });
      } else {
        notification.info({
          message: 'Товар  уже в избранном!',
          description: `${product.name}  уже в избранном!`,
          placement: 'topRight',
          duration: 2,
        });
      }
      return {
        items: newItems,
        favoriteItemsArray: Array.from(newItems.values())
      };
    }),

  removeFavorite: (productId) =>
    set((state) => {
      const newItems = new Map(state.items);
      const productName = newItems.get(productId)?.name;
      newItems.delete(productId);
      notification.info({
        message: 'Товар удален из избранного',
        description: `${productName} удален из избранного!`,
        placement: 'topRight',
        duration: 2,
      });
      return {
        items: newItems,
        favoriteItemsArray: Array.from(newItems.values())
      };
    }),

  isFavorite: (productId) => get().items.has(productId),
}));