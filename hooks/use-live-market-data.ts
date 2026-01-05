"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import type { Stock } from "@/lib/types"

interface StockWithFlash extends Stock {
  priceFlash?: "up" | "down" | null
  lastPrice?: number
}

export function useLiveMarketData(refreshInterval = 1500) {
  const [stocks, setStocks] = useState<StockWithFlash[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const animationFrameRef = useRef<number>()
  const lastFetchTime = useRef<number>(0)

  const fetchMarketData = useCallback(async () => {
    try {
      const now = Date.now()
      // Throttle to prevent excessive API calls
      if (now - lastFetchTime.current < refreshInterval) {
        return
      }
      lastFetchTime.current = now

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
  }, [refreshInterval])

  useEffect(() => {
    const timer = setTimeout(() => {
      setStocks((prev) => prev.map((s) => ({ ...s, priceFlash: null })))
    }, 800)
    return () => clearTimeout(timer)
  }, [stocks])

  useEffect(() => {
    fetchMarketData()

    const startPolling = () => {
      const poll = () => {
        fetchMarketData()
        animationFrameRef.current = requestAnimationFrame(() => {
          setTimeout(poll, refreshInterval)
        })
      }
      poll()
    }

    startPolling()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [fetchMarketData, refreshInterval])

  return { stocks, loading, error, lastUpdate, refresh: fetchMarketData }
}

export function useLiveIndices(refreshInterval = 1000) {
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
  const animationFrameRef = useRef<number>()
  const lastFetchTime = useRef<number>(0)

  const fetchIndices = useCallback(async () => {
    try {
      const now = Date.now()
      if (now - lastFetchTime.current < refreshInterval) {
        return
      }
      lastFetchTime.current = now

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
  }, [refreshInterval])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndices((prev) => prev.map((i) => ({ ...i, flash: null })))
    }, 600)
    return () => clearTimeout(timer)
  }, [indices])

  useEffect(() => {
    fetchIndices()

    const startPolling = () => {
      const poll = () => {
        fetchIndices()
        animationFrameRef.current = requestAnimationFrame(() => {
          setTimeout(poll, refreshInterval)
        })
      }
      poll()
    }

    startPolling()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [fetchIndices, refreshInterval])

  return { indices, loading, lastUpdate, refresh: fetchIndices }
}
