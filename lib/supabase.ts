import { createClient } from "@supabase/supabase-js"
import { cache } from "react"

// Create a singleton instance for the Supabase client
let supabaseInstance: ReturnType<typeof createClient> | null = null

// Initialize the Supabase client with React cache for better performance
export const getSupabaseClient = cache(function getSupabaseClientInternal() {
  if (supabaseInstance) return supabaseInstance

  // Sử dụng URL và API key cố định nếu không có biến môi trường
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ipaionbpmtgtfmlkkaer.supabase.co"
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwYWlvbmJwbXRndGZtbGtrYWVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4OTEyNTcsImV4cCI6MjA1ODQ2NzI1N30._MfrbZn9evsd6HXu0tbYExzG7B3yeXIzWY-qaffGr9g"

  console.log('Supabase URL:', supabaseUrl);
  console.log('Supabase Key:', supabaseAnonKey ? 'Available' : 'Not available');

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase environment variables are missing and fallbacks failed.")
    throw new Error(
      "Supabase client is not initialized. Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables are set."
    )
  }

  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: typeof window !== "undefined", // Only persist session on client-side
    },
    global: {
      fetch: (...args) => {
        // Tối ưu hóa fetch request
        const [url, config] = args
        return fetch(url as string, {
          ...config as RequestInit,
          // Thêm cache control headers
          headers: {
            ...((config as RequestInit)?.headers || {}),
            'Cache-Control': 'no-store, max-age=0',
          },
        })
      },
    },
  })

  return supabaseInstance
})

// For backward compatibility
export const supabase = typeof window !== "undefined" ? getSupabaseClient() : null

