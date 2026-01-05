import { notFound } from "next/navigation"
import { StockHeader } from "@/components/stock/stock-header"
import { StockChart } from "@/components/stock/stock-chart"
import { StockStats } from "@/components/stock/stock-stats"
import { StockAbout } from "@/components/stock/stock-about"
import { MOCK_STOCKS } from "@/lib/mock-data"

interface StockPageContentProps {
  params: Promise<{ symbol: string }>
}

export async function StockPageContent({ params }: StockPageContentProps) {
  const resolvedParams = await params
  const { symbol: encodedSymbol } = resolvedParams
  const [exchange, symbol] = encodedSymbol.split(":")

  // Find stock in mock data
  const stock = MOCK_STOCKS.find((s) => s.symbol === symbol && s.exchange === exchange)

  if (!stock) {
    notFound()
  }

  return (
    <main className="flex-1">
      <div className="container py-6 space-y-6">
        <StockHeader stock={stock} />
        <StockChart stock={stock} />
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <StockStats stock={stock} />
          </div>
          <div>
            <StockAbout stock={stock} />
          </div>
        </div>
      </div>
    </main>
  )
}
