import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SectorPerformance } from "@/components/analytics/sector-performance"
import { MarketTrends } from "@/components/analytics/market-trends"
import { TopPerformers } from "@/components/analytics/top-performers"
import { VolatilityAnalysis } from "@/components/analytics/volatility-analysis"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b bg-gradient-to-b from-muted/30 to-background">
          <div className="container py-12 md:py-16">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-4">
                Market Analytics
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground text-balance">
                Deep insights into market trends, sector performance, and stock analytics
              </p>
            </div>
          </div>
        </section>

        {/* Market Trends */}
        <section className="py-8 border-b">
          <div className="container">
            <MarketTrends />
          </div>
        </section>

        {/* Sector Performance */}
        <section className="py-8 border-b bg-muted/20">
          <div className="container">
            <SectorPerformance />
          </div>
        </section>

        {/* Top Performers */}
        <section className="py-8 border-b">
          <div className="container">
            <TopPerformers />
          </div>
        </section>

        {/* Volatility Analysis */}
        <section className="py-8">
          <div className="container">
            <VolatilityAnalysis />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
