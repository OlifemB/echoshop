import {useCartStore} from "@/store";
import {Button} from "antd";
import {ShoppingCartOutlined} from "@ant-design/icons";
import {CartList} from "@/components/cart/CartList";
import {CartSummary} from "@/components/cart/CartSummary";

const CartPage: React.FC<{ setCurrentPage: (page: string) => void }> = ({setCurrentPage}) => {
  const cartItems = useCartStore((state) => state.cartItemsArray); // Используем оптимизированный массив

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Ваша корзина</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600 text-lg py-10 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
          <ShoppingCartOutlined className="text-6xl text-gray-400 mb-4"/>
          <p>Ваша корзина пуста.</p>
          <Button type="primary" onClick={() => setCurrentPage('home')}
                  className="mt-6 bg-blue-500 hover:bg-blue-600 rounded-md">
            Начать покупки
          </Button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          <div className="lg:w-2/3 bg-white p-6 rounded-lg shadow-md">
            <CartList/>
          </div>
          <CartSummary/>
        </div>
      )}
    </div>
  );
};

export default CartPage;