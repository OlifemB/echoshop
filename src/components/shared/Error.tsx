import React from "react";
import { Alert } from "antd";

export const ErrorComponent: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex justify-center items-center min-h-[calc(100vh-120px)]">
    <Alert
      message="Ошибка"
      description={`Не удалось загрузить данные: ${message}`}
      type="error"
      showIcon
    />
  </div>
)