import React from "react";
import { Spin } from "antd";

export const Spinner: React.FC = () => (
  <div className="flex justify-center items-center min-h-[calc(100vh-120px)]">
    <Spin size="large" tip="Загрузка данных..." />
  </div>
)