import { useNavigation } from "@/common/hooks/useNavigation";
import { useProductData } from "@/common/hooks/useProductData";
import { useCartStore, useFavoritesStore } from "@/common/store";
import { ErrorComponent } from "@/components/shared/Error";
import { Spinner } from "@/components/shared/Spinner";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import Image from "next/image";
import React, { useMemo } from 'react';

const ProductCard = () => {
  const { setCurrentPage, selectedProductId } = useNavigation()
  const { products, loading, error } = useProductData() // Moved useProductData here
  const product = useMemo(() => products.find((p) => p.id === selectedProductId), [selectedProductId, products])
  const addItemToCart = useCartStore((state) => state.addItem)
  const addFavorite = useFavoritesStore((state) => state.addFavorite)
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite)
  const isFavorite = useFavoritesStore((state) => state.isFavorite)
  const isProdFavorite = product ? isFavorite(product.id) : false

  const handleToggleFavorite = () => {
    if (product) {
      if (isProdFavorite) {
        removeFavorite(product.id)
      } else {
        addFavorite(product)
      }
    }
  }

  if (loading) {
    return <Spinner/>
  }

  if (error) {
    return <ErrorComponent message={error}/>
  }

  return (
    <Card className="w-full max-w-4xl rounded-lg shadow-xl p-6 md:p-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 flex justify-center items-center relative">
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
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{product?.name}</h1>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">{product?.description}</p>
            <div className="flex items-baseline mb-6">
              <span className="text-4xl font-bold text-blue-700 mr-3">{product?.price.toFixed(2)} $</span>
              <span className="text-lg text-gray-500">
                  Категория: <span className="font-semibold">{product?.category}</span>
                </span>
              <span className="text-lg text-gray-500 ml-4">
                  Бренд: <span className="font-semibold">{product?.brand}</span>
                </span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Button
              type="primary"
              size="large"
              icon={<ShoppingCartOutlined/>}
              onClick={() => addItemToCart(product)}
              className="flex-grow bg-blue-600 hover:bg-blue-700 rounded-lg py-3 px-6 text-lg font-semibold"
            >
              Добавить в корзину
            </Button>
            <Button
              size="large"
              icon={<HeartOutlined style={{ color: isProdFavorite ? 'red' : 'inherit' }}/>}
              onClick={handleToggleFavorite}
              className="flex-grow rounded-lg py-3 px-6 text-lg font-semibold"
            >
              {isProdFavorite ? 'В избранном' : 'В избранное'}
            </Button>
          </div>
          <Button
            type="link" onClick={() => setCurrentPage('home')}
            className="mt-6 self-start text-blue-600 hover:text-blue-800"
          >
            ← Вернуться к покупкам
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;