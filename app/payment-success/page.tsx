import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import TopBar from "@/components/top-bar"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { LanguageProvider } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Thanh toán thành công - Taboo Bamboo Workshop",
  description: "Thanh toán đơn hàng thành công tại Taboo Bamboo Workshop",
}

export default function PaymentSuccessPage({ searchParams }: { searchParams: { orderId: string } }) {
  const orderId = searchParams.orderId || '';

  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen">
        {/* Top Bar */}
        <TopBar />

        {/* Header & Navigation */}
        <Header />

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Thanh toán thành công</h1>
              
              <p className="text-gray-600 mb-6">
                Cảm ơn bạn đã đặt hàng tại Taboo Bamboo Workshop. Chúng tôi đã gửi email xác nhận đơn hàng đến địa chỉ email của bạn.
              </p>
              
              {orderId && (
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <p className="text-gray-700">Mã đơn hàng: <span className="font-semibold">{orderId}</span></p>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-green-700 hover:bg-green-800">
                  <Link href="/">
                    Quay lại trang chủ
                  </Link>
                </Button>
                
                <Button asChild variant="outline">
                  <Link href="/san-pham">
                    Tiếp tục mua sắm
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </LanguageProvider>
  )
}
