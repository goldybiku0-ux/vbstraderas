import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StockPageContent } from "@/components/stock/stock-page-content"

interface StockPageProps {
  params: Promise<{ symbol: string }>
}

export default function StockPage({ params }: StockPageProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <StockPageContent params={params} />
      <Footer />
    </div>
  )
}
