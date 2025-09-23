import React from "react";
import { Spin } from "antd";

export const Spinner: React.FC<{ tip?: string }> = ({ tip }) => {
  return (
    <div className="flex justify-center items-center flex-1">
      <Spin spinning size="large" tip={tip}/>
    </div>
  )
}