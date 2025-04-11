import type { Metadata } from "next"
import Link from "next/link"
import { XCircle } from "lucide-react"
import TopBar from "@/components/top-bar"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { LanguageProvider } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Thanh toán thất bại - Taboo Bamboo Workshop",
  description: "Thanh toán đơn hàng thất bại tại Taboo Bamboo Workshop",
}

// Map error codes to messages
const errorMessages: Record<string, string> = {
  'invalid-signature': 'Dữ liệu thanh toán không hợp lệ.',
  'order-not-found': 'Không tìm thấy thông tin đơn hàng.',
  'update-failed': 'Không thể cập nhật trạng thái đơn hàng.',
  'server-error': 'Đã xảy ra lỗi trong quá trình xử lý thanh toán.',
  '24': 'Giao dịch không thành công do: Khách hàng hủy giao dịch.',
  '51': 'Giao dịch không thành công do: Tài khoản không đủ số dư để thực hiện giao dịch.',
  '65': 'Giao dịch không thành công do: Tài khoản vượt quá hạn mức giao dịch trong ngày.',
  '75': 'Ngân hàng thanh toán đang bảo trì.',
  '99': 'Lỗi không xác định.',
  'default': 'Thanh toán không thành công. Vui lòng thử lại sau hoặc chọn phương thức thanh toán khác.'
};

export default function PaymentFailedPage({ searchParams }: { searchParams: { code?: string, reason?: string } }) {
  const errorCode = searchParams.code || searchParams.reason || 'default';
  const errorMessage = errorMessages[errorCode] || errorMessages.default;

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
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <XCircle className="w-10 h-10 text-red-600" />
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Thanh toán thất bại</h1>
              
              <p className="text-gray-600 mb-6">
                {errorMessage}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-green-700 hover:bg-green-800">
                  <Link href="/checkout">
                    Thử lại
                  </Link>
                </Button>
                
                <Button asChild variant="outline">
                  <Link href="/">
                    Quay lại trang chủ
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
