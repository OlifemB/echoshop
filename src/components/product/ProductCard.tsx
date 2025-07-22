import { Product } from "@/types"
import { useCartStore, useFavoritesStore } from "@/store"
import { Card, Button } from "antd"
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import Image from "next/image"
import React from "react"

export const ProductCard: React.FC<{
  product: Product
  setCurrentPage: (page: string, id?: string) => void
}> = ({ product, setCurrentPage }) => {
  const addItemToCart = useCartStore((state) => state.addItem)
  const addFavorite = useFavoritesStore((state) => state.addFavorite)
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite)
  const isFavorite = useFavoritesStore((state) => state.isFavorite)
  const isProdFavorite = isFavorite(product.id)

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent navigating to product page
    if (isProdFavorite) {
      removeFavorite(product.id)
    } else {
      addFavorite(product)
    }
  }

  return (
    <Card
      hoverable
      className="w-full h-full  flex flex-col rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
      cover={

        <div className="md:w-1/2 flex justify-center items-center relative min-h-[200px]">
          <Image
            fill
            sizes="(max-width: 768px) 100%"
            priority={false}
            loading="lazy"
            src={product?.image || 'https://placehold.co/600x450/CCCCCC/333333?text=Нет+изображения'}
            alt={product?.name || ''}
            style={{ objectFit: 'contain' }}
            onError={(e) => {
              e.currentTarget.onerror = null
            }}
          />
        </div>
      }
      actions={[
        <Button
          key={'1'}
          type="primary"
          icon={<ShoppingCartOutlined/>}
          onClick={(e) => {
            e.stopPropagation()
            addItemToCart(product)
          }}
          className="w-full bg-blue-500 hover:bg-blue-600 rounded-md"
        >
          В корзину
        </Button>,
        <Button
          key={'2'}
          icon={<HeartOutlined style={{ color: isProdFavorite ? 'red' : 'inherit' }}/>}
          onClick={handleToggleFavorite}
          className="w-full rounded-md"
        >
          {isProdFavorite ? 'В избранном' : 'В избранное'}
        </Button>,
      ]}
      onClick={() => setCurrentPage('product', product.id)}
    >
      <Card.Meta
        title={<div className="text-lg font-semibold text-gray-800">{product.name}</div>}
        description={
          <div className="flex flex-col">
            <span className="text-xl font-bold text-blue-600 mb-2">{product.price.toFixed(2)} ₽</span>
            <span className="text-sm text-gray-500">Категория: {product.category}</span>
            <span className="text-sm text-gray-500">Бренд: {product.brand}</span>
          </div>
        }
      />
    </Card>
  )
}