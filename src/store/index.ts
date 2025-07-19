import {Order, Product} from "@/types";
import {create} from "zustand";
import {message} from "antd";

interface CartState {
  items: Map<string, { product: Product; quantity: number }>;
  cartItemsArray: Array<{ product: Product; quantity: number }>; // Добавлено для оптимизации рендеринга
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  getTotalPrice: () => number;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: new Map(),
  cartItemsArray: [], // Инициализация
  addItem: (product) =>
    set((state) => {
      const newItems = new Map(state.items);
      if (newItems.has(product.id)) {
        const item = newItems.get(product.id)!;
        newItems.set(product.id, { ...item, quantity: item.quantity + 1 });
      } else {
        newItems.set(product.id, { product, quantity: 1 });
      }
      message.success(`${product.name} добавлен в корзину!`);
      return { items: newItems, cartItemsArray: Array.from(newItems.values()) }; // Обновление массива
    }),
  removeItem: (productId) =>
    set((state) => {
      const newItems = new Map(state.items);
      const productName = newItems.get(productId)?.product.name;
      newItems.delete(productId);
      message.info(`${productName} удален из корзины.`);
      return { items: newItems, cartItemsArray: Array.from(newItems.values()) }; // Обновление массива
    }),
  updateQuantity: (productId, quantity) =>
    set((state) => {
      const newItems = new Map(state.items);
      if (newItems.has(productId)) {
        const item = newItems.get(productId)!;
        if (quantity <= 0) {
          newItems.delete(productId);
          message.info(`${item.product.name} удален из корзины.`);
        } else {
          newItems.set(productId, { ...item, quantity });
        }
      }
      return { items: newItems, cartItemsArray: Array.from(newItems.values()) }; // Обновление массива
    }),
  getTotalPrice: () => {
    let total = 0;
    get().items.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    return total;
  },
  clearCart: () => set({ items: new Map(), cartItemsArray: [] }), // Обновление массива
}));

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
        message.success(`${product.name} добавлен в избранное!`);
      } else {
        message.info(`${product.name} уже в избранном.`);
      }
      return { items: newItems, favoriteItemsArray: Array.from(newItems.values()) }; // Обновление массива
    }),
  removeFavorite: (productId) =>
    set((state) => {
      const newItems = new Map(state.items);
      const productName = newItems.get(productId)?.name;
      newItems.delete(productId);
      message.info(`${productName} удален из избранного.`);
      return { items: newItems, favoriteItemsArray: Array.from(newItems.values()) }; // Обновление массива
    }),
  isFavorite: (productId) => get().items.has(productId),
}));

interface UserState {
  user: { email: string | null; orders: Order[] };
  login: (email: string) => void;
  logout: () => void;
  addOrder: (order: Order) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: { email: null, orders: [] },
  login: (email) => {
    set({ user: { email, orders: [] } }); // Mock login, clear previous orders
    message.success(`Вы вошли как ${email}`);
  },
  logout: () => {
    set({ user: { email: null, orders: [] } });
    message.info('Вы вышли из системы.');
  },
  addOrder: (order) =>
    set((state) => ({
      user: { ...state.user, orders: [...state.user.orders, order] },
    })),
}));
