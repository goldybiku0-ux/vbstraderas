import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

export function MarketOverview() {
  const indices = [
    { name: "NIFTY 50", value: 21854.35, change: 125.4, changePercent: 0.58 },
    { name: "SENSEX", value: 72240.26, change: -89.83, changePercent: -0.12 },
    { name: "NIFTY BANK", value: 46789.55, change: 234.12, changePercent: 0.5 },
    { name: "NIFTY IT", value: 34521.8, change: -156.45, changePercent: -0.45 },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {indices.map((index) => (
        <Card key={index.name} className="p-4">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground font-medium">{index.name}</span>
            <span className="text-xl md:text-2xl font-bold">
              {index.value.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            <div className="flex items-center gap-1 text-sm">
              {index.changePercent >= 0 ? (
                <>
                  <TrendingUp className="size-4 text-emerald-600" />
                  <span className="text-emerald-600 font-medium">
                    +{index.change.toFixed(2)} ({index.changePercent.toFixed(2)}%)
                  </span>
                </>
              ) : (
                <>
                  <TrendingDown className="size-4 text-red-600" />
                  <span className="text-red-600 font-medium">
                    {index.change.toFixed(2)} ({index.changePercent.toFixed(2)}%)
                  </span>
                </>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
