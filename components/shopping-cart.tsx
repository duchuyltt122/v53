"use client"

import { useState } from "react"
import Image from "next/image"
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { useCart, type CartItem } from "@/contexts/cart-context"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { ProductPrice } from "@/components/product-price"

export function ShoppingCart() {
  const { items, removeItem, updateQuantity, isCartOpen, closeCart, totalItems, totalPrice } = useCart()
  const { language } = useLanguage()

  if (!isCartOpen) return null

  const handleCheckout = () => {
    closeCart()
    window.location.href = '/checkout'
  }



  const handleClose = () => {
    closeCart()
  }

  const formatCurrency = (amount: number) => {
    return language === "vi" ? `${amount.toLocaleString("vi-VN")}₫` : `$${(amount / 23000).toFixed(2)}`
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-xl">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5" />
            {language === "vi" ? "Giỏ hàng" : "Shopping Cart"}
            {totalItems > 0 && (
              <span className="ml-2 text-sm bg-green-700 text-white rounded-full px-2 py-0.5">{totalItems}</span>
            )}
          </h2>
          <button
            onClick={handleClose}
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label={language === "vi" ? "Đóng giỏ hàng" : "Close cart"}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-auto">
          {items.length === 0 ? (
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">
                {language === "vi" ? "Giỏ hàng trống" : "Your cart is empty"}
              </h3>
              <p className="text-gray-500 mb-6">
                {language === "vi"
                  ? "Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm."
                  : "Add products to your cart to continue shopping."}
              </p>
              <Button onClick={closeCart} className="w-full">
                {language === "vi" ? "Tiếp tục mua sắm" : "Continue Shopping"}
              </Button>
            </div>
          ) : (
            <div className="divide-y">
              {items.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  removeItem={removeItem}
                  updateQuantity={updateQuantity}
                  language={language}
                />
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t">
            <div className="flex justify-between mb-4">
              <span className="font-medium">{language === "vi" ? "Tổng cộng:" : "Total:"}</span>
              <span className="font-bold text-lg">{formatCurrency(totalPrice)}</span>
            </div>
            <Button onClick={handleCheckout} className="w-full bg-green-700 hover:bg-green-800">
              {language === "vi" ? "Tiến hành đặt hàng" : "Proceed to Checkout"}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

function CartItemRow({
  item,
  removeItem,
  updateQuantity,
  language,
}: {
  item: CartItem
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  language: string
}) {
  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1)
  }

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1)
    }
  }

  return (
    <div className="p-4 flex">
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={language === "vi" ? item.name.vi : item.name.en}
          fill
          className="object-cover"
        />
      </div>
      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between">
          <h3 className="text-sm font-medium">{language === "vi" ? item.name.vi : item.name.en}</h3>
          <button
            onClick={() => removeItem(item.id)}
            className="text-gray-400 hover:text-red-500"
            aria-label={language === "vi" ? "Xóa sản phẩm" : "Remove item"}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
        <ProductPrice price={item.price} salePrice={item.salePrice} className="mt-1 text-sm" />
        <div className="mt-2 flex items-center">
          <div className="flex items-center border rounded-md">
            <button
              onClick={handleDecrement}
              className="px-2 py-1 border-r"
              aria-label={language === "vi" ? "Giảm số lượng" : "Decrease quantity"}
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="px-3 py-1 text-sm">{item.quantity}</span>
            <button
              onClick={handleIncrement}
              className="px-2 py-1 border-l"
              aria-label={language === "vi" ? "Tăng số lượng" : "Increase quantity"}
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

