import { DummyJsonProduct, Product } from "@/common/types"
import { message } from "antd"
import { useEffect, useState } from "react"


export const useProductData = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true);
      setError(null);

      try {
        message.info('Загрузка товаров с сервера...');
        const response = await fetch('https://dummyjson.com/products?limit=100');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const loadedProducts = data.products.map((p: DummyJsonProduct) => ({
          id: String(p.id),
          name: p.title,
          description: p.description,
          price: p.price,
          image: p.thumbnail,
          category: p.category,
          brand: p.brand,
        }));
        setProducts(loadedProducts);
        message.success('Товары успешно загружены с сервера!');

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

    loadAllData().then(() => null);
  }, []);

  return {
    products,
    loading,
    error
  };
};