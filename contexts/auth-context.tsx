"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { Session, User } from "@supabase/supabase-js"
import { getSupabaseClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"

type AuthContextType = {
  user: User | null
  session: Session | null
  isLoading: boolean
  signIn: (
    email: string,
    password: string,
  ) => Promise<{
    error: Error | null
    success: boolean
  }>
  signUp: (
    email: string,
    password: string,
  ) => Promise<{
    error: Error | null
    success: boolean
  }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{
    error: Error | null
    success: boolean
  }>
}

// Create a default value for the context
const defaultAuthContext: AuthContextType = {
  user: null,
  session: null,
  isLoading: true,
  signIn: async () => ({ error: new Error("Auth context not initialized"), success: false }),
  signUp: async () => ({ error: new Error("Auth context not initialized"), success: false }),
  signOut: async () => {
    console.error("Auth context not initialized")
  },
  resetPassword: async () => ({ error: new Error("Auth context not initialized"), success: false }),
}

const AuthContext = createContext<AuthContextType>(defaultAuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Kiểm tra session hiện tại khi component được mount
    const getSession = async () => {
      setIsLoading(true)
      try {
        // Wrap in try-catch to handle potential errors with Supabase client
        try {
          const supabase = getSupabaseClient()
          const { data, error } = await supabase.auth.getSession()
          if (error) {
            throw error
          }
          setSession(data.session)
          setUser(data.session?.user || null)
        } catch (clientError) {
          console.error("Error with Supabase client:", clientError)
        }
      } catch (error) {
        console.error("Error getting session:", error)
      } finally {
        setIsLoading(false)
      }
    }

    getSession()

    // Thiết lập listener cho các thay đổi auth
    let authListener: { subscription: { unsubscribe: () => void } } | undefined

    try {
      const supabase = getSupabaseClient()
      const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
        setSession(session)
        setUser(session?.user || null)
        setIsLoading(false)
      })
      authListener = listener
    } catch (error) {
      console.error("Error setting up auth listener:", error)
    }

    return () => {
      if (authListener) {
        authListener.subscription.unsubscribe()
      }
    }
  }, [])

  // Đăng nhập với email và password
  const signIn = async (email: string, password: string) => {
    try {
      const supabase = getSupabaseClient()
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      return { error: null, success: true }
    } catch (error) {
      console.error("Error signing in:", error)
      return { error: error as Error, success: false }
    }
  }

  // Đăng ký với email và password
  const signUp = async (email: string, password: string) => {
    try {
      const supabase = getSupabaseClient()
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) throw error
      return { error: null, success: true }
    } catch (error) {
      console.error("Error signing up:", error)
      return { error: error as Error, success: false }
    }
  }

  // Đăng xuất
  const signOut = async () => {
    try {
      const supabase = getSupabaseClient()
      await supabase.auth.signOut()
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  // Đặt lại mật khẩu
  const resetPassword = async (email: string) => {
    try {
      const supabase = getSupabaseClient()
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      if (error) throw error
      return { error: null, success: true }
    } catch (error) {
      console.error("Error resetting password:", error)
      return { error: error as Error, success: false }
    }
  }

  const value = {
    user,
    session,
    isLoading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

