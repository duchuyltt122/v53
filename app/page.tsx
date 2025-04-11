import type { Metadata } from "next"
import TopBar from "@/components/top-bar"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { LanguageProvider } from "@/contexts/language-context"

export const metadata: Metadata = {
  title: "Taboo Bamboo Workshop - Trang chủ",
  description: "Nghệ thuật thủ công tre truyền thống tại Hội An",
}

// Tách phần client component ra khỏi page component
import HomeContent from "@/components/home-content"

export default function Home() {
  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen">
        {/* Top Bar */}
        <TopBar />

        {/* Header & Navigation */}
        <Header />

        {/* Main Content - Tách thành client component riêng */}
        <HomeContent />

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

