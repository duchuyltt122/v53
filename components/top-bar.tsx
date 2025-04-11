"use client"

import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"
import LanguageSwitcher from "./language-switcher"
import { useLanguage } from "@/contexts/language-context"
import UserMenu from "./user-menu"
import { ErrorBoundary } from "@/components/error-boundary"

export default function TopBar() {
  // Call hooks at the top level of the component
  const { language } = useLanguage()

  return (
    <div className="bg-green-700 py-2 border-b border-green-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4 text-xs text-white mb-2 md:mb-0">
            <div className="flex items-center">
              <Phone className="h-3 w-3 mr-1" />
              <span>0905312812</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-3 w-3 mr-1" />
              <span>contact@tabooworkshop.com</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
              <Link href="/lien-he" className="hover:text-orange-200">
                <span>
                  {language === "vi"
                    ? "Thôn Thanh Tam Đông, Xã Cẩm Thanh, Thành Phố Hội An, Tỉnh Quảng Nam"
                    : "Thanh Tam Dong Village, Cam Thanh Commune, Hoi An City, Quang Nam Province"}
                </span>
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <LanguageSwitcher />
            <ErrorBoundary
              fallback={
                <Link href="/dang-nhap" className="text-xs text-white hover:text-orange-200">
                  Đăng nhập
                </Link>
              }
            >
              <UserMenu />
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  )
}

