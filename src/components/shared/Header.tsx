import {Badge, Layout, Menu, theme} from "antd";
import {HeartOutlined, HomeOutlined, ShoppingCartOutlined, UserOutlined} from "@ant-design/icons";

export const Header: React.FC<{
  setCurrentPage: (page: string) => void;
  cartItemCount: number;
  favoriteItemCount: number;
  isLoggedIn: boolean;
}> = ({ setCurrentPage, cartItemCount, favoriteItemCount, isLoggedIn }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout.Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: colorBgContainer }} className="shadow-md">
      <div className="text-xl font-bold text-blue-600 cursor-pointer" onClick={() => setCurrentPage('home')}>
        EchoShop
      </div>
      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        className="flex-grow justify-end"
        style={{ minWidth: 0 }}
      >
        <Menu.Item key="1" icon={<HomeOutlined />} onClick={() => setCurrentPage('home')}>
          Главная
        </Menu.Item>
        <Menu.Item key="2" icon={<Badge count={cartItemCount} offset={[10, 0]} showZero={false} size="small">
          <ShoppingCartOutlined />
        </Badge>} onClick={() => setCurrentPage('cart')}>
          Корзина
        </Menu.Item>
        <Menu.Item key="3" icon={<Badge count={favoriteItemCount} offset={[10, 0]} showZero={false} size="small">
          <HeartOutlined />
        </Badge>} onClick={() => setCurrentPage('favorites')}>
          Избранное
        </Menu.Item>
        <Menu.Item key="4" icon={<UserOutlined />} onClick={() => setCurrentPage('profile')}>
          {isLoggedIn ? 'Профиль' : 'Войти'}
        </Menu.Item>
      </Menu>
    </Layout.Header>
  );
};