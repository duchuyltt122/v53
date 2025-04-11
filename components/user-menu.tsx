"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, LogOut, Settings, Calendar, ChevronDown } from "lucide-react"

export default function UserMenu() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [authReady, setAuthReady] = useState(false)
  const authContext = useAuth()
  const { signOut } = authContext || {}
  const [language, setLanguage] = useState("vi")
  const languageContext = useLanguage()

  useEffect(() => {
    if (authContext) {
      setUser(authContext.user)
      setAuthReady(true)
    } else {
      setAuthReady(true) // Set to true even if authContext is null to avoid infinite loop
    }
  }, [authContext])

  useEffect(() => {
    if (languageContext) {
      setLanguage(languageContext.language || "vi")
    }
  }, [languageContext])

  const handleSignOut = async () => {
    if (signOut) {
      await signOut()
      setIsOpen(false)
    }
  }

  const handleLogin = () => {
    router.push("/dang-nhap")
  }

  if (!authReady) {
    return null // Or a loading indicator
  }

  if (!user) {
    return (
      <Button onClick={handleLogin} variant="outline" size="sm" className="text-xs h-8">
        <User className="h-3.5 w-3.5 mr-1.5" />
        {language === "vi" ? "Đăng nhập" : "Login"}
      </Button>
    )
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs h-8 flex items-center">
          <User className="h-3.5 w-3.5 mr-1.5" />
          <span className="max-w-[100px] truncate">{user.email?.split("@")[0]}</span>
          <ChevronDown className="h-3.5 w-3.5 ml-1.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem asChild>
          <Link href="/tai-khoan" className="flex items-center cursor-pointer">
            <User className="h-4 w-4 mr-2" />
            {language === "vi" ? "Tài khoản" : "Account"}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/lich-su-dat-workshop" className="flex items-center cursor-pointer">
            <Calendar className="h-4 w-4 mr-2" />
            {language === "vi" ? "Lịch sử đặt workshop" : "Workshop history"}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/cai-dat" className="flex items-center cursor-pointer">
            <Settings className="h-4 w-4 mr-2" />
            {language === "vi" ? "Cài đặt" : "Settings"}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleSignOut}
          className="flex items-center cursor-pointer text-red-600 focus:text-red-600"
        >
          <LogOut className="h-4 w-4 mr-2" />
          {language === "vi" ? "Đăng xuất" : "Logout"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

