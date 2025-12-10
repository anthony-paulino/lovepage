"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

// ============================================================
// 🖼️ HERO SLIDESHOW IMAGES - REPLACE WITH YOUR OWN PHOTOS
// ============================================================
// Add your anniversary photos here. These will auto-rotate in the hero section.
// Recommended: 3-5 high-quality photos of you and your partner
// Format: ["/path/to/image1.jpg", "/path/to/image2.jpg", ...]
const photos = [
  "/images/yanelis-30-bday.JPG",
  "/images/ant-graduation.JPG",
  "/images/first-dinner-in-DR.jpg",
  "/images/resort-in-DR-2.JPG",
]

export function AnniversaryHero() {
  const [mounted, setMounted] = useState(false)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [titleChars, setTitleChars] = useState<string[]>([])

  useEffect(() => {
    setMounted(true)
  }, [])

 useEffect(() => {
    const titleText = "One Year of Us"
    if (mounted) {
      const chars = titleText.split("")
      setTitleChars(chars)
    }
  }, [mounted])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)
  }

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-background to-secondary/30 px-4 py-16">
      <div
        className={`relative z-10 text-center max-w-4xl mx-auto transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="mb-8">
          <svg
            className="w-16 h-16 mx-auto text-primary mb-6 animate-heart-float"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        <h1 className="font-cursive text-5xl md:text-7xl lg:text-8xl font-semibold text-primary mb-9 text-balance leading-tight h-24 md:h-32 flex items-center justify-center">
          {titleChars.map((char, index) => (
            <span
              key={index}
              style={{
                animation: `fade-in-down 0.6s ease-out forwards`,
                animationDelay: `${index * 0.08}s`,
                opacity: 0,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        {/* ============================================================ */}
        {/* 📝 HERO Descriptions - CUSTOMIZE IF NEEDED */}
        {/* ============================================================ */}
        <p className="text-lg md:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto mb-8 text-balance">
          365 days of love, laughter, and endless memories
        </p>

        {/* ============================================================ */}
        {/* 📝 HERO Descriptions - CUSTOMIZE IF NEEDED */}
        {/* ============================================================ */}
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-3">
          <div className="h-px w-12 bg-border" />
          <span className="font-light">December 7, 2024 - December 7, 2025</span>
          <div className="h-px w-12 bg-border" />
        </div>

        <div className="relative w-full max-w-lg mx-auto mb-8">
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            {photos.map((photo, index) => (
              <img
                key={photo}
                src={photo || "/placeholder.svg"}
                alt={`Anniversary photo ${index + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  index === currentPhotoIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

            {/* Navigation arrows */}
            <Button
              variant="ghost"
              size="icon"
              onClick={prevPhoto}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-foreground rounded-full shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextPhoto}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-foreground rounded-full shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            {/* Slideshow indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {photos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPhotoIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentPhotoIndex ? "bg-white w-6" : "bg-white/50 w-2"
                  }`}
                  aria-label={`Go to photo ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-muted-foreground"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
