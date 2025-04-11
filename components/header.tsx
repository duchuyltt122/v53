"use client"

import Link from "next/link"
import Image from "next/image"
import { Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/contexts/language-context"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { CartIcon } from "@/components/cart-icon"

export default function Header() {
  const { t } = useLanguage()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="bg-white py-2 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="https://ipaionbpmtgtfmlkkaer.supabase.co/storage/v1/object/public/taboo-img//logo.png"
              alt="Taboo Logo"
              width={120}
              height={50}
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 text-sm">
            <Link
              href="/"
              className={`font-medium ${isActive("/") ? "text-green-700 border-b-2 border-green-700" : "hover:text-green-700"}`}
            >
              {t("nav.home")}
            </Link>
            <Link
              href="/gioi-thieu"
              className={`font-medium ${isActive("/gioi-thieu") ? "text-green-700 border-b-2 border-green-700" : "hover:text-green-700"}`}
            >
              {t("nav.about")}
            </Link>
            <Link
              href="/san-pham"
              className={`font-medium ${isActive("/san-pham") ? "text-green-700 border-b-2 border-green-700" : "hover:text-green-700"}`}
            >
              {t("nav.products")}
            </Link>
            <Link
              href="/tin-tuc"
              className={`font-medium ${isActive("/tin-tuc") ? "text-green-700 border-b-2 border-green-700" : "hover:text-green-700"}`}
            >
              {t("nav.news")}
            </Link>
            <Link
              href="/calendar"
              className={`font-medium ${isActive("/calendar") ? "text-green-700 border-b-2 border-green-700" : "hover:text-green-700"}`}
            >
              {t("nav.calendar")}
            </Link>
            <Link
              href="/lien-he"
              className={`font-medium ${isActive("/lien-he") ? "text-green-700 border-b-2 border-green-700" : "hover:text-green-700"}`}
            >
              {t("nav.contact")}
            </Link>
          </nav>

          {/* Desktop Search and Cart */}
          <div className="hidden md:flex items-center space-x-2">
            <div className="relative">
              <Input
                type="text"
                placeholder={t("search.placeholder")}
                className="w-40 h-8 text-sm rounded-sm pl-2 pr-8 border-gray-300"
              />
              <Search className="h-4 w-4 absolute right-2 top-2 text-gray-400" />
            </div>
            <Button className="bg-green-700 hover:bg-green-800 h-8 text-xs rounded-sm">{t("search.button")}</Button>
            <CartIcon />
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center space-x-3">
            <CartIcon />
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-1 rounded-full hover:bg-gray-100">
              <Search className="h-5 w-5 text-gray-600" />
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-1 rounded-full hover:bg-gray-100">
              {isMenuOpen ? <X className="h-5 w-5 text-gray-600" /> : <Menu className="h-5 w-5 text-gray-600" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden pt-2 pb-1">
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder={t("search.placeholder")}
                className="w-full h-8 text-sm rounded-sm pl-2 pr-8 border-gray-300"
              />
              <Button className="bg-green-700 hover:bg-green-800 h-8 text-xs rounded-sm whitespace-nowrap">
                {t("search.button")}
              </Button>
            </div>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <nav className="md:hidden pt-2 pb-1 border-t border-gray-200 mt-2">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className={`block py-1 ${isActive("/") ? "text-green-700 font-medium" : "text-gray-700"}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/gioi-thieu"
                  className={`block py-1 ${isActive("/gioi-thieu") ? "text-green-700 font-medium" : "text-gray-700"}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/san-pham"
                  className={`block py-1 ${isActive("/san-pham") ? "text-green-700 font-medium" : "text-gray-700"}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("nav.products")}
                </Link>
              </li>
              <li>
                <Link
                  href="/tin-tuc"
                  className={`block py-1 ${isActive("/tin-tuc") ? "text-green-700 font-medium" : "text-gray-700"}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("nav.news")}
                </Link>
              </li>
              <li>
                <Link
                  href="/calendar"
                  className={`block py-1 ${isActive("/calendar") ? "text-green-700 font-medium" : "text-gray-700"}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("nav.calendar")}
                </Link>
              </li>
              <li>
                <Link
                  href="/lien-he"
                  className={`block py-1 ${isActive("/lien-he") ? "text-green-700 font-medium" : "text-gray-700"}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}

