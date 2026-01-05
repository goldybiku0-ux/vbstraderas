"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TrendingUp, Menu } from "lucide-react"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <TrendingUp className="size-6 text-primary" />
          <span>VBS Trader</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
            Screener
          </Link>
          <Link href="/sectors" className="text-sm font-medium hover:text-primary transition-colors">
            Sectors
          </Link>
          <Link href="/analytics" className="text-sm font-medium hover:text-primary transition-colors">
            Analytics
          </Link>
          <Link href="/watchlist" className="text-sm font-medium hover:text-primary transition-colors">
            Watchlist
          </Link>
          <Link href="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
            Pricing
          </Link>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64">
            <div className="flex flex-col gap-4 mt-8">
              <Link
                href="/"
                className="text-sm font-medium hover:text-primary transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Screener
              </Link>
              <Link
                href="/sectors"
                className="text-sm font-medium hover:text-primary transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Sectors
              </Link>
              <Link
                href="/analytics"
                className="text-sm font-medium hover:text-primary transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Analytics
              </Link>
              <Link
                href="/watchlist"
                className="text-sm font-medium hover:text-primary transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Watchlist
              </Link>
              <Link
                href="/pricing"
                className="text-sm font-medium hover:text-primary transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              <div className="pt-4 border-t flex flex-col gap-2">
                <Button variant="ghost" asChild onClick={() => setIsOpen(false)}>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild onClick={() => setIsOpen(false)}>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
