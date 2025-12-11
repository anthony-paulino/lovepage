"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface ImageViewerModalProps {
  images: (string | undefined)[]
  title: string
  month?: string
  isOpen: boolean
  onClose: () => void
  origin?: DOMRect | null
}

export function ImageViewerModal({ images, title, month, isOpen, onClose, origin }: ImageViewerModalProps) {
  const validImages = images.filter((img): img is string => img !== undefined)

  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(false)
  const escHandlerRef = useRef<((e: KeyboardEvent) => void) | null>(null)
  const [initialTransform, setInitialTransform] = useState<string>("translate(0px,0px) scale(0.86)")

  useEffect(() => {
    if (!isOpen) return

    setIndex(0)

    if (!origin) {
      setInitialTransform("translate(0px,0px) scale(0.86)")
    } else {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const centerX = vw / 2
      const centerY = vh / 2
      const originCenterX = origin.left + origin.width / 2
      const originCenterY = origin.top + origin.height / 2
      const deltaX = originCenterX - centerX
      const deltaY = originCenterY - centerY
      setInitialTransform(`translate(${deltaX}px, ${deltaY}px) scale(0.86)`)
    }

    const t = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(t)
  }, [isOpen, origin])

  useEffect(() => {
    if (!isOpen) return

    escHandlerRef.current = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose()
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % validImages.length)
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + validImages.length) % validImages.length)
    }
    const handler = (e: KeyboardEvent) => escHandlerRef.current?.(e)
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [validImages.length, isOpen])

  useEffect(() => {
    if (!isOpen) return

    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen])

  const handleClose = () => {
    setVisible(false)
    setTimeout(() => {
      onClose()
    }, 200)
  }

  if (!isOpen || validImages.length === 0) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all"
      style={{
        backgroundColor: visible ? "rgba(0,0,0,0.72)" : "rgba(0,0,0,0.0)",
        backdropFilter: visible ? "blur(6px)" : "none",
      }}
      onClick={handleClose}
    >
      <div
        className="relative w-full sm:w-[92vw] h-[75vh] sm:h-[84vh] max-w-5xl rounded-lg flex items-center justify-center transform transition-all duration-200"
        onClick={(e) => e.stopPropagation()}
        style={{
          transform: visible ? "translate(0px, 0px) scale(1)" : initialTransform,
          opacity: visible ? 1 : 0,
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black/90 rounded-lg">
          {/* Images */}
          {validImages.map((src, i) => {
            const offset = (i - index) * 100
            const isActive = i === index
            return (
              <img
                key={src + i}
                src={src || "/placeholder.svg"}
                alt={`${title} ${i + 1}`}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  transform: `translateX(${offset}%) ${isActive ? "scale(1)" : "scale(0.97)"}`,
                  transition: "transform 300ms cubic-bezier(.22,.9,.3,1), opacity 220ms ease",
                  opacity: isActive ? 1 : 0,
                  pointerEvents: isActive ? "auto" : "none",
                }}
                className="shadow-2xl will-change-transform"
              />
            )
          })}

          {/* Navigation Controls */}
          {validImages.length > 1 && (
            <>
              <button
                aria-label="Previous image"
                onClick={() => setIndex((i) => (i - 1 + validImages.length) % validImages.length)}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/20 hover:bg-white/40 active:bg-white/50 p-2 sm:p-3 transition-all duration-200 hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </button>
              <button
                aria-label="Next image"
                onClick={() => setIndex((i) => (i + 1) % validImages.length)}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/20 hover:bg-white/40 active:bg-white/50 p-2 sm:p-3 transition-all duration-200 hover:scale-110"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </button>

              {/* Dot Indicators */}
              <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20 bg-black/30 rounded-full px-4 py-2 backdrop-blur-sm">
                {validImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`h-2 sm:h-2.5 rounded-full transition-all ${i === index ? "bg-white w-6 sm:w-8" : "bg-white/40 w-2 hover:bg-white/60"}`}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Close Button - higher z-index than header */}
          <button
            onClick={handleClose}
            aria-label="Close image viewer"
            className="absolute top-4 right-4 z-50 rounded-full bg-white/20 hover:bg-white/30 active:bg-white/40 p-2.5 transition-all duration-200 hover:scale-110"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>

          {/* Header Info */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-16 sm:right-20 z-40">
            <div className="text-center text-sm sm:text-base font-medium text-white drop-shadow-lg">{title}</div>
            {month && <div className="text-center text-xs sm:text-sm text-white/80 mt-0.5 drop-shadow-lg">{month}</div>}
          </div>

          {/* Image Counter */}
          {validImages.length > 1 && (
            <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 text-xs sm:text-sm text-white/70 bg-black/30 rounded-full px-3 py-1.5 backdrop-blur-sm z-20">
              {index + 1} of {validImages.length}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
