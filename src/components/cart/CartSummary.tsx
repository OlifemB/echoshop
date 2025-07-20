import React from 'react';
import {Button, message} from "antd";
import {CheckOutlined} from "@ant-design/icons";
import {Order} from "@/types";
import {useCartStore, useUserStore} from "@/store";

export const CartSummary = () => {
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);
  const addOrder = useUserStore((state) => state.addOrder);
  const userEmail = useUserStore((state) => state.user.email);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      message.warning('Ваша корзина пуста!');
      return;
    }
    if (!userEmail) {
      message.error('Пожалуйста, войдите в систему, чтобы оформить заказ.');
      setCurrentPage('profile');
      return;
    }

    const newOrder: Order = {
      id: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      date: new Date().toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      items: cartItems.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      })),
      total: getTotalPrice(),
    };

    addOrder(newOrder);
    clearCart();
    message.success('Заказ успешно оформлен! Вы можете просмотреть его в своем профиле.');
    setCurrentPage('profile');
  };

  return (
    <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow-md h-fit">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Итого</h2>
      <div className="flex justify-between items-center text-xl font-semibold mb-6 text-gray-800">
        <span>Общая сумма:</span>
        <span>{getTotalPrice().toFixed(2)} ₽</span>
      </div>

      <Button
        type="primary"
        size="large"
        icon={<CheckOutlined/>}
        onClick={handleCheckout}
        className="w-full bg-green-500 hover:bg-green-600 rounded-md py-3 text-lg font-semibold"
      >
        Оформить заказ
      </Button>

      <Button
        onClick={() => setCurrentPage('home')}
        className="w-full mt-4 rounded-md"
        type={'link'}
      >
        Продолжить покупки
      </Button>
    </div>
  );
};