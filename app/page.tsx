import { Suspense } from "react"
import { StockScreener } from "@/components/stock-screener"
import { MarketOverview } from "@/components/market-overview"
import { TopMovers } from "@/components/top-movers"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Skeleton } from "@/components/ui/skeleton"
import { RFactorHighlights } from "@/components/r-factor-highlights"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b bg-gradient-to-b from-muted/30 to-background">
          <div className="container py-12 md:py-16">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-4">
                Indian Stock Market Screener & Analytics
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground text-balance mb-6">
                Real-time data from BSE & NSE with advanced analytics, R-Factor scoring, and smart alerts
              </p>
              <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Live Market Data</span>
                </div>
                <span>•</span>
                <span>15,000+ Stocks</span>
                <span>•</span>
                <span>Premium Analytics</span>
              </div>
            </div>
          </div>
        </section>

        {/* R-Factor Highlights */}
        <section className="border-b bg-muted/10">
          <div className="container py-8">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">R-Factor Highlights</h2>
              <p className="text-muted-foreground">
                Top performing and underperforming stocks based on R-Factor analysis
              </p>
            </div>
            <Suspense
              fallback={
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                  <Skeleton className="h-48" />
                  <Skeleton className="h-48" />
                </div>
              }
            >
              <RFactorHighlights />
            </Suspense>
          </div>
        </section>

        {/* Market Overview */}
        <section className="border-b bg-muted/20">
          <div className="container py-6">
            <Suspense
              fallback={
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-20" />
                  ))}
                </div>
              }
            >
              <MarketOverview />
            </Suspense>
          </div>
        </section>

        {/* Top Movers */}
        <section className="border-b">
          <div className="container py-8">
            <Suspense fallback={<Skeleton className="h-96" />}>
              <TopMovers />
            </Suspense>
          </div>
        </section>

        {/* Stock Screener */}
        <section className="py-8">
          <div className="container">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Stock Screener</h2>
              <p className="text-muted-foreground">
                Filter and analyze stocks based on price, volume, R-Factor, and more
              </p>
            </div>
            <Suspense fallback={<Skeleton className="h-[600px]" />}>
              <StockScreener />
            </Suspense>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="border-t bg-muted/30">
          <div className="container py-8">
            <div className="mx-auto max-w-4xl">
              <h3 className="text-sm font-semibold mb-3">Risk Disclaimer</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Investment in securities market are subject to market risks. Read all the related documents carefully
                before investing. The securities quoted are for illustration only and are not recommendatory.
                Registration granted by SEBI and certification from NISM in no way guarantee performance of the
                intermediary or provide any assurance of returns to investors. Past performance is not indicative of
                future returns. Please consider your specific investment requirements before choosing a fund, or
                designing a portfolio that suits your needs.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
