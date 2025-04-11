"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"
import { Loader2 } from "lucide-react"

// Dynamic import for ShoppingCart
export const DynamicShoppingCart = dynamic(
  () => import("@/components/shopping-cart").then((mod) => mod.ShoppingCart),
  {
    loading: () => (
      <div className="fixed bottom-4 right-4 z-50 p-2 bg-white rounded-full shadow-md">
        <Loader2 className="h-6 w-6 animate-spin text-green-700" />
      </div>
    ),
    ssr: false, // Disable server-side rendering
  }
)

// Dynamic import for CheckoutPageContent
export const DynamicCheckoutPageContent = dynamic(
  () => import("@/components/checkout-page-content").then((mod) => mod.CheckoutPageContent),
  {
    loading: () => (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-green-700" />
      </div>
    ),
  }
)

// Dynamic import for Footer (low priority)
export const DynamicFooter = dynamic(() => import("@/components/footer"), {
  loading: () => <div className="h-40 bg-gray-50"></div>,
})

// Create a wrapper for Suspense boundary
export function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[200px]">
          <Loader2 className="h-8 w-8 animate-spin text-green-700" />
        </div>
      }
    >
      {children}
    </Suspense>
  )
}
