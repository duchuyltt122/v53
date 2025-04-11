import { createClient } from "@supabase/supabase-js"

// Create a singleton instance for the Supabase client
let supabaseInstance: ReturnType<typeof createClient> | null = null

// Initialize the Supabase client
export function getSupabaseClient() {
  if (supabaseInstance) return supabaseInstance

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase environment variables are missing. Authentication will not work.")
    throw new Error(
      "Supabase client is not initialized. Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables are set."
    )
  }

  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: typeof window !== "undefined", // Only persist session on client-side
    },
  })

  return supabaseInstance
}

// For backward compatibility
export const supabase = typeof window !== "undefined" ? getSupabaseClient() : null

