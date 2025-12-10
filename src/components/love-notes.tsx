"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Shuffle } from "lucide-react"

const loveNotes = [
  "You make every day feel like a celebration",
  "Your smile is my favorite view",
  "I fall for you more with each passing moment",
  "You're the reason I believe in love",
  "Every song reminds me of you",
  "You're my favorite kind of magic",
  "Distance means nothing when you mean everything",
  "You're my today and all of my tomorrows",
  "In a sea of people, my eyes will always search for you",
  "You're my favorite notification",
  "I love you more than coffee, and that's saying a lot",
  "You're the best decision I ever made",
  "My heart is perfect because you're inside",
  "You're my favorite kind of love story",
  "Every love story is beautiful, but ours is my favorite",
  "You're the missing piece I never knew I needed",
  "I love you to the moon and back",
  "You're my sunshine on a rainy day",
  "Forever isn't long enough with you",
  "You had me at hello",
  "You're the peanut butter to my jelly",
  "I choose you, and I'll choose you over and over",
  "You make my heart skip a beat",
  "You're my safe place",
  "With you, I am home",
  "You're my greatest adventure",
  "I love you more than words can say",
  "You're the reason I wake up smiling",
  "My favorite place is inside your hug",
  "You complete me in every way",
]

export function LoveNotes() {
  const [currentNote, setCurrentNote] = useState(loveNotes[0])
  const [fade, setFade] = useState(true)
  const [isFlipped, setIsFlipped] = useState(false)

  const shuffleNote = () => {
    setIsFlipped(true)
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * loveNotes.length)
      setCurrentNote(loveNotes[randomIndex])
      setIsFlipped(false)
    }, 300)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-2xl w-full text-center">
        <h2 className="font-cursive text-4xl md:text-6xl text-primary mb-2 text-balance">Little Love Notes</h2>
        <div className="h-1 w-20 bg-primary mx-auto mb-8 rounded-full" />
        <p className="text-muted-foreground mb-12 text-lg">Random thoughts that remind me of you</p>

        <Card
          className={`relative p-8 md:p-12 bg-card shadow-lg border border-primary/10 mb-8 transition-all duration-300 ${isFlipped ? "scale-95 opacity-75" : "scale-100 opacity-100"}`}
        >
          <div
            className={`transition-opacity duration-300 ${isFlipped ? "opacity-0" : "opacity-100"}`}
            style={{ minHeight: "6rem" }}
          >
            <p className="text-xl md:text-2xl text-foreground leading-relaxed text-pretty font-medium italic">
              "{currentNote}"
            </p>
          </div>

          <div className="flex justify-center gap-3 mt-6 text-primary/40">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </Card>

        <Button onClick={shuffleNote} size="lg" className="gap-2">
          <Shuffle className="w-5 h-5" />
          Shuffle Love Note
        </Button>
      </div>
    </section>
  )
}
