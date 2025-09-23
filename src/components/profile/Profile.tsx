'use client'

import React, { useState } from 'react';
import { Avatar, Button, Card, Input, List, message, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useUserStore } from "@/common/store";

export const Profile: React.FC = () => {
  const user = useUserStore((state) => state.user);
  const login = useUserStore((state) => state.login);
  const logout = useUserStore((state) => state.logout);
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const handleLogin = () => {
    if (emailInput) {
      login(emailInput);
      setIsAuthModalVisible(false);
      setEmailInput('');
    } else {
      message.error('Пожалуйста, введите ваш Email.').then(() => null);
    }
  };

  return (
    <Card className="w-full max-w-2xl rounded-lg shadow-xl p-6 md:p-8 text-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Профиль пользователя</h1>

      {user.email ? (
        <div className="flex flex-col items-center">
          <Avatar size={64} icon={<UserOutlined/>} className="mb-4 bg-blue-500"/>
          <p className="text-xl font-semibold text-gray-800 mb-4">Добро пожаловать, {user.email}!</p>
          <Button
            danger
            onClick={logout}
            className="mb-8 rounded-md"
          >
            Выйти
          </Button>

          <h2 className="text-2xl font-bold mb-4 text-gray-800">История заказов</h2>
          {user.orders.length === 0 ? (
            <div className="text-gray-600 text-lg py-4">У вас пока нет заказов.</div>
          ) : (
            <List
              className="w-full text-left"
              itemLayout="vertical"
              dataSource={user.orders}
              renderItem={(order) => (
                <List.Item>
                  <Card className="rounded-lg shadow-sm w-full">
                    <p className="font-semibold text-lg mb-2">Заказ №: {order.id}</p>
                    <p className="text-gray-600 mb-2">Дата: {order.date}</p>
                    <ul className="list-disc list-inside text-gray-700 mb-2">
                      {order.items.map((item, idx) => (
                        <li key={idx}>{item.name} (x{item.quantity})
                          - {(item.price * item.quantity).toFixed(2)} ₽</li>
                      ))}
                    </ul>
                    <p className="font-bold text-xl text-blue-700">Итого: {order.total.toFixed(2)} ₽</p>
                  </Card>
                </List.Item>
              )}
            />
          )}
        </div>
      ) : (
        <div>
          <p className="text-lg text-gray-700 mb-6">Войдите, чтобы просмотреть свой профиль и историю заказов.</p>
          <Button
            type="primary"
            size="large"
            icon={<UserOutlined/>}
            onClick={() => setIsAuthModalVisible(true)}
            className="bg-blue-500 hover:bg-blue-600 rounded-md py-3 text-lg font-semibold"
          >
            Войти
          </Button>
        </div>
      )}

      <Modal
        title="Вход в аккаунт"
        open={isAuthModalVisible}
        onCancel={() => setIsAuthModalVisible(false)}
        footer={[
          <Button
            key="back"
            onClick={() => setIsAuthModalVisible(false)}
            className="rounded-md"
          >
            Отмена
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleLogin}
            className="rounded-md bg-blue-500 hover:bg-blue-600"
          >
            Войти
          </Button>,
        ]}
      >
        <p className="mb-4 text-gray-700">Имитация авторизации. Введите любой Email.</p>
        <Input
          placeholder="Ваш Email"
          type="email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          className="rounded-md"
        />
      </Modal>
    </Card>
  );
};