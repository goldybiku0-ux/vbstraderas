import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"

export function MarketNewsWidget() {
  const news = [
    {
      title: "Sensex rises 300 points, Nifty above 21,850 as IT stocks rally",
      source: "Economic Times",
      time: "2 hours ago",
      url: "#",
    },
    {
      title: "RBI keeps repo rate unchanged at 6.5% for fifth consecutive time",
      source: "Business Standard",
      time: "4 hours ago",
      url: "#",
    },
    {
      title: "Foreign investors pump ₹5,000 crore into Indian equities",
      source: "Mint",
      time: "6 hours ago",
      url: "#",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Market News</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {news.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group hover:bg-accent/50 p-3 rounded-lg transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-medium group-hover:text-primary transition-colors text-balance">{item.title}</h4>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <span>{item.source}</span>
                    <span>•</span>
                    <span>{item.time}</span>
                  </div>
                </div>
                <ExternalLink className="size-4 text-muted-foreground flex-shrink-0" />
              </div>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
