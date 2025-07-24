import Link from "next/link";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
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

  const router = useRouter(); // Use useRouter to get current path

  const menuItems = [{
    key: '/',
    icon: <HomeOutlined/>,
    label: <Link prefetch={true} href="/">
      Главная
    </Link>,
  }, {
    key: '/cart',
    icon: <ShoppingCartOutlined/>,
    label: <Link prefetch={true} href="/cart">
      <Badge count={cartItemCount} offset={[10, 0]} showZero={false} size="small">
        Корзина
      </Badge>
    </Link>,
  }, {
    key: '/favorites',
    icon: <HeartOutlined/>,
    label: <Link prefetch={true} href="/favorites">
      <Badge count={favoriteItemCount} offset={[10, 0]} showZero={false} size="small">
        Избранное
      </Badge>
    </Link>,
  }, {
    key: '/profile',
    icon: <UserOutlined/>,
    label: <Link prefetch={true} href="/profile">
      {isLoggedIn ? 'Профиль' : 'Войти'}
    </Link>,
  }];

  // Determine selected key based on current router path
  const selectedMenuKey = useMemo(() => {
    const currentPath = router.pathname;
    // Check if the current path matches any of the menu item keys
    const matchedItem = menuItems.find(item => item.key === currentPath);
    if (matchedItem) {
      return matchedItem.key;
    }
    // Handle dynamic routes like /product/[id]
    if (currentPath.startsWith('/product/')) {
      return '/'; // Or a more specific key if you have a "Products" page in menu
    }
    return '/'; // Default to home
  }, [router.pathname, menuItems]);


  return (
    <Layout.Header className="shadow-md sticky top-0 z-20 !bg-white/50 backdrop-blur-xl">
      <div className={'container flex items-center justify-between mx-auto flex-1'}>
        <div className="text-xl font-bold text-blue-600 cursor-pointer">
          <Link href="/">EchoShop</Link> {/* Link for logo */}
        </div>

        <Menu
          theme="light"
          mode="horizontal"
          selectedKeys={[selectedMenuKey]} // Use dynamic selected key
          className="flex-grow justify-end !bg-transparent"
          style={{ minWidth: 0 }}
          items={menuItems}
        />
      </div>
    </Layout.Header>
  )
}