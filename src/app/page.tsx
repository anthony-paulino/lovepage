import { AnniversaryHero } from "@/components/anniversary-hero"
import { Timeline } from "@/components/timeline"
import { LoveLetter } from "@/components/love-letter"
import { FallingHearts } from "@/components/falling-hearts"
import { HeartbeatGame } from "@/components/heartbeat-game"
import { LoveNotes } from "@/components/love-notes"
import { MusicPlaylist } from "@/components/music-playlist"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <FallingHearts />
      <AnniversaryHero />
      <LoveLetter />
      <Timeline />
      <LoveNotes />
      <HeartbeatGame />
      <MusicPlaylist />

       {/* Footer */}
      <footer className="py-12 text-center bg-linear-to-t from-secondary/30 to-background">
        <div className="flex justify-center gap-2 mb-4">
          {[1, 2, 3].map((i) => (
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
        <p className="font-cursive text-2xl text-primary mb-2">Forever & Always</p>
        <p className="text-sm text-muted-foreground">Made with love for you</p>
      </footer>

    </main>
  )
}
