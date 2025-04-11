"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  const { language } = useLanguage()

  const translations = {
    vi: {
      title: "Đã xảy ra lỗi",
      description: "Đã có lỗi xảy ra khi tải trang này.",
      tryAgain: "Thử lại",
      backHome: "Quay lại trang chủ",
    },
    en: {
      title: "Something went wrong",
      description: "An error occurred while loading this page.",
      tryAgain: "Try again",
      backHome: "Back to Home",
    },
  }

  const t = translations[language]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">{t.title}</h2>
        <p className="text-lg text-gray-600 mb-8">{t.description}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors"
          >
            {t.tryAgain}
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 transition-colors"
          >
            {t.backHome}
          </Link>
        </div>
      </div>
    </div>
  )
}

