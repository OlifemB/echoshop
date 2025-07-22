import { useNavigation } from "@/hooks/useNavigation";
import { useCartStore, useFavoritesStore, useUserStore } from "@/store";
import { Badge, Layout, Menu } from "antd";
import { HeartOutlined, HomeOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";

export const Header: React.FC = () => {
  const { setCurrentPage } = useNavigation();
  const favoriteItemCount = useFavoritesStore((state) => state.items.size);
  const userEmail = useUserStore((state) => state.user.email);
  const isLoggedIn = !!userEmail;
  const cartItemCount = useCartStore((state) => Array
    .from(state.items.values())
    .reduce((acc, item) => acc + item.quantity, 0));

  const menuItems = [{
    label: "Главная",
    key: '1',
    icon: <HomeOutlined/>,
    onClick: () => setCurrentPage('home')
  }, {
    label: "Корзина",
    key: '2',
    icon: <Badge count={cartItemCount} offset={[10, 0]} showZero={false} size="small">
      <ShoppingCartOutlined/>
    </Badge>,
    onClick: () => setCurrentPage('cart')
  }, {
    label: "Избранное",
    key: '3',
    icon: <Badge count={favoriteItemCount} offset={[10, 0]} showZero={false} size="small">
      <HeartOutlined/>
    </Badge>,
    onClick: () => setCurrentPage('favorites')
  }, {
    label: isLoggedIn ? 'Профиль' : 'Войти',
    key: '4',
    icon: <UserOutlined/>,
    onClick: () => setCurrentPage('profile')
  }]

  return (
    <Layout.Header
      className="shadow-md flex items-center justify-between sticky top-0 z-20 !bg-white/50 backdrop-blur-xl"
    >
      <div className="text-xl font-bold text-blue-600 cursor-pointer" onClick={() => setCurrentPage('home')}>
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
    </Layout.Header>
  );
};