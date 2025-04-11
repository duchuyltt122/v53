"use client"

import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setLanguage("vi")}
        className={`w-8 h-6 relative overflow-hidden rounded-sm ${
          language === "vi" ? "ring-2 ring-white ring-opacity-70" : "opacity-70 hover:opacity-100"
        }`}
        aria-label="Switch to Vietnamese"
        title="Tiếng Việt"
      >
        <Image
          src="https://ipaionbpmtgtfmlkkaer.supabase.co/storage/v1/object/public/taboo-img//viet_flag.png"
          alt="Tiếng Việt"
          fill
          className="object-cover"
        />
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={`w-8 h-6 relative overflow-hidden rounded-sm ${
          language === "en" ? "ring-2 ring-white ring-opacity-70" : "opacity-70 hover:opacity-100"
        }`}
        aria-label="Switch to English"
        title="English"
      >
        <Image
          src="https://ipaionbpmtgtfmlkkaer.supabase.co/storage/v1/object/public/taboo-img//eng_flag.png"
          alt="English"
          fill
          className="object-cover"
        />
      </button>
    </div>
  )
}

