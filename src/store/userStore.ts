import {Order} from "@/types";
import {create} from "zustand/index";
import {message, notification} from "antd";

interface UserState {
  user: { email: string | null; orders: Order[] };
  login: (email: string) => void;
  logout: () => void;
  addOrder: (order: Order) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: {email: null, orders: []},
  login: (email) => {
    set({
      user: {
        email, orders: []
      }
    });
    message.success(`Вы вошли как ${email}`);
    notification.success({
      message: 'Авторизация',
      description: `Вы вошли как ${email}`,
      placement: 'topRight',
      duration: 2,
    });
  },
  logout: () => {
    set({
      user: {
        email: null,
        orders: []
      }
    });
    notification.success({
      message: 'Авторизация',
      description: `Вы вышли из системы.`,
      placement: 'topRight',
      duration: 2,
    });
  },
  addOrder: (order) =>
    set((state) => ({
      user: {...state.user, orders: [...state.user.orders, order]},
    })),
}));
