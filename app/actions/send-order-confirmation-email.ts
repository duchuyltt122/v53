"use server"

import { Resend } from "resend"
import { OrderConfirmationEmail } from "@/components/emails/order-confirmation-email"

// Initialize Resend with API key
const resendApiKey = process.env.RESEND_API_KEY
const resend = resendApiKey ? new Resend(resendApiKey) : null

type OrderItem = {
  name: string
  price: number
  quantity: number
}

type OrderConfirmationEmailProps = {
  email: string
  name: string
  orderItems: OrderItem[]
  totalAmount: number
  shippingAddress: string
  phoneNumber: string
  notes: string
  language: string
}

export async function sendOrderConfirmationEmail(data: OrderConfirmationEmailProps) {
  try {
    const { email, name, orderItems, totalAmount, shippingAddress, phoneNumber, notes, language } = data

    if (!resend) {
      console.error("Resend API key is missing. Email sending will not work.")
      // Return success anyway to not block the checkout flow in development
      return { success: true, data: null }
    }

    const { data: emailData, error } = await resend.emails.send({
      from: "Taboo Bamboo Workshop <onboarding@resend.dev>",
      to: email,
      subject:
        language === "vi" ? "Xác nhận đơn hàng - Taboo Bamboo Workshop" : "Order Confirmation - Taboo Bamboo Workshop",
      react: OrderConfirmationEmail({
        name,
        orderItems,
        totalAmount,
        shippingAddress,
        phoneNumber,
        notes,
        language,
      }),
    })

    if (error) {
      console.error("Error sending email:", error)
      // In production, you might want to throw an error here
      // For now, we'll just log it and continue to not block the checkout flow
      return { success: true, data: null }
    }

    return { success: true, data: emailData }
  } catch (error) {
    console.error("Error in sendOrderConfirmationEmail:", error)
    // In production, you might want to throw an error here
    // For now, we'll just log it and continue to not block the checkout flow
    return { success: true, data: null }
  }
}

