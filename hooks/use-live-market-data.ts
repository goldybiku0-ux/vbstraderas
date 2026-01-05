"use client"

import { useState, useEffect, useCallback } from "react"
import type { Stock } from "@/lib/types"

interface StockWithFlash extends Stock {
  priceFlash?: "up" | "down" | null
  lastPrice?: number
}

export function useLiveMarketData(refreshInterval = 5000) {
  const [stocks, setStocks] = useState<StockWithFlash[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  const fetchMarketData = useCallback(async () => {
    try {
      const response = await fetch("/api/market-data")

      if (!response.ok) {
        throw new Error(`Failed to fetch market data: ${response.statusText}`)
      }

      const data = await response.json()
      const newStocks = data.stocks || []

      setStocks((prevStocks) => {
        return newStocks.map((newStock: Stock) => {
          const prevStock = prevStocks.find((s) => s.symbol === newStock.symbol && s.exchange === newStock.exchange)

          let priceFlash: "up" | "down" | null = null
          if (prevStock && prevStock.price !== newStock.price) {
            priceFlash = newStock.price > prevStock.price ? "up" : "down"
          }

          return {
            ...newStock,
            priceFlash,
            lastPrice: prevStock?.price,
          }
        })
      })

      setLastUpdate(new Date())
      setError(null)
    } catch (err) {
      console.error("Error fetching market data:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch market data")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setStocks((prev) => prev.map((s) => ({ ...s, priceFlash: null })))
    }, 600)
    return () => clearTimeout(timer)
  }, [stocks])

  useEffect(() => {
    fetchMarketData()

    const interval = setInterval(() => {
      fetchMarketData()
    }, refreshInterval)

    return () => clearInterval(interval)
  }, [fetchMarketData, refreshInterval])

  return { stocks, loading, error, lastUpdate, refresh: fetchMarketData }
}

export function useLiveIndices(refreshInterval = 5000) {
  const [indices, setIndices] = useState<
    Array<{
      name: string
      value: number
      change: number
      changePercent: number
      flash?: "up" | "down" | null
    }>
  >([])
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  const fetchIndices = useCallback(async () => {
    try {
      const response = await fetch("/api/indices")

      if (!response.ok) {
        throw new Error(`Failed to fetch indices: ${response.statusText}`)
      }

      const data = await response.json()
      const newIndices = data.indices || []

      setIndices((prev) => {
        return newIndices.map((newIndex: any) => {
          const prevIndex = prev.find((i) => i.name === newIndex.name)
          let flash: "up" | "down" | null = null
          if (prevIndex && prevIndex.value !== newIndex.value) {
            flash = newIndex.value > prevIndex.value ? "up" : "down"
          }
          return { ...newIndex, flash }
        })
      })

      setLastUpdate(new Date())
    } catch (err) {
      console.error("Error fetching indices:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndices((prev) => prev.map((i) => ({ ...i, flash: null })))
    }, 600)
    return () => clearTimeout(timer)
  }, [indices])

  useEffect(() => {
    fetchIndices()
    const interval = setInterval(fetchIndices, refreshInterval)
    return () => clearInterval(interval)
  }, [fetchIndices, refreshInterval])

  return { indices, loading, lastUpdate, refresh: fetchIndices }
}

export function useLiveFutures(refreshInterval = 5000) {
  const [futures, setFutures] = useState<
    Array<{
      symbol: string
      spotPrice: number
      futurePrice: number
      premium: number
      premiumPercent: number
      expiry: string
      lotSize: number
      flash?: "up" | "down" | null
    }>
  >([])
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  const fetchFutures = useCallback(async () => {
    try {
      const response = await fetch("/api/futures")

      if (!response.ok) {
        throw new Error(`Failed to fetch futures: ${response.statusText}`)
      }

      const data = await response.json()
      const newFutures = data.futures || []

      setFutures((prev) => {
        return newFutures.map((newFuture: any) => {
          const prevFuture = prev.find((f) => f.symbol === newFuture.symbol)
          let flash: "up" | "down" | null = null
          if (prevFuture && prevFuture.futurePrice !== newFuture.futurePrice) {
            flash = newFuture.futurePrice > prevFuture.futurePrice ? "up" : "down"
          }
          return { ...newFuture, flash }
        })
      })

      setLastUpdate(new Date())
    } catch (err) {
      console.error("Error fetching futures:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setFutures((prev) => prev.map((f) => ({ ...f, flash: null })))
    }, 600)
    return () => clearTimeout(timer)
  }, [futures])

  useEffect(() => {
    fetchFutures()
    const interval = setInterval(fetchFutures, refreshInterval)
    return () => clearInterval(interval)
  }, [fetchFutures, refreshInterval])

  return { futures, loading, lastUpdate, refresh: fetchFutures }
}
