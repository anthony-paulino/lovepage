import React, { useEffect, useRef, useState } from "react"

// Simple interactive heartbeat card with focused viewer modal
export function Heartbeat() {
  const [focused, setFocused] = useState(false)
  const [mounted, setMounted] = useState(false)
  const cardRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!focused) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFocused(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [focused])

  return (
    <div className="max-w-md mx-auto">
      <div
        ref={cardRef}
        role="button"
        tabIndex={0}
        aria-pressed={focused}
        onClick={() => setFocused(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            setFocused(true)
          }
        }}
        className={`group relative bg-card p-6 rounded-xl transition-transform duration-300 transform-gpu cursor-pointer border border-primary/10
          ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          hover:scale-105 focus:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/30
          `}
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10 shadow-md transition-all group-hover:shadow-xl">
            {/* Heartbeat SVG - pulsing on hover/focus */}
            <svg
              viewBox="0 0 24 24"
              className="w-10 h-10 text-primary stroke-current transition-transform duration-300 group-hover:scale-110"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                d="M3 12h3l2-5 3 10 2-4h4"
                className="stroke-current"
                style={{ transformOrigin: "center" }}
              />
            </svg>
          </div>

          <div>
            <h4 className="font-cursive text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors">
              Heartbeat
            </h4>
            <p className="text-sm text-muted-foreground">A little pulse that reminds me of you</p>
          </div>
        </div>

        {/* subtle decorative pulse ring */}
        <span className="absolute -inset-1 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm bg-gradient-to-r from-primary/20 to-secondary/10" />
      </div>

      {/* Focused modal viewer */}
      {focused && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6"
          onClick={() => setFocused(false)}
        >
          <div
            className="relative w-[92vw] max-w-2xl bg-card rounded-lg p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setFocused(false)}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full bg-white/10 hover:bg-white/20 p-2"
            >
              ✕
            </button>

            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-44 h-44 flex items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 shadow-inner animate-pulse">
                {/* Larger animated heart */}
                <svg viewBox="0 0 24 24" className="w-28 h-28 text-primary fill-primary">
                  <path d="M12 21s-7.5-4.35-9.5-8.05C-0.2 7 4 3 7.5 5.5 9.2 6.8 12 9 12 9s2.8-2.2 4.5-3.5C20 3 24.2 7 21.5 12.95 19.5 16.65 12 21 12 21z" />
                </svg>
              </div>

              <div className="flex-1">
                <h3 className="font-cursive text-2xl font-semibold">Heartbeat</h3>
                <p className="mt-2 text-muted-foreground">
                  This little heart pulses for the moments that matter. Use the escape key or click outside
                  to close.
                </p>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => {
                      /* example CTA */
                      window.open("/", "_self")
                    }}
                    className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90"
                  >
                    Back to timeline
                  </button>
                  <button
                    onClick={() => setFocused(false)}
                    className="px-4 py-2 rounded-md border border-primary/10 text-card-foreground hover:bg-muted"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
