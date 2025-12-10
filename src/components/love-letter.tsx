"use client"

import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"

export function LoveLetter() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div
        className={`max-w-3xl w-full transition-all duration-1000 delay-300 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      >
        <Card className="p-8 md:p-12 lg:p-16 bg-card shadow-2xl border-2 border-primary/10">
          <div className="text-center mb-8">
            <svg className="w-12 h-12 mx-auto text-primary mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            {/* ============================================================ */}
            {/* 📝 LETTER GREETING - CUSTOMIZE THE OPENING LINE */}
            {/* ============================================================ */}
            <p className="font-cursive text-2xl md:text-3xl text-primary">Happy Anniversary, my love.</p>
          </div>

          {/* ============================================================ */}
          {/* 💌 LOVE LETTER CONTENT - REPLACE WITH YOUR PERSONAL MESSAGE */}
          {/* ============================================================ */}
          {/* Edit the paragraphs below with your own heartfelt message */}
          {/* Keep the structure but make it personal to your relationship */}
          <div className="space-y-6 text-card-foreground leading-relaxed">
            {/* First paragraph - your opening thoughts */}
            <p className="text-base md:text-lg text-muted-foreground text-pretty">
              I can't believe how time flies. It feels like just yesterday I was nervously wondering how to ask you to
              be my girlfriend. Now here we are, celebrating another year of love, laughter, and growth.
            </p>

            {/* Second paragraph - what you love about them */}
            <p className="text-base md:text-lg text-muted-foreground text-pretty">
              You've been my rock, my sunshine, and my everything. I love your unwavering support, your infectious joy,
              and your ability to make me feel seen and heard. Your love has been a constant source of strength and
              comfort for me.
            </p>

            {/* Third paragraph - gratitude and future */}
            <p className="text-base md:text-lg text-muted-foreground text-pretty">
              Thank you for being there through thick and thin. I'm grateful for every moment we've shared and excited
              for the adventures that lie ahead. Let's continue to cherish each other and create more beautiful memories
              together.
            </p>

            {/* ============================================================ */}
            {/* ✍️ LETTER SIGNATURE - CUSTOMIZE YOUR CLOSING */}
            {/* ============================================================ */}
            <p className="font-cursive text-2xl md:text-3xl text-primary pt-6 text-center">Forever yours,</p>
            <p className="font-cursive text-xl md:text-2xl text-foreground text-center">Anthony</p>

            <div className="flex justify-center gap-2 pt-4">
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>

            <p className="font-cursive text-xl text-primary pt-2 text-center">With infinite love</p>
          </div>
        </Card>
      </div>
    </section>
  )
}
