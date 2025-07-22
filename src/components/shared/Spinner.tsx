import React from "react";
import { Spin } from "antd";

export const Spinner: React.FC = () => (
  <div className="flex justify-center items-center flex-1">
    <Spin size="large" tip="Загрузка данных..." />
  </div>
)