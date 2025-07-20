'use client'

import {Product} from "@/types";
import {create} from "zustand/index";
import {notification} from "antd";
import {createJSONStorage, persist} from "zustand/middleware";

interface CartState {
  items: Map<string, { product: Product; quantity: number }>;
  cartItemsArray: Array<{ product: Product; quantity: number }>; // Добавлено для оптимизации рендеринга
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  getTotalPrice: () => number;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  // persist(
    (set, get) => ({
      items: new Map(),

      cartItemsArray: [], // Инициализация

      addItem: (product) =>
        set(state => {
          const newItems = new Map(state.items);
          if (newItems.has(product.id)) {
            const item = newItems.get(product.id)!;
            newItems.set(product.id, {...item, quantity: item.quantity + 1});
          } else {
            newItems.set(product.id, {product, quantity: 1});
          }
          notification.success({
            message: 'Товар добавлен в корзину',
            description: `${product.name} теперь в вашей корзине.`,
            placement: 'topRight',
            duration: 2,
          });
          return {
            items: newItems,
            cartItemsArray: Array.from(newItems.values())
          }; // Обновление массива
        }),

      removeItem: (productId) =>
        set((state) => {
          const newItems = new Map(state.items);
          const productName = newItems.get(productId)?.product.name;
          newItems.delete(productId);
          notification.success({
            message: 'Товар удален из корзины',
            description: `${productName} удален из корзины.`,
            placement: 'topRight',
            duration: 2,
          });
          return {
            items: newItems,
            cartItemsArray: Array.from(newItems.values())
          }; // Обновление массива
        }),

      updateQuantity: (productId, quantity) =>
        set((state) => {
          const newItems = new Map(state.items);
          if (newItems.has(productId)) {
            const item = newItems.get(productId)!;
            if (quantity <= 0) {
              newItems.delete(productId);
              notification.success({
                message: 'Товар удален из корзины',
                description: `${item.product.name} удален из корзины.`,
                placement: 'topRight',
                duration: 2,
              })
            } else {
              newItems.set(productId, {...item, quantity});
            }
          }
          return {
            items: newItems,
            cartItemsArray: Array.from(newItems.values())
          }; // Обновление массива
        }),

      getTotalPrice: () => {
        let total = 0;
        get().items.forEach((item) => {
          total += item.product.price * item.quantity;
        });
        return total;
      },

      clearCart: () => set({items: new Map(), cartItemsArray: []}), // Обновление массива
    }),
  //   {
  //     name: 'cart-storage', // Имя для localStorage
  //     storage: createJSONStorage(() => localStorage), // Указываем использовать localStorage
  //   }
  // )
);

