"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TopBar from "@/components/top-bar"
import Header from "@/components/header"
import Footer from "@/components/footer"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
  const { language, t } = useLanguage()
  const { signIn, signUp } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("login")

  // Login state
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [loginError, setLoginError] = useState<string | null>(null)
  const [isLoginLoading, setIsLoginLoading] = useState(false)

  // Register state
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("")
  const [registerError, setRegisterError] = useState<string | null>(null)
  const [isRegisterLoading, setIsRegisterLoading] = useState(false)
  const [registerSuccess, setRegisterSuccess] = useState(false)

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError(null)
    setIsLoginLoading(true)

    try {
      const { error, success } = await signIn(loginEmail, loginPassword)

      if (success) {
        router.push("/")
      } else if (error) {
        setLoginError(
          language === "vi"
            ? "Email hoặc mật khẩu không đúng. Vui lòng thử lại."
            : "Invalid email or password. Please try again.",
        )
      }
    } catch (error) {
      setLoginError(
        language === "vi" ? "Đã xảy ra lỗi. Vui lòng thử lại sau." : "An error occurred. Please try again later.",
      )
    } finally {
      setIsLoginLoading(false)
    }
  }

  // Handle register
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setRegisterError(null)
    setIsRegisterLoading(true)
    setRegisterSuccess(false)

    // Validate passwords match
    if (registerPassword !== registerConfirmPassword) {
      setRegisterError(language === "vi" ? "Mật khẩu xác nhận không khớp." : "Confirm password doesn't match.")
      setIsRegisterLoading(false)
      return
    }

    try {
      const { error, success } = await signUp(registerEmail, registerPassword)

      if (success) {
        setRegisterSuccess(true)
        // Clear form
        setRegisterEmail("")
        setRegisterPassword("")
        setRegisterConfirmPassword("")
      } else if (error) {
        setRegisterError(
          language === "vi"
            ? "Không thể đăng ký. Email có thể đã được sử dụng."
            : "Unable to register. Email may already be in use.",
        )
      }
    } catch (error) {
      setRegisterError(
        language === "vi" ? "Đã xảy ra lỗi. Vui lòng thử lại sau." : "An error occurred. Please try again later.",
      )
    } finally {
      setIsRegisterLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto py-3 px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-xs text-gray-500 hover:text-green-700">
                  {language === "vi" ? "Trang chủ" : "Home"}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-xs text-gray-400">/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dang-nhap" className="text-xs text-green-700 font-medium">
                  {language === "vi" ? "Đăng nhập / Đăng ký" : "Login / Register"}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md border">
            <h1 className="text-2xl font-bold text-center mb-6">
              {language === "vi" ? "Đăng nhập / Đăng ký" : "Login / Register"}
            </h1>

            <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">{language === "vi" ? "Đăng nhập" : "Login"}</TabsTrigger>
                <TabsTrigger value="register">{language === "vi" ? "Đăng ký" : "Register"}</TabsTrigger>
              </TabsList>

              {/* Login Form */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                      placeholder={language === "vi" ? "Nhập email của bạn" : "Enter your email"}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="password">{language === "vi" ? "Mật khẩu" : "Password"}</Label>
                      <Link href="/quen-mat-khau" className="text-xs text-green-700 hover:underline">
                        {language === "vi" ? "Quên mật khẩu?" : "Forgot password?"}
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                      placeholder={language === "vi" ? "Nhập mật khẩu" : "Enter your password"}
                    />
                  </div>

                  {loginError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded">{loginError}</div>
                  )}

                  <Button type="submit" className="w-full bg-green-700 hover:bg-green-800" disabled={isLoginLoading}>
                    {isLoginLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {language === "vi" ? "Đang xử lý..." : "Processing..."}
                      </>
                    ) : language === "vi" ? (
                      "Đăng nhập"
                    ) : (
                      "Login"
                    )}
                  </Button>
                </form>
              </TabsContent>

              {/* Register Form */}
              <TabsContent value="register">
                {registerSuccess ? (
                  <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded mb-4">
                    {language === "vi"
                      ? "Đăng ký thành công! Vui lòng kiểm tra email của bạn để xác nhận tài khoản."
                      : "Registration successful! Please check your email to confirm your account."}
                  </div>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input
                        id="register-email"
                        type="email"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        required
                        placeholder={language === "vi" ? "Nhập email của bạn" : "Enter your email"}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-password">{language === "vi" ? "Mật khẩu" : "Password"}</Label>
                      <Input
                        id="register-password"
                        type="password"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        required
                        placeholder={language === "vi" ? "Nhập mật khẩu" : "Enter your password"}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-confirm-password">
                        {language === "vi" ? "Xác nhận mật khẩu" : "Confirm password"}
                      </Label>
                      <Input
                        id="register-confirm-password"
                        type="password"
                        value={registerConfirmPassword}
                        onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                        required
                        placeholder={language === "vi" ? "Nhập lại mật khẩu" : "Confirm your password"}
                      />
                    </div>

                    {registerError && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded">
                        {registerError}
                      </div>
                    )}

                    <Button
                      type="submit"
                      className="w-full bg-green-700 hover:bg-green-800"
                      disabled={isRegisterLoading}
                    >
                      {isRegisterLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {language === "vi" ? "Đang xử lý..." : "Processing..."}
                        </>
                      ) : language === "vi" ? (
                        "Đăng ký"
                      ) : (
                        "Register"
                      )}
                    </Button>
                  </form>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

