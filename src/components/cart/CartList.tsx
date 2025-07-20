import React from 'react';
import {CartItem} from "@/components/cart/CartItem";
import {List} from "antd";
import {useCartStore} from "@/store";

export const CartList = () => {
  const cartItems = useCartStore((state) => state.cartItemsArray); // Используем оптимизированный массив

  return (
    <List
      itemLayout="horizontal"
      dataSource={cartItems}
      renderItem={(item) => (
        <CartItem
          key={item.product.id}
          {...item}
        />
      )}
    />
  );
};