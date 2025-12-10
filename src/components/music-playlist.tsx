"use client"

import { Card } from "@/components/ui/card"
import { Music } from "lucide-react"

export function MusicPlaylist() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="max-w-2xl w-full text-center">
        <h2 className="font-cursive text-4xl md:text-6xl text-primary mb-8 text-balance">Our Playlist</h2>
        <p className="text-muted-foreground mb-12 text-lg">Songs that tell our story</p>

        <Card className="p-8 md:p-12 bg-card shadow-xl border-2 border-primary/10">
          <div className="flex flex-col items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Music className="w-10 h-10 text-primary" />
            </div>
            <div>
              <p className="text-lg text-foreground mb-2">Listen to our favorite songs together</p>
              <p className="text-sm text-muted-foreground mb-6">
                Replace this section with your Apple Music playlist embed or link
              </p>
            </div>

            {/* Placeholder for Apple Music embed */}
            <div className="w-full max-w-md aspect-square bg-secondary/30 rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground p-8">
                <Music className="w-16 h-16 mx-auto mb-4 text-primary/50" />
                <p className="text-sm">Apple Music Playlist Embed Here</p>
                <p className="text-xs mt-2">Get embed code from Apple Music and replace this placeholder</p>
              </div>
            </div>

            {/* Alternative: Direct link */}
            {/* <a
              href="YOUR_APPLE_MUSIC_PLAYLIST_URL"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Open in Apple Music →
            </a> */}
          </div>
        </Card>
      </div>
    </section>
  )
}
