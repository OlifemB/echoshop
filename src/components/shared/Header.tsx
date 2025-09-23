'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo } from "react";
import { useCartStore, useFavoritesStore, useUserStore } from "@/common/store";
import { Badge, Menu } from "antd";
import { HeartOutlined, HomeOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";

export const Header: React.FC = () => {
  const favoriteItemCount = useFavoritesStore((state) => state.items.size);
  const userEmail = useUserStore((state) => state.user.email);
  const isLoggedIn = !!userEmail;
  const cartItemCount = useCartStore((state) => Array
    .from(state.items.values())
    .reduce((acc, item) => acc + item.quantity, 0));

  const pathname = usePathname();

  const initializeCart = useCartStore((state) => state.initializeFromLocalStorage);
  const initializeFavorites = useFavoritesStore((state) => state.initializeFromLocalStorage);

  useEffect(() => {
    initializeCart();
    initializeFavorites();
  }, [initializeCart, initializeFavorites]);

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link href="/">Главная</Link>,
    },
    {
      key: '/cart',
      icon: <ShoppingCartOutlined />,
      label: (
        <Link href="/cart">
          <Badge count={cartItemCount} offset={[10, 0]} size="small">
            Корзина
          </Badge>
        </Link>
      ),
    },
    {
      key: '/favorites',
      icon: <HeartOutlined />,
      label: (
        <Link href="/favorites">
          <Badge count={favoriteItemCount} offset={[10, 0]} size="small">
            Избранное
          </Badge>
        </Link>
      ),
    },
    {
      key: '/profile',
      icon: <UserOutlined />,
      label: <Link href="/profile">{isLoggedIn ? 'Профиль' : 'Войти'}</Link>,
    },
  ];

  const selectedMenuKey = useMemo(() => {
    if (!pathname) return '/';
    const matchedItem = menuItems.find((item) => item.key === pathname);
    if (matchedItem) return matchedItem.key;
    if (pathname.startsWith('/product/')) return '/';
    return '/';
  }, [pathname, menuItems]);

  return (
    <div className="shadow-md sticky top-0 z-20 !bg-white/50 backdrop-blur-xl">
      <div className="container flex items-center justify-between mx-auto flex-1">
        <div className="text-xl font-bold text-blue-600 cursor-pointer">
          <Link href="/">EchoShop</Link>
        </div>
        <Menu
          theme="light"
          mode="horizontal"
          selectedKeys={[selectedMenuKey]}
          className="flex-grow justify-end !bg-transparent"
          style={{ minWidth: 0 }}
          items={menuItems}
        />
      </div>
    </div>
  );
};