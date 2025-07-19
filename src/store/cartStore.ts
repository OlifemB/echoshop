import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product, CartItem } from '@/types';
import { notification } from 'antd';

// Определяем состояние корзины
interface CartState {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  incrementQuantity: (productId: number) => void;
  decrementQuantity: (productId: number) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      // Добавление товара в корзину
      addToCart: (product: Product) => {
        const cart = get();
        const existingItem = cart.items.find((item) => item.id === product.id);

        if (existingItem) {
          // Если товар уже есть, увеличиваем его количество
          cart.incrementQuantity(product.id);
        } else {
          // Иначе добавляем новый товар
          set((state) => ({
            items: [...state.items, { ...product, quantity: 1 }],
          }));
          notification.success({
            message: 'Товар добавлен в корзину',
            description: `${product.name} теперь в вашей корзине.`,
            placement: 'topRight',
            duration: 2,
          });
        }
      },

      // Удаление товара из корзины
      removeFromCart: (productId: number) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
        notification.info({
          message: 'Товар удален из корзины',
          placement: 'topRight',
          duration: 2,
        });
      },

      // Полная очистка корзины
      clearCart: () => set({ items: [] }),

      // Увеличение количества товара
      incrementQuantity: (productId: number) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }));
      },

      // Уменьшение количества товара
      decrementQuantity: (productId: number) => {
        const itemToDecrement = get().items.find(item => item.id === productId);

        if (itemToDecrement && itemToDecrement.quantity > 1) {
          set((state) => ({
            items: state.items.map((item) =>
              item.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          }));
        } else {
          // Если количество равно 1, удаляем товар
          get().removeFromCart(productId);
        }
      },
    }),
    {
      name: 'cart-storage', // Имя для localStorage
      storage: createJSONStorage(() => localStorage), // Указываем использовать localStorage
    }
  )
);

// Селекторы для получения производных данных
export const useCartTotals = () => {
  const items = useCartStore((state) => state.items);

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return { totalItems, totalPrice };
}
