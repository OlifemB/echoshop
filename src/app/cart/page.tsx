import React from "react"
import { CartList } from "@/components/cart/CartList";

const CartPage: React.FC = () => {

  return (
    <div className="p-4 md:p-8  min-h-screen container mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Ваша корзина</h1>

      <CartList/>
    </div>
  )
}

export default CartPage