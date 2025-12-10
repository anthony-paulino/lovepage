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
  "You're my happily ever after",
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

  const shuffleNote = () => {
    setFade(false)
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * loveNotes.length)
      setCurrentNote(loveNotes[randomIndex])
      setFade(true)
    }, 200)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-2xl w-full text-center">
        <h2 className="font-cursive text-4xl md:text-6xl text-primary mb-8 text-balance">Little Love Notes</h2>
        <p className="text-muted-foreground mb-12 text-lg">Random thoughts that remind me of you</p>

        <Card className="p-8 md:p-12 bg-card shadow-xl border-2 border-primary/10 mb-8">
          <div
            className={`transition-opacity duration-200 ${fade ? "opacity-100" : "opacity-0"}`}
            style={{ minHeight: "4rem" }}
          >
            <p className="text-xl md:text-2xl text-foreground leading-relaxed text-pretty font-medium">{currentNote}</p>
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
