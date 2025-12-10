"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function HeartbeatGame() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [beats, setBeats] = useState(0)
  const [targetBeats] = useState(5)
  const [success, setSuccess] = useState(false)
  const [isPulsing, setIsPulsing] = useState(false)
  const [message, setMessage] = useState("")
  const pulseIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isPlaying && !success) {
      // Start the heartbeat pulse
      setIsPulsing(true)
      pulseIntervalRef.current = setInterval(() => {
        setIsPulsing(false)
        setTimeout(() => setIsPulsing(true), 100)
      }, 1000) // 60 BPM

      return () => {
        if (pulseIntervalRef.current) {
          clearInterval(pulseIntervalRef.current)
        }
      }
    }
  }, [isPlaying, success])

  const handleHeartClick = () => {
    if (!isPlaying || success) return

    // Clear any existing timeout
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current)
    }

    // Check if click is in sync (within 200ms of pulse)
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
      // Reset if no click for 2 seconds
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
    <section className="relative min-h-screen flex items-center justify-center px-4 py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="max-w-2xl w-full text-center">
        <h2 className="font-cursive text-4xl md:text-6xl text-primary mb-8 text-balance">Heartbeat Sync</h2>
        <p className="text-muted-foreground mb-12 text-lg">
          Can you click in rhythm with my heart? Get {targetBeats} beats in sync!
        </p>

        <Card className="p-8 md:p-12 bg-card shadow-xl border-2 border-primary/10">
          {!isPlaying && !success && (
            <div>
              <p className="text-muted-foreground mb-6">Click the heart button when it pulses to stay in sync</p>
              <Button onClick={startGame} size="lg" className="gap-2">
                Start Game
              </Button>
            </div>
          )}

          {isPlaying && !success && (
            <div>
              <button
                onClick={handleHeartClick}
                className={`mx-auto mb-6 transition-transform duration-100 ${isPulsing ? "scale-125" : "scale-100"}`}
                aria-label="Click in sync"
              >
                <svg className="w-32 h-32 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>

              <div className="space-y-4">
                <p className="text-lg text-muted-foreground">{message}</p>
                <div className="flex justify-center gap-2">
                  {Array.from({ length: targetBeats }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 rounded-full ${i < beats ? "bg-primary" : "bg-border"} transition-colors`}
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
              <svg className="w-32 h-32 mx-auto text-primary animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <p className="font-cursive text-2xl md:text-3xl text-primary">{message}</p>
              <Button onClick={startGame} size="lg">
                Play Again
              </Button>
            </div>
          )}
        </Card>
      </div>
    </section>
  )
}
