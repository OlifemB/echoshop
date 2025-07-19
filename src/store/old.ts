import { create } from 'zustand'
import { Product } from '@/types'

interface CartStore {
  items: Product[]
  add: (p: Product) => void
  remove: (id: number) => void
}

interface FavoritesStore {
  items: Product[]
  toggle: (p: Product) => void
}

export const useCartStore = create<CartStore>(set => ({
  items: [],
  add: p => set(state => ({ items: [...state.items, p] })),
  remove: id => set(state => ({ items: state.items.filter(i => i.id !== id) }))
}))

export const useFavoritesStore = create<FavoritesStore>(set => ({
  items: [],
  toggle: p => set(state => {
    const exists = state.items.find(i => i.id === p.id)
    return exists
      ? { items: state.items.filter(i => i.id !== p.id) }
      : { items: [...state.items, p] }
  })
}))