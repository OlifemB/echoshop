import Link from "next/link";
import React from "react";
import { useCartStore, useFavoritesStore, useUserStore } from "@/common/store";
import { Badge, Layout, Menu } from "antd";
import { HeartOutlined, HomeOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";

export const Header: React.FC = () => {
  const favoriteItemCount = useFavoritesStore((state) => state.items.size);
  const userEmail = useUserStore((state) => state.user.email);
  const isLoggedIn = !!userEmail;
  const cartItemCount = useCartStore((state) => Array
    .from(state.items.values())
    .reduce((acc, item) => acc + item.quantity, 0));

  const menuItems = [{
    key: 'home',
    icon: <HomeOutlined/>,
    label: <Link prefetch={true} href="/">
      Главная
    </Link>,
  }, {
    key: 'product',
    icon: <HomeOutlined/>,
    label: <Link prefetch={true} href="/product">Магазин</Link>,
  }, {
    key: 'cart',
    icon: <ShoppingCartOutlined/>,
    label: <Link prefetch={true} href="/cart">
      <Badge count={cartItemCount} offset={[10, 0]} showZero={false} size="small">
        Корзина
      </Badge>
    </Link>,
  }, {
    key: '1',
    icon: <HeartOutlined/>,
    label: <Link prefetch={true} href="/favorites">
      <Badge count={favoriteItemCount} offset={[10, 0]} showZero={false} size="small">
        Избранное
      </Badge>

    </Link>,
  }, {
    key: 'profile',
    icon: <UserOutlined/>,
    label: <Link prefetch={true} href="/profile">
      {isLoggedIn ? 'Профиль' : 'Войти'}
    </Link>,
  },]


  return (
    <Layout.Header className="shadow-md sticky top-0 z-20 !bg-white/50 backdrop-blur-xl">
      <div className={'container flex items-center justify-between mx-auto flex-1'}>
        <div className="text-xl font-bold text-blue-600 cursor-pointer">
          EchoShop
        </div>

        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          className="flex-grow justify-end !bg-transparent"
          style={{ minWidth: 0 }}
          items={menuItems}
        />
      </div>
    </Layout.Header>
  )
}