import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react"

export function PortfolioOverview() {
  const stats = [
    {
      title: "Total Watchlist Value",
      value: "₹12,45,680",
      change: "+2.4%",
      positive: true,
      icon: DollarSign,
    },
    {
      title: "Today's Gainers",
      value: "8",
      subtitle: "in your watchlist",
      positive: true,
      icon: TrendingUp,
    },
    {
      title: "Today's Losers",
      value: "3",
      subtitle: "in your watchlist",
      positive: false,
      icon: TrendingDown,
    },
    {
      title: "Active Alerts",
      value: "5",
      subtitle: "price alerts set",
      icon: Activity,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <Icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.change && (
                <p className={cn("text-xs", stat.positive ? "text-emerald-600" : "text-red-600")}>{stat.change}</p>
              )}
              {stat.subtitle && <p className="text-xs text-muted-foreground">{stat.subtitle}</p>}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
