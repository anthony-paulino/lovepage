"use client"

import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function LoveLetter() {
  const [mounted, setMounted] = useState(false)
  const { ref, isVisible } = useScrollAnimation()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-4 py-24 bg-gradient-to-b from-secondary/30 to-background"
    >
      <div
        className={`max-w-3xl w-full transition-all duration-800 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <Card className="p-6 sm:p-8 md:p-12 lg:p-16 bg-card shadow-2xl border-2 border-primary/10">
          <div className="text-center mb-6 sm:mb-8">
            <svg
              className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-primary mb-3 sm:mb-4 drop-shadow-sm animate-float"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <p className="font-cursive text-xl sm:text-2xl md:text-3xl text-primary">Happy Anniversary, my love.</p>
          </div>

          <div className="space-y-4 sm:space-y-6 text-card-foreground leading-relaxed">
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground text-pretty">
              I can't believe how time flies. It feels like just yesterday I was nervously wondering how to ask you to
              be my girlfriend. Now here we are, celebrating another year of love, laughter, and growth.
            </p>

            <p className="text-sm sm:text-base md:text-lg text-muted-foreground text-pretty">
              You've been my rock, my sunshine, and my everything. I love your unwavering support, your infectious joy,
              and your ability to make me feel seen and heard. Your love has been a constant source of strength and
              comfort for me.
            </p>

            <p className="text-sm sm:text-base md:text-lg text-muted-foreground text-pretty">
              Thank you for being there through thick and thin. I'm grateful for every moment we've shared and excited
              for the adventures that lie ahead. Let's continue to cherish each other and create more beautiful memories
              together.
            </p>

            <div className="border-t border-primary/10 pt-6 sm:pt-8">
              <p className="font-cursive text-xl sm:text-2xl md:text-3xl text-primary pt-4 sm:pt-6 text-center">
                Forever yours,
              </p>
              <p className="font-cursive text-lg sm:text-xl md:text-2xl text-foreground text-center mt-1 sm:mt-2">
                Anthony
              </p>

               <div className="flex justify-center gap-3 mt-6 text-primary/40">
                {[1, 2, 3, 4].map((i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-primary animate-float"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                ))}
              </div>

              <p className="font-cursive text-lg sm:text-xl text-primary pt-3 sm:pt-4 text-center">
                With infinite love
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
