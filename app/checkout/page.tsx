import type { Metadata } from "next"
import TopBar from "@/components/top-bar"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { LanguageProvider } from "@/contexts/language-context"
import { CheckoutPageContent } from "@/components/checkout-page-content"

export const metadata: Metadata = {
  title: "Thanh toán - Taboo Bamboo Workshop",
  description: "Thanh toán đơn hàng tại Taboo Bamboo Workshop",
}

export default function CheckoutPage() {
  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen">
        {/* Top Bar */}
        <TopBar />

        {/* Header & Navigation */}
        <Header />

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-8">
          <CheckoutPageContent />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </LanguageProvider>
  )
}
