import React from 'react';
import {Button, List} from "antd";
import {DeleteOutlined, MinusOutlined, PlusOutlined} from "@ant-design/icons";
import {useCartStore, useUserStore} from "@/store";
import {Product} from "@/types";

export const CartItem = (item: { product: Product, quantity: number }) => {
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const addOrder = useUserStore((state) => state.addOrder);
  const userEmail = useUserStore((state) => state.user.email);

  console.log('item', item);
  return (
    <List.Item
      actions={[
        <Button
          key='MinusOutlined'
          icon={<MinusOutlined/>}
          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
          className="rounded-md"
        />,
        <span key="quantity" className="font-bold text-lg">{item.quantity}</span>,
        <Button
          key="PlusOutlined"
          icon={<PlusOutlined/>}
          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
          className="rounded-md"
        />,
        <Button
          key="DeleteOutlined"
          danger
          icon={<DeleteOutlined/>}
          onClick={() => removeItem(item.product.id)}
          className="rounded-md"
        />,
      ]}
    >
      <List.Item.Meta
        avatar={
          <img
            src={item.product.image}
            alt={item.product.name}
            className="w-20 h-20 object-cover rounded-md shadow-sm"
            onError={(e) => {
              e.currentTarget.src = `https://placehold.co/80x80/CCCCCC/333333?text=Нет+изображения`;
              e.currentTarget.onerror = null;
            }}
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
  );
};