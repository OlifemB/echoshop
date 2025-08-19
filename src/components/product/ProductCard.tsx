import { useProductData } from "@/common/hooks/useProductData";
import { useCartStore, useFavoritesStore } from "@/common/store";
import { ErrorComponent } from "@/components/shared/Error";
import { Spinner } from "@/components/shared/Spinner";
import { HeartFilled, HeartOutlined, MinusOutlined, PlusOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback } from 'react';


export const ProductCard = React.memo(() => {
  const router = useRouter();
  const { id } = router.query;
  const selectedProductId = typeof id === 'string' ? id : null;

  const { product, loading, error } = useProductData(selectedProductId);

  const addItemToCart = useCartStore(useCallback((state) => state.addItem, []));
  const updateQuantity = useCartStore(useCallback((state) => state.updateQuantity, []));
  const cartItemsMap = useCartStore(useCallback((state) => state.items, []));

  const addFavorite = useFavoritesStore(useCallback((state) => state.addFavorite, []));
  const removeFavorite = useFavoritesStore(useCallback((state) => state.removeFavorite, []));
  const favoriteItemsMap = useFavoritesStore(useCallback((state) => state.items, []));

  const isProdFavorite = product ? favoriteItemsMap.has(product.id) : false;
  const currentCartItem = product ? cartItemsMap.get(product.id) : undefined;
  const currentQuantity = currentCartItem ? currentCartItem.quantity : 0;

  const handleToggleFavorite = useCallback(() => {
    if (product) {
      if (isProdFavorite) {
        removeFavorite(product.id);
      } else {
        addFavorite(product);
      }
    }
  }, [isProdFavorite, addFavorite, removeFavorite, product]);

  const handleAddToCart = useCallback(() => {
    if (product) {
      addItemToCart(product);
    }
  }, [addItemToCart, product]);

  const handleUpdateQuantityMinus = useCallback(() => {
    if (product) {
      updateQuantity(product.id, currentQuantity - 1);
    }
  }, [updateQuantity, product, currentQuantity]);

  const handleUpdateQuantityPlus = useCallback(() => {
    if (product) {
      updateQuantity(product.id, currentQuantity + 1);
    }
  }, [updateQuantity, product, currentQuantity]);


  if (loading) {
    return <Spinner/>;
  }

  if (error) {
    return <ErrorComponent message={error}/>;
  }

  if (!product) {
    return (
      <div className="text-center text-gray-600 text-lg py-10 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
        <p>Товар не найден.</p>
        <Link href="/" passHref>
          <Button type="primary" className="mt-6 bg-blue-500 hover:bg-blue-600 rounded-md">
            Вернуться к покупкам
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-4xl rounded-lg shadow-xl p-6 md:p-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 flex justify-center items-center relative min-h-[300px]">
          <Image
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={false}
            loading="lazy"
            src={product.image || 'https://placehold.co/600x450/CCCCCC/333333?text=Нет+изображения'}
            alt={product.name}
            style={{ objectFit: 'contain' }}
            onError={(e) => {
              e.currentTarget.onerror = null;
            }}
          />
        </div>
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">{product.description}</p>
            <div className="flex items-start justify-start flex-col mb-6">
              <span className="text-lg text-gray-500">
                  Категория: <span className="font-semibold">{product.category}</span>
              </span>
              <span className="text-lg text-gray-500">
                  Бренд: <span className="font-semibold">{product.brand}</span>
              </span>
            </div>
            <span className="text-4xl font-bold text-blue-700 mr-3">
                {product.price.toFixed(2)} $
              </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            {currentQuantity === 0 ? (
              <Button
                type="primary"
                size="large"
                icon={<ShoppingCartOutlined/>}
                onClick={handleAddToCart}
                className="flex-grow bg-blue-600 hover:bg-blue-700 rounded-lg py-3 px-6 text-lg font-semibold"
              >
                Добавить в корзину
              </Button>
            ) : (
              <div className="flex items-center justify-center flex-grow gap-2">
                <Button
                  icon={<MinusOutlined/>}
                  size="large"
                  onClick={handleUpdateQuantityMinus}
                  disabled={currentQuantity <= 0}
                  className="rounded-lg py-3 px-6 text-lg font-semibold"
                />
                <span className="font-bold text-lg min-w-[30px] text-center">{currentQuantity}</span>
                <Button
                  icon={<PlusOutlined/>}
                  size="large"
                  onClick={handleUpdateQuantityPlus}
                  className="rounded-lg py-3 px-6 text-lg font-semibold"
                />
              </div>
            )}
            <Button
              size="large"
              icon={isProdFavorite
                ? <HeartFilled style={{ color: 'red' }}/>
                : <HeartOutlined style={{ color: 'inherit' }}/>
              }
              onClick={handleToggleFavorite}
              className="flex-grow rounded-lg py-3 px-6 text-lg font-semibold"
            >
              {isProdFavorite ? 'В избранном' : 'В избранное'}
            </Button>
          </div>
          <Link href="/" passHref>
            <Button
              type="link"
              className="mt-6 self-start text-blue-600 hover:text-blue-800"
            >
              ← Вернуться к покупкам
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
});