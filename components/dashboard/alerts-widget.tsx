import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Bell } from "lucide-react"
import Link from "next/link"

interface AlertsWidgetProps {
  userId: string
}

export function AlertsWidget({ userId }: AlertsWidgetProps) {
  // Mock data - in production, fetch from database
  const alerts = [
    { symbol: "RELIANCE", type: "above", targetPrice: 2900, currentPrice: 2847.5, active: true },
    { symbol: "TCS", type: "below", targetPrice: 3900, currentPrice: 3950.2, active: true },
    { symbol: "HDFCBANK", type: "above", targetPrice: 1700, currentPrice: 1678.9, active: true },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Price Alerts</CardTitle>
        <Button size="sm" variant="outline" asChild>
          <Link href="/alerts">
            <Plus className="size-4 mr-1" />
            New Alert
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {alerts.length > 0 ? (
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <Bell className="size-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{alert.symbol}</div>
                    <div className="text-sm text-muted-foreground">
                      Alert when {alert.type} ₹{alert.targetPrice.toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>
                <Badge variant={alert.active ? "default" : "secondary"}>{alert.active ? "Active" : "Inactive"}</Badge>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No price alerts set</p>
            <Button size="sm" className="mt-4" asChild>
              <Link href="/alerts">Create your first alert</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
