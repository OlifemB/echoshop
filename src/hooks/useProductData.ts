'use client'

import {
  CART_ITEMS_STORE_NAME,
  FAVORITES_STORE_NAME,
  getStoreData,
  PRODUCTS_STORE_NAME,
  putStoreData
} from "@/indexDB/setup"
import { useCartStore, useFavoritesStore } from "@/store"
import { DummyJsonProduct, Product } from "@/types"
import { message } from "antd"
import { useEffect, useState } from "react"


export const useProductData = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const hydrateCart = useCartStore((state) => state.hydrate)
  const hydrateFavorites = useFavoritesStore((state) => state.hydrate)

  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true)
      setError(null)

      try {
        if (typeof window === 'undefined' || !window.indexedDB) {
          message.warning('IndexedDB не поддерживается в этом браузере. Данные не будут кэшироваться.')
        }

        let loadedProducts: Product[] = []
        if (typeof window !== 'undefined' && window.indexedDB) {
          const cachedProducts = await getStoreData<Product>(PRODUCTS_STORE_NAME)
          if (cachedProducts.length > 0) {
            loadedProducts = cachedProducts
            setProducts(loadedProducts)
            message.success('Товары загружены из локального кэша!')
          }
        }

        if (loadedProducts.length === 0) {
          message.info('Загрузка товаров с сервера...')
          const response = await fetch('https://dummyjson.com/products?limit=100')
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }
          const data = await response.json()
          loadedProducts = data.products.map((p: DummyJsonProduct) => ({
            id: String(p.id),
            name: p.title,
            description: p.description,
            price: p.price,
            image: p.thumbnail,
            category: p.category,
            brand: p.brand,
          }))
          setProducts(loadedProducts)
          message.success('Товары успешно загружены с сервера!')

          if (typeof window !== 'undefined' && window.indexedDB) {
            await putStoreData(PRODUCTS_STORE_NAME, loadedProducts)
            message.success('Каталог товаров сохранен в локальном кэше.')
          }
        }

        if (typeof window !== 'undefined' && window.indexedDB) {
          const cachedFavorites = await getStoreData<Product>(FAVORITES_STORE_NAME)
          if (cachedFavorites.length > 0) {
            hydrateFavorites(cachedFavorites)
            message.success('Избранное загружено из локального кэша!')
          }
        }

        if (typeof window !== 'undefined' && window.indexedDB) {
          const cachedCartItems = await getStoreData<{ product: Product; quantity: number }>(CART_ITEMS_STORE_NAME)
          if (cachedCartItems.length > 0) {
            hydrateCart(cachedCartItems)
            message.success('Корзина загружена из локального кэша!')
          }
        }

      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message)
          message.error(`Ошибка загрузки данных: ${e.message}`)
        } else {
          setError('Произошла неизвестная ошибка')
          message.error('Произошла неизвестная ошибка')
        }
      } finally {
        setLoading(false)
      }
    }

    loadAllData().then(() => null)
  }, [hydrateCart, hydrateFavorites, setProducts]) // setProducts is not needed as it's returned, but kept for clarity if it were passed in

  return {
    products,
    loading,
    error
  }
}