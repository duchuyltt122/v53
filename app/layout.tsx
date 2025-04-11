import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./critical.css"
import "./globals.css"
import { LanguageProviderWrapper } from "@/contexts/language-context-wrapper"
import { AuthProvider } from "@/contexts/auth-context"
import { CartProvider } from "@/contexts/cart-context"
import { DynamicShoppingCart } from "@/components/dynamic-imports"
import { OptimizedScripts } from "@/components/optimized-scripts"
import { PreloadResources } from "@/components/preload-resources"
import { ServiceWorkerRegistration } from "@/components/service-worker-registration"

// Tối ưu font loading
const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap", // Đảm bảo text hiển thị ngay cả khi font chưa tải xong
  preload: true,
  fallback: ["system-ui", "Arial", "sans-serif"], // Fallback fonts
  adjustFontFallback: true, // Điều chỉnh font fallback để giảm layout shift
  variable: "--font-inter", // Sử dụng CSS variable
})

export const metadata: Metadata = {
  title: "Taboo Bamboo Workshop",
  description: "Nghệ thuật thủ công tre truyền thống tại Hội An",
  metadataBase: new URL("https://taboo-bamboo.vercel.app"),
  generator: 'v0.dev',
  keywords: ["bamboo", "workshop", "handcraft", "Hoi An", "Vietnam", "traditional craft"],
  authors: [{ name: "Taboo Bamboo Workshop" }],
  creator: "Taboo Bamboo Workshop",
  publisher: "Taboo Bamboo Workshop",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#ffffff" }, { media: "(prefers-color-scheme: dark)", color: "#111111" }],
  category: "handicraft",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#ffffff",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://ipaionbpmtgtfmlkkaer.supabase.co" />
        <link rel="dns-prefetch" href="https://ipaionbpmtgtfmlkkaer.supabase.co" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Taboo Bamboo" />
        <link rel="apple-touch-icon" href="https://ipaionbpmtgtfmlkkaer.supabase.co/storage/v1/object/public/taboo-img/icon-192x192.png" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <LanguageProviderWrapper>
            <CartProvider>
              {children}
              <DynamicShoppingCart />
              <PreloadResources />
              <OptimizedScripts />
              <ServiceWorkerRegistration />
            </CartProvider>
          </LanguageProviderWrapper>
        </AuthProvider>
      </body>
    </html>
  )
}
