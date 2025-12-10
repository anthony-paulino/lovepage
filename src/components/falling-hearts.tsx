"use client"

import { useState } from "react"

interface Heart {
  id: number
  left: number
  animationDuration: number
  size: number
  delay: number
}

// add a small helper for stable unique ids
const genUniqueId = () =>
	typeof crypto !== "undefined" && "randomUUID" in crypto
		? (crypto as any).randomUUID()
		: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`

export function FallingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([])
  const [bgShift, setBgShift] = useState(false)

  const createHeartBurst = () => {
    const burstHearts: Heart[] = Array.from({ length: 20 }, () => ({
      id: genUniqueId(),
      left: Math.random() * 100,
      animationDuration: 5 + Math.random() * 2,
      size: 15 + Math.random() * 25,
      delay: 0,
    }))

    setHearts((prev) => [...prev, ...burstHearts])

    // Trigger background shift
    setBgShift(true)

    // Remove hearts after animation completes
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !burstHearts.find((bh) => bh.id === h.id)))
    }, 7000)

    // Reset background
    setTimeout(() => {
      setBgShift(false)
    }, 3000)
  }

  return (
    <>
      <button
        onClick={createHeartBurst}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        aria-label="Send hearts"
      >
        <svg className="w-8 h-8 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </button>

      <div
        className={`fixed inset-0 pointer-events-none transition-colors duration-1000 ${
          bgShift ? "bg-primary/5" : "bg-transparent"
        }`}
        style={{ zIndex: 30 }}
      />

      {/* Falling hearts container */}
      <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
        {hearts.map((heart) => (
          <div
            key={heart.id} // ensure stable unique key
            className="absolute animate-fall"
            style={{
              left: `${heart.left}%`,
              top: "-50px",
              animationDuration: `${heart.animationDuration}s`,
              animationDelay: `${heart.delay}s`,
            }}
          >
            <svg
              width={heart.size}
              height={heart.size}
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-primary/60"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0.3;
          }
        }

        .animate-fall {
          animation: fall linear forwards;
        }
      `}</style>
    </>
  )
}
