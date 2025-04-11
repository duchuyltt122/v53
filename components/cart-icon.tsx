"use client"

import { ShoppingBag } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

export function CartIcon() {
  const { openCart, totalItems } = useCart()

  return (
    <button onClick={openCart} className="relative p-1 rounded-full hover:bg-gray-100" aria-label="Open shopping cart">
      <ShoppingBag className="h-5 w-5 text-gray-600" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-green-700 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
          {totalItems > 9 ? "9+" : totalItems}
        </span>
      )}
    </button>
  )
}

