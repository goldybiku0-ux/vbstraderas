import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { WatchlistManager } from "@/components/watchlist/watchlist-manager"

export const dynamic = "force-dynamic"

export default async function WatchlistPage() {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Watchlist</h1>
          <p className="text-muted-foreground">Track your favorite stocks and monitor their performance</p>
        </div>

        <WatchlistManager userId={user.id} />
      </div>
    </DashboardLayout>
  )
}
