import { DummyJsonProduct, Product } from "@/common/types"
import { message } from "antd"
import { useEffect, useState } from "react"


export const useProductData = (productId?: string | null) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        let url = '';
        let loadedProducts: Product[] = [];

        if (productId) {
          url = `https://dummyjson.com/products/${productId}`;
          message.info(`Загрузка товара ${productId} с сервера...`);
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data: DummyJsonProduct = await response.json();
          loadedProducts = [{
            id: String(data.id),
            name: data.title,
            description: data.description,
            price: data.price,
            image: data.thumbnail,
            category: data.category,
            brand: data.brand,
          }];
          message.success(`Товар ${data.title} успешно загружен!`);
        } else {
          url = 'https://dummyjson.com/products?limit=100';
          message.info('Загрузка всех товаров с сервера...');
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          loadedProducts = data.products.map((p: DummyJsonProduct) => ({
            id: String(p.id),
            name: p.title,
            description: p.description,
            price: p.price,
            image: p.thumbnail,
            category: p.category,
            brand: p.brand,
          }));
          message.success('Все товары успешно загружены с сервера!');
        }
        setProducts(loadedProducts);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
          message.error(`Ошибка загрузки данных: ${e.message}`);
        } else {
          setError('Произошла неизвестная ошибка');
          message.error('Произошла неизвестная ошибка');
        }
      } finally {
        setLoading(false);
      }
    };

    loadData().then(() => null);
  }, [productId]);

  const singleProduct = productId ? products[0] : undefined;

  return {
    products: productId ? (singleProduct ? [singleProduct] : []) : products,
    product: singleProduct,
    loading,
    error
  };
};