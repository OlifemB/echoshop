import Link from "next/link";
import React from 'react';
import { Button } from "antd";
import { isNil } from 'lodash'
import { HeartOutlined } from "@ant-design/icons";
import { useFavoritesStore } from "@/common/store";
import { ProductListCard } from "@/components/product/ProductListCard";

export const FavoritesList: React.FC = () => {
  const favoriteItems = useFavoritesStore((state) => state.favoriteItemsArray);

  return (
    isNil(favoriteItems) || favoriteItems.length === 0 ? (
      <div className="text-center text-gray-600 text-lg py-10 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
        <HeartOutlined className="text-6xl text-gray-400 mb-4"/>
        <p>У вас пока нет избранных товаров.</p>
        <Link href="/" passHref>
          <Button
            type="primary"
            className="mt-6 bg-blue-500 hover:bg-blue-600 rounded-md"
          >
            Начать покупки
          </Button>
        </Link>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {favoriteItems.map((product) => (
          <ProductListCard key={product.id} product={product} />
        ))}
      </div>
    )
  );
};