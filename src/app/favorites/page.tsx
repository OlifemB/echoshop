import React from "react";
import {useFavoritesStore} from "@/store";
import {HeartOutlined} from "@ant-design/icons";
import {Button} from "antd";
import {ProductCard} from "@/components/product/ProductCard";

const FavoritesPage: React.FC<{ setCurrentPage: (page: string, id?: string) => void }> = ({setCurrentPage}) => {
	const favoriteItems = useFavoritesStore((state) => state.favoriteItemsArray); // Используем оптимизированный массив

	return (
    <div className="p-4 md:p-8  min-h-screen container mx-auto">
			<h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Избранное</h1>

			{favoriteItems.length === 0 ? (
				<div className="text-center text-gray-600 text-lg py-10 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
					<HeartOutlined className="text-6xl text-gray-400 mb-4"/>
					<p>У вас пока нет избранных товаров.</p>
					<Button
						type="primary"
						onClick={() => setCurrentPage('home')}
						className="mt-6 bg-blue-500 hover:bg-blue-600 rounded-md"
					>
						Начать покупки
					</Button>
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
					{favoriteItems.map((product) => (
						<ProductCard key={product.id} product={product} setCurrentPage={setCurrentPage}/>
					))}
				</div>
			)}
		</div>
	);
};

export default FavoritesPage;