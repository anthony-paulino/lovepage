import { AnniversaryHero } from "@/components/anniversary-hero"
import { Timeline } from "@/components/timeline"
import { LoveLetter } from "@/components/love-letter"
import { FallingHearts } from "@/components/falling-hearts"
import { HeartbeatGame } from "@/components/heartbeat-game"
import { LoveNotes } from "@/components/love-notes"
import { MusicPlaylist } from "@/components/music-playlist"

export default function HomePage() {
  return (
    <main className="min-h-screen relative">
      <FallingHearts />
      <AnniversaryHero />
      <LoveLetter />
      <Timeline />
      <LoveNotes />
      <HeartbeatGame />
      <MusicPlaylist />
    </main>
  )
}
