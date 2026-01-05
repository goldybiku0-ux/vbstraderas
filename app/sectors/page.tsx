import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SectorOverview } from "@/components/sectors/sector-overview"

export default function SectorsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Sector Overview</h1>
            <p className="text-muted-foreground">
              Real-time sector analysis showing bullish and bearish sectors based on stock performance
            </p>
          </div>
          <SectorOverview />
        </div>
      </main>
      <Footer />
    </div>
  )
}
