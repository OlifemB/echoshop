import { Product } from "@/common/types"
import { create } from "zustand/index"
import { message } from "antd"

interface CartState {
  items: Map<string, { product: Product; quantity: number }>
  cartItemsArray: Array<{ product: Product; quantity: number }>
  addItem: (product: Product | undefined) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  getTotalPrice: () => number
  clearCart: () => void
  hydrate: (items: Array<{ product: Product; quantity: number }>) => void
}

export const useCartStore = create<CartState>((set, get) => ({
  items: new Map(),

  cartItemsArray: [],

  addItem: (product) =>
    set((state) => {
      const newItems = new Map(state.items)
      if (newItems.has(product!.id)) {
        const item = newItems.get(product!.id)!
        newItems.set(
          product!.id,
          {
            ...item,
            quantity:
              item.quantity + 1
          }
        )
      } else {
        newItems.set(
          product!.id,
          {
            product: product!,
            quantity: 1
          }
        )
      }
      message.success(`${product!.name} добавлен в корзину!`).then(() => null)
      const updatedCartArray = Array.from(newItems.values())
      return {
        items: newItems,
        cartItemsArray: updatedCartArray
      }
    }),

  removeItem: (productId) =>
    set((state) => {
      const newItems = new Map(state.items)
      const productName = newItems.get(productId)?.product.name
      newItems.delete(productId)
      message.info(`${productName} удален из корзины.`).then(() => null)
      const updatedCartArray = Array.from(newItems.values())
      return {
        items: newItems,
        cartItemsArray: updatedCartArray
      }
    }),

  updateQuantity: (productId, quantity) =>
    set((state) => {
      const newItems = new Map(state.items)
      if (newItems.has(productId)) {
        const item = newItems.get(productId)!
        if (quantity <= 0) {
          newItems.delete(productId)
          message.info(`${item.product.name} удален из корзины.`).then(() => null)
        } else {
          newItems.set(productId, { ...item, quantity })
        }
      }
      const updatedCartArray = Array.from(newItems.values())
      return {
        items: newItems,
        cartItemsArray: updatedCartArray
      }
    }),

  getTotalPrice: () => {
    let total = 0
    get().items.forEach((item) => {
      total += item.product.price * item.quantity
    })
    return total
  },

  clearCart: () => {
    return set({
      items: new Map(),
      cartItemsArray: []
    })
  },

  hydrate: (items) => {
    return set({
      items: new Map(items.map(item =>
        [item.product.id, item])), cartItemsArray: items
    })
  },
}))