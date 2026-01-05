import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { PortfolioOverview } from "@/components/dashboard/portfolio-overview"
import { WatchlistWidget } from "@/components/dashboard/watchlist-widget"
import { AlertsWidget } from "@/components/dashboard/alerts-widget"
import { MarketNewsWidget } from "@/components/dashboard/market-news-widget"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
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
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.email}</p>
        </div>

        <PortfolioOverview />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WatchlistWidget userId={user.id} />
          <AlertsWidget userId={user.id} />
        </div>

        <MarketNewsWidget />
      </div>
    </DashboardLayout>
  )
}
