import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { AlertsManager } from "@/components/alerts/alerts-manager"

export const dynamic = "force-dynamic"

export default async function AlertsPage() {
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
          <h1 className="text-3xl font-bold">Price Alerts</h1>
          <p className="text-muted-foreground">Get notified when stocks reach your target prices</p>
        </div>

        <AlertsManager userId={user.id} />
      </div>
    </DashboardLayout>
  )
}
