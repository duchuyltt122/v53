import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProviderWrapper } from "@/contexts/language-context-wrapper"
import { AuthProvider } from "@/contexts/auth-context"
import { CartProvider } from "@/contexts/cart-context"
import { ShoppingCart } from "@/components/shopping-cart"

// Tối ưu font loading
const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Đảm bảo text hiển thị ngay cả khi font chưa tải xong
  preload: true,
})

export const metadata: Metadata = {
  title: "Taboo Bamboo Workshop",
  description: "Nghệ thuật thủ công tre truyền thống tại Hội An",
  metadataBase: new URL("https://taboo-bamboo.vercel.app"),
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <LanguageProviderWrapper>
            <CartProvider>
              {children}
              <ShoppingCart />
            </CartProvider>
          </LanguageProviderWrapper>
        </AuthProvider>
      </body>
    </html>
  )
}