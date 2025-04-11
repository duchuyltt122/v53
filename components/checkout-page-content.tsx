"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, CreditCard, Wallet, Loader2, ShoppingCart } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useCart } from "@/contexts/cart-context"
import { useLanguage } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { sendOrderConfirmationEmail } from "@/app/actions/send-order-confirmation-email"

const checkoutSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  phone: z.string().min(10, { message: "Valid phone number is required" }),
  address: z.string().min(5, { message: "Address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  notes: z.string().optional(),
  paymentMethod: z.enum(["cod", "vnpay", "ninepay"]),
})

type CheckoutFormData = z.infer<typeof checkoutSchema>

export function CheckoutPageContent() {
  const { items, totalPrice, clearCart } = useCart()
  const { language } = useLanguage()
  const { user } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [paymentProcessing, setPaymentProcessing] = useState(false)
  const [cartChecked, setCartChecked] = useState(false)

  // Mark cart as checked after initial render
  useEffect(() => {
    setCartChecked(true)
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue, // Thêm setValue
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: user?.email || "",
      fullName: "",
      phone: "",
      address: "",
      city: "",
      notes: "",
      paymentMethod: "cod",
    },
  })

  const selectedPaymentMethod = watch("paymentMethod")

  // We no longer need to redirect automatically
  // The empty cart UI will be shown instead

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true)
    try {
      // Format order items for email and payment
      const orderItems = items.map((item) => ({
        name: language === "vi" ? item.name.vi : item.name.en,
        price: item.salePrice || item.price,
        quantity: item.quantity,
        image: item.image,
        id: item.id,
      }))

      // Generate unique order ID
      const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`
      const orderInfo = language === "vi" ? `Thanh toán đơn hàng ${orderId}` : `Payment for order ${orderId}`
      const shippingAddress = `${data.address}, ${data.city}`

      // Handle different payment methods
      if (data.paymentMethod === "cod") {
        // Cash on delivery - send email directly
        await sendOrderConfirmationEmail({
          email: data.email,
          name: data.fullName,
          orderItems,
          totalAmount: totalPrice,
          shippingAddress,
          phoneNumber: data.phone,
          notes: data.notes || "",
          language,
        })

        // Clear cart and redirect to success page
        clearCart()
        router.push(`/payment-success?orderId=${orderId}`)
      } else {
        // Online payment - redirect to payment gateway
        setPaymentProcessing(true)

        try {
          const paymentData = {
            orderId,
            amount: totalPrice,
            orderInfo,
            customerEmail: data.email,
            customerName: data.fullName,
            customerPhone: data.phone,
            shippingAddress,
            items: orderItems,
            notes: data.notes || "",
          }

          // Call the appropriate payment API
          const endpoint = data.paymentMethod === "vnpay" ? "/api/payment/vnpay" : "/api/payment/ninepay"

          const response = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentData),
          })

          const result = await response.json()

          if (result.success && result.paymentUrl) {
            // Clear cart before redirecting
            clearCart()
            // Redirect to payment gateway
            window.location.href = result.paymentUrl
          } else {
            throw new Error(result.message || "Payment initialization failed")
          }
        } catch (paymentError) {
          console.error("Payment error:", paymentError)
          alert(
            language === "vi"
              ? "Có lỗi xảy ra khi khởi tạo thanh toán. Vui lòng thử lại sau."
              : "An error occurred while initializing payment. Please try again later."
          )
          setPaymentProcessing(false)
        }
      }
    } catch (error) {
      console.error("Failed to process order:", error)
      alert(
        language === "vi"
          ? "Có lỗi xảy ra khi xử lý đơn hàng. Vui lòng thử lại sau."
          : "An error occurred while processing your order. Please try again later.",
      )
    } finally {
      if (!paymentProcessing) {
        setIsSubmitting(false)
      }
    }
  }

  const formatCurrency = (amount: number) => {
    return language === "vi" ? `${amount.toLocaleString("vi-VN")}₫` : `$${(amount / 23000).toFixed(2)}`
  }

  // Only render if cart has items and we've checked the cart
  // This prevents flickering when redirecting
  if (cartChecked && items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <ShoppingCart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">{language === "vi" ? "Giỏ hàng trống" : "Your cart is empty"}</h2>
        <p className="text-gray-600 mb-6">
          {language === "vi" ? "Vui lòng thêm sản phẩm vào giỏ hàng để tiếp tục." : "Please add products to your cart to continue."}
        </p>
        <Button asChild className="bg-green-700 hover:bg-green-800">
          <Link href="/san-pham">
            {language === "vi" ? "Xem sản phẩm" : "View products"}
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Link href="/" className="flex items-center text-sm text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4 mr-1" />
          {language === "vi" ? "Quay lại trang chủ" : "Back to home"}
        </Link>
        <h1 className="text-2xl font-bold text-center flex-1">
          {language === "vi" ? "Thanh toán" : "Checkout"}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Order Summary */}
        <div className="md:col-span-1">
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2" />
              {language === "vi" ? "Tóm tắt đơn hàng" : "Order Summary"}
            </h2>

            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center">
                  <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden relative flex-shrink-0">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={language === "vi" ? item.name.vi : item.name.en}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium">{language === "vi" ? item.name.vi : item.name.en}</p>
                    <p className="text-sm text-gray-500">
                      {formatCurrency(item.salePrice || item.price)} x {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {formatCurrency((item.salePrice || item.price) * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-3">
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">{language === "vi" ? "Tổng tiền hàng:" : "Subtotal:"}</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">{language === "vi" ? "Phí vận chuyển:" : "Shipping:"}</span>
                <span>{language === "vi" ? "Miễn phí" : "Free"}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                <span>{language === "vi" ? "Tổng cộng:" : "Total:"}</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg border">
            <h2 className="text-xl font-bold mb-4">
              {language === "vi" ? "Thông tin đặt hàng" : "Checkout Information"}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="fullName">{language === "vi" ? "Họ và tên" : "Full Name"} *</Label>
                <Input id="fullName" {...register("fullName")} className={errors.fullName ? "border-red-500" : ""} />
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">
                    {language === "vi" ? "Vui lòng nhập họ tên" : errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="email">{language === "vi" ? "Email" : "Email"} *</Label>
                <Input id="email" type="email" {...register("email")} className={errors.email ? "border-red-500" : ""} />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {language === "vi" ? "Vui lòng nhập email hợp lệ" : errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">{language === "vi" ? "Số điện thoại" : "Phone Number"} *</Label>
                <Input id="phone" {...register("phone")} className={errors.phone ? "border-red-500" : ""} />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">
                    {language === "vi" ? "Vui lòng nhập số điện thoại hợp lệ" : errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="address">{language === "vi" ? "Địa chỉ" : "Address"} *</Label>
                <Input id="address" {...register("address")} className={errors.address ? "border-red-500" : ""} />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">
                    {language === "vi" ? "Vui lòng nhập địa chỉ" : errors.address.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="city">{language === "vi" ? "Thành phố" : "City"} *</Label>
                <Input id="city" {...register("city")} className={errors.city ? "border-red-500" : ""} />
                {errors.city && (
                  <p className="text-red-500 text-xs mt-1">
                    {language === "vi" ? "Vui lòng nhập thành phố" : errors.city.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="notes">{language === "vi" ? "Ghi chú" : "Notes"}</Label>
                <Textarea id="notes" {...register("notes")} rows={3} />
              </div>

              <div className="space-y-3">
                <Label>{language === "vi" ? "Phương thức thanh toán" : "Payment Method"} *</Label>

                <RadioGroup
                  defaultValue="cod"
                  className="grid grid-cols-1 gap-4 pt-2"
                  value={watch("paymentMethod")}
                  onValueChange={(value) => setValue("paymentMethod", value as "cod" | "vnpay" | "ninepay")}
                >
                  <div className={`flex items-center space-x-2 border rounded-md p-3 cursor-pointer transition-colors ${selectedPaymentMethod === "cod" ? "border-green-500 bg-green-50" : ""}`}>
                    <RadioGroupItem value="cod" id="payment-cod" />
                    <Label htmlFor="payment-cod" className="flex-1 cursor-pointer">
                      <div className="font-medium">{language === "vi" ? "Thanh toán khi nhận hàng (COD)" : "Cash on Delivery (COD)"}</div>
                      <div className="text-sm text-gray-500">{language === "vi" ? "Thanh toán bằng tiền mặt khi nhận hàng" : "Pay with cash when your order is delivered"}</div>
                    </Label>
                  </div>

                  <div className={`flex items-center space-x-2 border rounded-md p-3 cursor-pointer transition-colors ${selectedPaymentMethod === "vnpay" ? "border-green-500 bg-green-50" : ""}`}>
                    <RadioGroupItem value="vnpay" id="payment-vnpay" />
                    <Label htmlFor="payment-vnpay" className="flex-1 cursor-pointer">
                      <div className="font-medium flex items-center">
                        <span className="mr-2">{language === "vi" ? "Thanh toán qua VNPay" : "Pay with VNPay"}</span>
                      </div>
                      <div className="text-sm text-gray-500">{language === "vi" ? "Thanh toán an toàn với thẻ ATM, Visa, MasterCard, JCB, QR Code" : "Secure payment with ATM, Visa, MasterCard, JCB, QR Code"}</div>
                    </Label>
                  </div>

                  <div className={`flex items-center space-x-2 border rounded-md p-3 cursor-pointer transition-colors ${selectedPaymentMethod === "ninepay" ? "border-green-500 bg-green-50" : ""}`}>
                    <RadioGroupItem value="ninepay" id="payment-ninepay" />
                    <Label htmlFor="payment-ninepay" className="flex-1 cursor-pointer">
                      <div className="font-medium flex items-center">
                        <span className="mr-2">{language === "vi" ? "Thanh toán qua 9Pay" : "Pay with 9Pay"}</span>
                      </div>
                      <div className="text-sm text-gray-500">{language === "vi" ? "Thanh toán qua ví điện tử, thẻ ngân hàng" : "Pay with e-wallet, bank cards"}</div>
                    </Label>
                  </div>
                </RadioGroup>

                {errors.paymentMethod && (
                  <p className="text-red-500 text-xs mt-1">
                    {language === "vi" ? "Vui lòng chọn phương thức thanh toán" : "Please select a payment method"}
                  </p>
                )}
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full bg-green-700 hover:bg-green-800"
                  disabled={isSubmitting || paymentProcessing}
                >
                  {isSubmitting || paymentProcessing ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {language === "vi" ? "Đang xử lý..." : "Processing..."}
                    </span>
                  ) : (
                    <span>
                      {selectedPaymentMethod === "cod"
                        ? (language === "vi" ? "Xác nhận đặt hàng" : "Confirm Order")
                        : (language === "vi" ? "Tiến hành thanh toán" : "Proceed to Payment")}
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}


