import {useCartStore} from "@/store";
import {useUserStore} from "@/store";
import {Button, List, message} from "antd";
import {Order} from "@/types";
import {CheckOutlined, DeleteOutlined, MinusOutlined, PlusOutlined, ShoppingCartOutlined} from "@ant-design/icons";

export const CartPage: React.FC<{ setCurrentPage: (page: string) => void }> = ({setCurrentPage}) => {
  const cartItems = useCartStore((state) => state.cartItemsArray); // Используем оптимизированный массив
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const addOrder = useUserStore((state) => state.addOrder);
  const userEmail = useUserStore((state) => state.user.email);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      message.warning('Ваша корзина пуста!');
      return;
    }
    if (!userEmail) {
      message.error('Пожалуйста, войдите в систему, чтобы оформить заказ.');
      setCurrentPage('profile');
      return;
    }

    const newOrder: Order = {
      id: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      date: new Date().toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      items: cartItems.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      })),
      total: getTotalPrice(),
    };

    addOrder(newOrder);
    clearCart();
    message.success('Заказ успешно оформлен! Вы можете просмотреть его в своем профиле.');
    setCurrentPage('profile');
  };

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
            <List
              itemLayout="horizontal"
              dataSource={cartItems}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button
                      key='MinusOutlined'
                      icon={<MinusOutlined/>}
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="rounded-md"
                    />,
                    <span key="quantity" className="font-bold text-lg">{item.quantity}</span>,
                    <Button
                      key="PlusOutlined"
                      icon={<PlusOutlined/>}
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="rounded-md"
                    />,
                    <Button
                      key="DeleteOutlined"
                      danger
                      icon={<DeleteOutlined/>}
                      onClick={() => removeItem(item.product.id)}
                      className="rounded-md"
                    />,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-md shadow-sm"
                        onError={(e) => {
                          e.currentTarget.src = `https://placehold.co/80x80/CCCCCC/333333?text=Нет+изображения`;
                          e.currentTarget.onerror = null;
                        }}
                      />
                    }
                    title={<span className="font-semibold text-gray-800">{item.product.name}</span>}
                    description={
                      <div className="text-gray-600">
                        Цена: {item.product.price.toFixed(2)} ₽
                        <br/>
                        Итого: {(item.product.price * item.quantity).toFixed(2)} ₽
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </div>
          <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Итого</h2>
            <div className="flex justify-between items-center text-xl font-semibold mb-6 text-gray-800">
              <span>Общая сумма:</span>
              <span>{getTotalPrice().toFixed(2)} ₽</span>
            </div>
            <Button
              type="primary"
              size="large"
              icon={<CheckOutlined/>}
              onClick={handleCheckout}
              className="w-full bg-green-500 hover:bg-green-600 rounded-md py-3 text-lg font-semibold"
            >
              Оформить заказ
            </Button>
            <Button
              onClick={() => setCurrentPage('home')}
              className="w-full mt-4 rounded-md"
            >
              Продолжить покупки
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};