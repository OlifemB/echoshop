import React from "react"
import { Card, Button } from "antd"
import Image from "next/image"
import {
  ArrowRightOutlined,
  HeartFilled,
  HeartOutlined,
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined
} from "@ant-design/icons"
import { Product } from "@/common/types"
import { useCartStore, useFavoritesStore } from "@/common/store"
import Link from "next/link"


export const ProductListCard: React.FC<{ product: Product }> = ({ product }) => {
  const addItemToCart = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const cartItemsMap = useCartStore((state) => state.items);
  const currentCartItem = cartItemsMap.get(product.id);
  const currentQuantity = currentCartItem ? currentCartItem.quantity : 0;

  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
  const favoriteItemsMap = useFavoritesStore((state) => state.items);
  const isProdFavorite = favoriteItemsMap.has(product.id);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (isProdFavorite) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
  };

  return (
    <Card
      hoverable
      classNames={{
        body: 'h-full',
        actions: 'px-2'
      }}
      className="w-full h-full flex flex-col rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
      actions={[
        <div key={'cart-actions'} className={'flex items-center justify-center gap-2 px-4'}>
          {currentQuantity === 0 ? (
            <Button
              type="primary"
              icon={<ShoppingCartOutlined/>}
              className="bg-blue-500 hover:bg-blue-600 rounded-md w-full"
              onClick={(e) => {
                e.stopPropagation();
                addItemToCart(product);
              }}
            >
              В корзину
            </Button>
          ) : (
            <div className="flex items-center justify-center w-full gap-2">
              <Button
                icon={<MinusOutlined/>}
                onClick={(e) => {
                  e.stopPropagation();
                  updateQuantity(product.id, currentQuantity - 1);
                }}
                disabled={currentQuantity <= 0}
                className="rounded-md"
              />
              <span className="font-bold text-lg min-w-[30px] text-center">{currentQuantity}</span>
              <Button
                icon={<PlusOutlined/>}
                onClick={(e) => {
                  e.stopPropagation();
                  updateQuantity(product.id, currentQuantity + 1);
                }}
                className="rounded-md"
              />
            </div>
          )}
          <Button type="text">
            <Link href={`/product/${product.id}`}>
              <ArrowRightOutlined/>
            </Link>
          </Button>
        </div>
      ]}
    >
      <Link href={`/product/${product.id}`} passHref className="cursor-pointer flex-grow">
        <div className="relative min-h-[200px] w-full">
          <Image
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            loading="lazy"
            src={product?.image || 'https://placehold.co/600x450/CCCCCC/333333?text=Нет+изображения'}
            alt={product?.name || ''}
            style={{ objectFit: 'contain' }}
            onError={(e) => {
              e.currentTarget.onerror = null;
            }}
          />

          <Button
            type={'text'}
            key={'like'}
            icon={isProdFavorite
              ? <HeartFilled style={{ color: 'red' }}/>
              : <HeartOutlined style={{ color: 'inherit' }}/>
            }
            onClick={handleToggleFavorite}
            className="rounded-md absolute left-0 top-0"
          />
        </div>
        <Card.Meta
          title={<div className="text-lg font-semibold text-gray-800">{product.name}</div>}
          description={
            <div className="flex flex-col">
              <span className="text-xl font-bold text-blue-600 mb-2">{product.price.toFixed(2)} $</span>
              <span className="text-sm text-gray-500">Категория: {product.category}</span>
              <span className="text-sm text-gray-500">Бренд: {product.brand}</span>
            </div>
          }
        />
      </Link>
    </Card>
  );
};