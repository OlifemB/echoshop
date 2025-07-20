'use client'

import {useCallback, useEffect, useState} from "react";
import {useCartStore, useFavoritesStore, useUserStore} from "@/store";
import {ProductList} from "@/components/product/ProductList";
import {Alert, Layout, message, Spin} from "antd";
import {Header} from "@/components/shared/Header";
import ProductDetailPage from "@/app/product/[id]/page";
import CartPage from "@/app/cart/page";
import FavoritesPage from "@/app/favorites/page";
import UserProfilePage from "@/app/profile/page";
import {DummyJsonProduct, Product} from "@/types";


const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from dummyjson.com
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://dummyjson.com/products?limit=100'); // Fetch more products
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Map DummyJsonProduct to our Product interface
        const mappedProducts: Product[] = data.products.map((p: DummyJsonProduct) => ({
          id: String(p.id), // Ensure ID is string
          name: p.title,
          description: p.description,
          price: p.price,
          image: p.thumbnail, // Use thumbnail as the main image
          category: p.category,
          brand: p.brand,
        }));
        setProducts(mappedProducts);
      } catch (e: any) {
        setError(e.message);
        message.error(`Ошибка загрузки товаров: ${e.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this runs once on mount

  // Helper function to parse hash and extract page and product ID
  const parseHash = useCallback(() => {
    const hash = window.location.hash.substring(1); // Remove '#'
    if (!hash || hash === 'home') {
      return {page: 'home', id: null};
    }
    const parts = hash.split('/');
    if (parts.length === 2 && parts[0] === 'product') {
      return {page: 'product', id: parts[1]};
    }
    return {page: parts[0], id: null};
  }, []);

  const [pageState, setPageState] = useState(parseHash());
  const currentPage = pageState.page;
  const selectedProductId = pageState.id;

  // Effect to listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      setPageState(parseHash());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [parseHash]);

  const cartItemCount = useCartStore((state) => Array.from(state.items.values()).reduce((acc, item) => acc + item.quantity, 0));
  const favoriteItemCount = useFavoritesStore((state) => state.items.size);
  const userEmail = useUserStore((state) => state.user.email);

  // Updated handleSetPage to manipulate URL hash
  const handleSetPage = useCallback((page: string, id?: string) => {
    if (page === 'home' && !id) {
      window.location.hash = ''; // For home page, clear hash
    } else if (id) {
      window.location.hash = `${page}/${id}`;
    } else {
      window.location.hash = page;
    }
  }, []);

  const renderPage = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center min-h-[calc(100vh-120px)]">
          <Spin size="large" tip="Загрузка товаров..."/>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex justify-center items-center min-h-[calc(100vh-120px)]">
          <Alert
            message="Ошибка"
            description={`Не удалось загрузить товары: ${error}`}
            type="error"
            showIcon
          />
        </div>
      );
    }

    switch (currentPage) {
      case 'home':
        return <ProductList products={products} setCurrentPage={handleSetPage}/>;
      case 'product':
        return selectedProductId ?
          <ProductDetailPage productId={selectedProductId} products={products} setCurrentPage={handleSetPage}/> :
          <ProductList products={products} setCurrentPage={handleSetPage}/>;
      case 'cart':
        return <CartPage setCurrentPage={handleSetPage}/>;
      case 'favorites':
        return <FavoritesPage setCurrentPage={handleSetPage}/>;
      case 'profile':
        return <UserProfilePage setCurrentPage={handleSetPage}/>;
      default:
        return <ProductList products={products} setCurrentPage={handleSetPage}/>;
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