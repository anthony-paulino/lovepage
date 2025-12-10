"use client"

import { Card } from "@/components/ui/card"
import { Music } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export function MusicPlaylist() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-4 py-24 bg-gradient-to-b from-secondary/30 to-background"
    >
      <div className="max-w-4xl w-full">
        <div className="text-center mb-16">
          <h2
            className={`font-cursive text-4xl md:text-6xl text-primary mb-4 text-balance ${isVisible ? "animate-fade-in-down" : "opacity-0"}`}
          >
            Our Playlist
          </h2>
          <p className="text-muted-foreground text-lg">The soundtrack to our love story</p>
        </div>

        <Card
          className={`p-8 md:p-12 bg-card border-primary/20 hover:border-primary/40 transition-all shadow-lg ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <div className="space-y-6">
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-scale-pulse">
                <Music className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>

            <div className="bg-background rounded-lg p-8 min-h-80 flex items-center justify-center border border-border/50">
              <iframe
                allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                frameBorder="0"
                height="450"
                style={{ width: "100%", maxWidth: "660px", overflow: "hidden", borderRadius: "10px" }}
                sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                src="https://embed.music.apple.com/us/playlist/amor/pl.u-mJy88gDtz3amRxX"
              ></iframe>
            </div>

          </div>
        </Card>
      </div>
    </section>
  )
}



<div className="bg-background rounded-lg p-8 min-h-80 flex items-center justify-center border border-border/50">
              <iframe
                allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                frameBorder="0"
                height="450"
                style={{ width: "100%", maxWidth: "660px", overflow: "hidden", borderRadius: "10px" }}
                sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                src="https://embed.music.apple.com/us/playlist/amor/pl.u-mJy88gDtz3amRxX"
              ></iframe>
            </div>
