import type { Metadata } from "next"
import { Suspense } from "react"
import TopBar from "@/components/top-bar"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductsContent from "@/components/products-content"
import { LanguageProvider } from "@/contexts/language-context"

export const metadata: Metadata = {
  title: "Taboo Bamboo Workshop - Sản phẩm",
  description: "Khám phá các sản phẩm thủ công từ tre của Taboo Bamboo Workshop",
}

export default function ProductsPage() {
  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen">
        {/* Top Bar */}
        <TopBar />

        {/* Header & Navigation */}
        <Header />

        {/* Main Content - Tách thành client component riêng */}
        <Suspense fallback={<ProductsLoading />}>
          <ProductsContent />
        </Suspense>

        {/* Footer */}
        <Footer />

        {/* Chat Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <button className="bg-green-600 hover:bg-green-700 text-white rounded-full p-3 shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </button>
        </div>
      </div>
    </LanguageProvider>
  )
}

// Loading component cho trang sản phẩm
function ProductsLoading() {
  return (
    <div className="py-4 md:py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Sidebar skeleton */}
          <div className="hidden md:block w-full md:w-1/4">
            <div className="bg-gray-50 p-4 rounded mb-6 h-64 animate-pulse"></div>
            <div className="bg-gray-50 p-4 rounded mb-6 h-80 animate-pulse"></div>
          </div>

          {/* Products skeleton */}
          <div className="w-full md:w-3/4">
            <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-200">
              <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-60 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="border border-gray-200 rounded overflow-hidden animate-pulse">
                  <div className="h-36 sm:h-40 md:h-48 bg-gray-200"></div>
                  <div className="p-2 sm:p-3 space-y-2">
                    <div className="h-2 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-6 bg-gray-200 rounded w-12"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

