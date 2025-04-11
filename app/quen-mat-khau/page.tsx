"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Loader2, CheckCircle } from "lucide-react"

export default function ForgotPasswordPage() {
  const { language } = useLanguage()
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    setSuccess(false)

    try {
      const { error, success } = await resetPassword(email)

      if (success) {
        setSuccess(true)
      } else if (error) {
        setError(
          language === "vi"
            ? "Không thể gửi email đặt lại mật khẩu. Vui lòng kiểm tra email của bạn."
            : "Unable to send password reset email. Please check your email.",
        )
      }
    } catch (error) {
      setError(
        language === "vi" ? "Đã xảy ra lỗi. Vui lòng thử lại sau." : "An error occurred. Please try again later.",
      )
    } finally {
      setIsLoading(false)
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
                <BreadcrumbLink href="/dang-nhap" className="text-xs text-gray-500 hover:text-green-700">
                  {language === "vi" ? "Đăng nhập" : "Login"}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-xs text-gray-400">/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink href="/quen-mat-khau" className="text-xs text-green-700 font-medium">
                  {language === "vi" ? "Quên mật khẩu" : "Forgot Password"}
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
              {language === "vi" ? "Quên mật khẩu" : "Forgot Password"}
            </h1>

            {success ? (
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <h2 className="text-xl font-medium mb-2">
                  {language === "vi" ? "Email đã được gửi!" : "Email has been sent!"}
                </h2>
                <p className="text-gray-600 mb-6">
                  {language === "vi"
                    ? `Chúng tôi đã gửi email đặt lại mật khẩu đến ${email}. Vui lòng kiểm tra hộp thư của bạn và làm theo hướng dẫn.`
                    : `We've sent a password reset email to ${email}. Please check your inbox and follow the instructions.`}
                </p>
                <div className="flex justify-center">
                  <Link href="/dang-nhap">
                    <Button variant="outline">{language === "vi" ? "Quay lại đăng nhập" : "Back to login"}</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <p className="text-gray-600 mb-6">
                  {language === "vi"
                    ? "Nhập địa chỉ email của bạn và chúng tôi sẽ gửi cho bạn một liên kết để đặt lại mật khẩu."
                    : "Enter your email address and we'll send you a link to reset your password."}
                </p>

                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder={language === "vi" ? "Nhập email của bạn" : "Enter your email"}
                    />
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded">{error}</div>
                  )}

                  <Button type="submit" className="w-full bg-green-700 hover:bg-green-800" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {language === "vi" ? "Đang xử lý..." : "Processing..."}
                      </>
                    ) : language === "vi" ? (
                      "Gửi liên kết đặt lại"
                    ) : (
                      "Send reset link"
                    )}
                  </Button>

                  <div className="text-center mt-4">
                    <Link href="/dang-nhap" className="text-sm text-green-700 hover:underline">
                      {language === "vi" ? "Quay lại đăng nhập" : "Back to login"}
                    </Link>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

