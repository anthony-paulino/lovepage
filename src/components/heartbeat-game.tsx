"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function HeartbeatGame() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [beats, setBeats] = useState(0)
  const [targetBeats] = useState(5)
  const [success, setSuccess] = useState(false)
  const [isPulsing, setIsPulsing] = useState(false)
  const [message, setMessage] = useState("")
  const [isHovered, setIsHovered] = useState(false)
  const pulseIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { ref, isVisible } = useScrollAnimation()

  useEffect(() => {
    if (isPlaying && !success) {
      setIsPulsing(true)
      pulseIntervalRef.current = setInterval(() => {
        setIsPulsing(false)
        setTimeout(() => setIsPulsing(true), 100)
      }, 1000)

      return () => {
        if (pulseIntervalRef.current) {
          clearInterval(pulseIntervalRef.current)
        }
      }
    }
  }, [isPlaying, success])

  const handleHeartClick = () => {
    if (!isPlaying || success) return

    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current)
    }

    const newBeats = beats + 1
    setBeats(newBeats)

    if (newBeats >= targetBeats) {
      setSuccess(true)
      setIsPlaying(false)
      setMessage("You and me, always in sync")
      if (pulseIntervalRef.current) {
        clearInterval(pulseIntervalRef.current)
      }
    } else {
      clickTimeoutRef.current = setTimeout(() => {
        if (beats < targetBeats) {
          setBeats(0)
          setMessage("Let's try again! Click in rhythm")
        }
      }, 2000)
    }
  }

  const startGame = () => {
    setIsPlaying(true)
    setBeats(0)
    setSuccess(false)
    setMessage("Click the heart in sync with the pulse!")
  }

  const resetGame = () => {
    setIsPlaying(false)
    setBeats(0)
    setSuccess(false)
    setMessage("")
    if (pulseIntervalRef.current) {
      clearInterval(pulseIntervalRef.current)
    }
  }

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-4 py-24 bg-gradient-to-b from-secondary/20 to-background"
    >
      <div className="max-w-2xl w-full text-center">
        <h2
          className={`font-cursive text-4xl md:text-6xl text-primary mb-2 text-balance ${isVisible ? "animate-fade-in-down" : "opacity-0"}`}
        >
          Heartbeat Sync
        </h2>
        <div className={`h-1 w-20 bg-primary mx-auto mb-8 rounded-full ${isVisible ? "animate-scale-pulse" : ""}`} />
        <p className="text-muted-foreground mb-12 text-lg">
          Can you click in rhythm with my heart? Get {targetBeats} beats in sync!
        </p>

        <Card
          className={`p-8 md:p-12 bg-card shadow-lg border border-primary/10 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          {!isPlaying && !success && (
            <div>
              <p className="text-muted-foreground mb-8 text-lg">
                Click the heart button when it pulses to stay in sync
              </p>
              <Button onClick={startGame} size="lg" className="gap-2 hover:scale-105 transition-transform">
                Start Game
              </Button>
            </div>
          )}

          {isPlaying && !success && (
            <div>
              <button
                onClick={handleHeartClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`mx-auto mb-8 transition-all duration-100 ${isPulsing ? "animate-heartbeat-pulse scale-125" : "scale-100"} ${
                  isHovered ? "animate-scale-pulse" : "hover:scale-110"
                }`}
                aria-label="Click in sync"
              >
                <svg className="w-32 h-32 text-primary drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>

              <div className="space-y-4">
                <p className="text-lg text-muted-foreground">{message}</p>
                <div className="flex justify-center gap-2">
                  {Array.from({ length: targetBeats }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 rounded-full ${i < beats ? "bg-primary animate-scale-pulse" : "bg-border"} transition-colors`}
                    />
                  ))}
                </div>
                <Button onClick={resetGame} variant="outline" size="sm">
                  Reset
                </Button>
              </div>
            </div>
          )}

          {success && (
            <div className="space-y-6">
              <svg
                className="w-32 h-32 mx-auto text-primary animate-heartbeat-pulse drop-shadow-lg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <p className="font-cursive text-2xl md:text-3xl text-primary">{message}</p>
              <Button onClick={startGame} size="lg" className="hover:scale-105 transition-transform">
                Play Again
              </Button>
            </div>
          )}
        </Card>
      </div>
    </section>
  )
}
