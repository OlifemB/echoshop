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

  const menuItems = [{
    label: "Главная",
    key:'1',
    icon: <HomeOutlined />,
    onClick: () => setCurrentPage('home')
  },{
    label: "Корзина",
    key:'2',
    icon: <Badge count={cartItemCount} offset={[10, 0]} showZero={false} size="small">
      <ShoppingCartOutlined />
    </Badge>,
    onClick: () => setCurrentPage('cart')
  },{
    label: "Избранное",
    key:'3',
    icon:<Badge count={favoriteItemCount} offset={[10, 0]} showZero={false} size="small">
      <HeartOutlined />
    </Badge>,
    onClick: () => setCurrentPage('favorites')
  },{
    label: isLoggedIn ? 'Профиль' : 'Войти',
    key:'4',
    icon: <UserOutlined />,
    onClick: () => setCurrentPage('profile')
  }]

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
        items={menuItems}
      />
    </Layout.Header>
  );
};