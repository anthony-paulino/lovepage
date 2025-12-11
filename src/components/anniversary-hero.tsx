"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"
import { ImageViewerModal } from "./image-viewer-modal"

// ============================================================
// 🖼️ HERO SLIDESHOW IMAGES - REPLACE WITH YOUR OWN PHOTOS
// ============================================================
// Add your anniversary photos here. These will auto-rotate in the hero section.
// Recommended: 3-5 high-quality photos of you and your partner
// Format: ["/path/to/image1.jpg", "/path/to/image2.jpg", ...]
const photos = [
  "/images/yanelis-30-bday.jpg",
  "/images/ant-graduation.jpg",
  "/images/first-dinner-in-DR.jpg",
  "/images/resort-in-DR-2.jpg",
]

export function AnniversaryHero() {
  const [mounted, setMounted] = useState(false)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [titleChars, setTitleChars] = useState<string[]>([])
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [viewerOrigin, setViewerOrigin] = useState<DOMRect | null>(null)

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

  const openViewer = (e: React.MouseEvent) => {
    const imgContainer = (e.currentTarget as HTMLElement).parentElement
    if (imgContainer) {
      setViewerOrigin(imgContainer.getBoundingClientRect())
    }
    setIsViewerOpen(true)
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-background to-secondary/30 px-4 py-16">
      <div
        className={`relative z-10 text-center max-w-4xl mx-auto transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="mb-6 sm:mb-8">
          <svg
            className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-primary mb-4 sm:mb-6 animate-heart-float"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        <h1 className="font-cursive text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-semibold text-primary mb-6 sm:mb-9 text-balance leading-tight h-20 sm:h-24 md:h-32 flex items-center justify-center">
          {titleChars.map((char, index) => (
            <span
              key={index}
              style={{
                animation: `fade-in-down 0.5s ease-out forwards`,
                animationDelay: `${index * 0.07}s`,
                opacity: 0,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        <p className="text-base sm:text-lg md:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-8 text-balance">
          365 days of love, laughter, and endless memories
        </p>

        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
          <div className="h-px w-8 sm:w-12 bg-border" />
          <span className="font-light">December 7, 2024 - December 7, 2025</span>
          <div className="h-px w-8 sm:w-12 bg-border" />
        </div>

        <div className="relative w-full max-w-lg mx-auto mb-6 sm:mb-8">
          <div className="relative h-48 sm:h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
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

            <Button
              variant="ghost"
              size="icon"
              onClick={openViewer}
              className="absolute top-2 right-2 sm:top-3 sm:right-3
              bg-white/80 hover:bg-white
                text-foreground
                rounded-full shadow-lg
                h-8 w-8 sm:h-9 sm:w-9
                transition-all hover:scale-110 active:scale-95
                opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
            >
              <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>

            {/* Navigation arrows */}
            <Button
              variant="ghost"
              size="icon"
              onClick={prevPhoto}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-foreground rounded-full shadow-lg h-8 w-8 sm:h-10 sm:w-10 transition-all hover:scale-110 active:scale-95"
            >
              <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextPhoto}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-foreground rounded-full shadow-lg h-8 w-8 sm:h-10 sm:w-10 transition-all hover:scale-110 active:scale-95"
            >
              <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
            </Button>

            {/* Slideshow indicators */}
            <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {photos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPhotoIndex(index)}
                  className={`h-1.5 sm:h-2 rounded-full transition-all ${
                    index === currentPhotoIndex ? "bg-white w-6 sm:w-8" : "bg-white/50 w-2"
                  }`}
                  aria-label={`Go to photo ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <ImageViewerModal
        images={photos}
        title="Our Anniversary"
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        origin={viewerOrigin}
      />

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground"
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
