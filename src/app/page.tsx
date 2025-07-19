'use client'

import {useCallback, useState} from "react";
import {useCartStore, useFavoritesStore, useUserStore} from "@/store";
import {ProductList} from "@/components/product/ProductList";
import {CartPage} from "@/components/cart/Cart";
import {FavoritesPage} from "@/components/favorites/Favorites";
import {UserProfilePage} from "@/components/user/User";
import {Layout} from "antd";
import {Header} from "@/components/shared/Header";

function ProductPage(props: { productId: string, setCurrentPage: (page: string, id?: string) => void }) {
  return null;
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const cartItemCount = useCartStore((state) => Array.from(state.items.values()).reduce((acc, item) => acc + item.quantity, 0));
  const favoriteItemCount = useFavoritesStore((state) => state.items.size);
  const userEmail = useUserStore((state) => state.user.email);

  const handleSetPage = useCallback((page: string, id?: string) => {
    setCurrentPage(page);
    setSelectedProductId(id || null);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <ProductList setCurrentPage={handleSetPage}/>;
      case 'product':
        return selectedProductId ? <ProductPage productId={selectedProductId} setCurrentPage={handleSetPage}/> :
          <ProductList setCurrentPage={handleSetPage}/>;
      case 'cart':
        return <CartPage setCurrentPage={handleSetPage}/>;
      case 'favorites':
        return <FavoritesPage setCurrentPage={handleSetPage}/>;
      case 'profile':
        return <UserProfilePage setCurrentPage={handleSetPage}/>;
      default:
        return <ProductList setCurrentPage={handleSetPage}/>;
    }
  };

  return (
    <Layout className="min-h-screen flex flex-col font-sans">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          body {
            font-family: 'Inter', sans-serif;
          }
          .ant-card-actions > li > span {
            width: 100%;
          }
          .ant-card-actions button {
            width: 100%;
          }
        `}
      </style>
      <Header
        setCurrentPage={handleSetPage}
        cartItemCount={cartItemCount}
        favoriteItemCount={favoriteItemCount}
        isLoggedIn={!!userEmail}
      />
      <Layout.Content className="flex-grow">
        {renderPage()}
      </Layout.Content>
      <Layout.Footer style={{textAlign: 'center', background: '#f0f2f5'}} className="shadow-inner mt-auto">
        EchoShop ©2025 Создано Echo
      </Layout.Footer>
    </Layout>
  );
};

export default App;