import { Order } from "@/types"
import { create } from "zustand/index"
import { message } from "antd"

interface UserState {
  user: { email: string | null; orders: Order[] }
  login: (email: string) => void
  logout: () => void
  addOrder: (order: Order) => void
}

export const useUserStore = create<UserState>((set) => ({
  user: { email: null, orders: [] },

  login: (email) => {
    set({
      user: {
        email: email,
        orders: []
      }
    }) // Mock login, clear previous orders
    message.success(`Вы вошли как ${email}`).then(() => null)
  },

  logout: () => {
    set({
      user: {
        email: null,
        orders: []
      }
    })
    message.info('Вы вышли из системы.').then(() => null)
  },

  addOrder: (order) =>
    set((state) => ({
      user: {
        ...state.user,
        orders: [
          ...state.user.orders,
          order
        ]
      },
    })),
}))