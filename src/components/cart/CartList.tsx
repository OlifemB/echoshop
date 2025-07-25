import { useNavigation } from "@/common/hooks/useNavigation";
import { useWindowSize } from "@/common/hooks/useWindowSize";
import { useCartStore, useUserStore } from "@/common/store";
import { Order } from "@/common/types";
import { CheckOutlined, DeleteOutlined, MinusOutlined, PlusOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button, List, message } from "antd";
import { isNil } from "lodash";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from 'react';

export const CartList: React.FC = () => {
  const cartItems = useCartStore((state) => state.cartItemsArray);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const addOrder = useUserStore((state) => state.addOrder);
  const userEmail = useUserStore((state) => state.user.email);
  const router = useRouter();
  const { isMobile } = useWindowSize()

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      message.warning('Ваша корзина пуста!').then(() => null);
      return;
    }
    if (!userEmail) {
      message.error('Пожалуйста, войдите в систему, чтобы оформить заказ.');
      router.push('/profile');
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
  };

  return (isNil(cartItems) || cartItems.length === 0 ? (
      <div className="text-center text-gray-600 text-lg py-10 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
        <ShoppingCartOutlined className="text-6xl text-gray-400 mb-4"/>
        <p>Ваша корзина пуста.</p>
        <Link href="/" passHref>
          <Button type="primary" className="mt-6 bg-blue-500 hover:bg-blue-600 rounded-md">
            Начать покупки
          </Button>
        </Link>
      </div>
    ) : (
      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
        <div className="lg:w-2/3 bg-white p-6 rounded-lg shadow-md flwxz">
          <List
            itemLayout={isMobile ? "vertical" : "horizontal"}
            dataSource={cartItems}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button
                    key={1}
                    icon={<MinusOutlined/>}
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="rounded-md"
                  />,
                  <span key={'span'} className="font-bold text-lg">{item.quantity}</span>,
                  <Button
                    key={2}
                    icon={<PlusOutlined/>}
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="rounded-md"
                  />,
                  <Button
                    key={3}
                    danger
                    icon={<DeleteOutlined/>}
                    onClick={() => removeItem(item.product.id)}
                    className="rounded-md"
                  />,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Image
                      width={80}
                      height={80}
                      priority={false}
                      loading="lazy"
                      src={item.product.image || `https://placehold.co/80x80/CCCCCC/333333?text=Нет+изображения`}
                      alt={item.product.name}
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        e.currentTarget.onerror = null;
                      }}
                      style={{ objectFit: 'contain' }}
                      className="w-20 h-20 object-cover rounded-md shadow-sm"
                    />
                  }
                  title={<span className="font-semibold text-gray-800">{item.product.name}</span>}
                  description={
                    <div className="text-gray-600">
                      Цена: {item.product.price.toFixed(2)} ₽
                      <br/>
                      Итого: {(item.product.price * item.quantity).toFixed(2)} ₽
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </div>
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
          <Link href="/" passHref>
            <Button
              className="w-full mt-4 rounded-md"
            >
              Продолжить покупки
            </Button>
          </Link>
        </div>
      </div>
    )
  );
};