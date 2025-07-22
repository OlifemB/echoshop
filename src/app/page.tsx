'use client'

import ProductList from "@/app/product/page"
import { Footer } from "@/components/shared/Footer"
import { Header } from "@/components/shared/Header"
import { useNavigation } from "@/hooks/useNavigation"
import { useProductData } from "@/hooks/useProductData"
import {
  putStoreData,
  FAVORITES_STORE_NAME,
  CART_ITEMS_STORE_NAME
} from "@/indexDB/setup"
import React, { useEffect } from "react"
import { useCartStore, useFavoritesStore } from "@/store"
import { Alert, Layout, Spin } from "antd"
import ProductDetailPage from "@/app/product/[id]/page"
import CartPage from "@/app/cart/page"
import FavoritesPage from "@/app/favorites/page"
import UserProfilePage from "@/app/profile/page"


const App: React.FC = () => {
  const { loading, error } = useProductData()
  const { currentPage, selectedProductId } = useNavigation()

  // Effect to save Favorites to IndexedDB whenever favoriteItemsArray changes
  const favoriteItemsArray = useFavoritesStore((state) => state.favoriteItemsArray)
  useEffect(() => {
    if (!loading && typeof window !== 'undefined' && window.indexedDB) {
      putStoreData(FAVORITES_STORE_NAME, favoriteItemsArray)
        .catch(err => console.error("Failed to save favorites to IndexedDB:", err))
    }
  }, [favoriteItemsArray, loading])

  const cartItemsArray = useCartStore((state) => state.cartItemsArray)
  useEffect(() => {
    if (!loading && typeof window !== 'undefined' && window.indexedDB) {
      putStoreData(CART_ITEMS_STORE_NAME, cartItemsArray)
        .catch(err => console.error("Failed to save cart items to IndexedDB:", err))
    }
  }, [cartItemsArray, loading])


  const renderPage = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center min-h-[calc(100vh-120px)]">
          <Spin size="large" tip="Загрузка данных..."/>
        </div>
      )
    }

    if (error) {
      return (
        <div className="flex justify-center items-center min-h-[calc(100vh-120px)]">
          <Alert
            message="Ошибка"
            description={`Не удалось загрузить данные: ${error}`}
            type="error"
            showIcon
          />
        </div>
      )
    }

    switch (currentPage) {
      case 'home':
        return <ProductList/>
      case 'product':
        return selectedProductId
          ? <ProductDetailPage/>
          : <ProductList/>
      case 'cart':
        return <CartPage/>
      case 'favorites':
        return <FavoritesPage/>
      case 'profile':
        return <UserProfilePage/>
      default:
        return <ProductList/>
    }
  }

  return (
    <Layout className="min-h-screen flex flex-col font-sans !bg-gray-50">
      <Header/>

      <Layout.Content className="flex-grow">
        {renderPage()}
      </Layout.Content>
      <Footer/>
    </Layout>
  )
}

export default App