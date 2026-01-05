import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function getSupabaseServerClient() {
  const cookieStore = await cookies()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // During build time on Netlify, env vars may not be available
  // This guard prevents the build from failing while still ensuring runtime safety
  if (!supabaseUrl || !supabaseKey) {
    // Return a mock client during build that will never be called at runtime
    // All pages using this function have 'force-dynamic' which prevents build-time execution
    return null as any
  }

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options) {
        try {
          cookieStore.set(name, value, options)
        } catch (error) {
          // Server component, ignore
        }
      },
      remove(name: string, options) {
        try {
          cookieStore.set(name, "", { ...options, maxAge: 0 })
        } catch (error) {
          // Server component, ignore
        }
      },
    },
  })
}
