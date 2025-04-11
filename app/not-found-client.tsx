"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export default function NotFoundClient() {
  const { language } = useLanguage()

  const translations = {
    vi: {
      title: "Không tìm thấy trang",
      description: "Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.",
      backHome: "Quay lại trang chủ",
    },
    en: {
      title: "Page Not Found",
      description: "The page you are looking for does not exist or has been moved.",
      backHome: "Back to Home",
    },
  }

  const t = translations[language]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">{t.title}</h2>
        <p className="text-lg text-gray-600 mb-8">{t.description}</p>
        <Link
          href="/"
          className="px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors"
        >
          {t.backHome}
        </Link>
      </div>
    </div>
  )
}

