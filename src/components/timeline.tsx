"use client"

import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { Play, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// ============================================================
// 📸 JOURNEY MILESTONES - YOUR RELATIONSHIP TIMELINE
// ============================================================
// This is where you customize each special moment in your journey together.
// Each milestone can have either a single image or multiple images (slideshow).
//
// For SINGLE IMAGE milestones: Use "image" property
// For SLIDESHOW milestones: Use "images" property (array of image paths)
// ============================================================

const milestones = [
  {
    month: "December 7, 2024", // The date when this happened
    title: "The Day I Asked You Out", // Title of this milestone
    description:
      "The moment I gathered all my courage and asked you to be mine.",
    image: "/images/ask-her-out.jpg",
  },
  {
    month: "August 21, 2025",
    title: "Our First Trip Together",
    description:
      "An adventure that brought us closer. Every moment exploring together made me fall deeper in love with you.", // CUSTOMIZE: Your trip story
    // SLIDESHOW: Add multiple photos from your trip
    images: [
      "/images/before-our-first-flight.jpg",
      "/images/resort-in-DR-1.jpg",
      "/images/resort-in-DR-3.JPG",
      // Add more trip photos here
    ],
  },
  {
    month: "January 20, 2025",
    title: "My First Birthday With You",
    description:
      "You made my birthday so special. The thoughtfulness and love you gave me, showed me how lucky I am to have you.",
    image: "/images/ant-22-bday.jpg",
  },
  {
    month: "October 15, 2024",
    title: "Her First Birthday We Celebrated",
    description:
      "Celebrating you was pure joy. You deserve the world and more.",
    image: "/images/yami-22-bday-1.JPEG",
  },
  {
    month: "February 14, 2024",
    title: "Our First Valentine's Together",
    description:
      "Roses, chocolates, and a heart full of love.",
    // SLIDESHOW: Add Valentine's Day photos
    images: [
      "/images/first-valentines-dinner-2.jpg",
      "/images/first-valentines-dinner-1.JPG",
      "/images/first-valentines-party.jpg",
      "/images/first-valentines-presents.jpg",
    ],
  },
  {
    month: "October 6, 2024",
    title: "Pumpkin Patch Adventures",
    description: "Fall vibes, pumpkins, and you by my side.",
    image:
      "/images/pumpkin-patch-2.JPEG",
  },
  {
    month: "October 6, 2024",
    title: "Her First Flowers",
    description:
      "The first time I gave you flowers and saw that beautiful smile.",
    image: "/images/first-flowers.JPG",
  },
  {
    month: "December 9, 2025",
    title: "Our First Permanent Jewelry",
    description:
      "silver king and gold queen.",
    image: "/images/first-permanent-bracelets.jpg",
  },
  {
    month: "",
    title: "Photo Booth Memories",
    description:
      "Silly faces, sweet kisses, and candid moments captured forever.",
    images: [
      "/images/photo-booth-1.jpg",
      "/images/photo-booth-2.jpg",
      "/images/photo-booth-3.jpg",
    ],
  },
  {
    month: "December 7 2024",
    title: "Christmas Farm",
    description:
      "Twinkling lights, hot cocoa, and holiday spirit.",
    // SLIDESHOW: Add Christmas farm photos
    image:
      "/images/christmas-farm-1.jpg",
  },
  {
    month: "November 2024",
    title: "Our First Trip to NYC",
    description:
      "A lot of walking this day.",
    image: "/images/first-nyc-trip.jpg",
  },
]

// Component to handle individual milestone slideshow
function MilestoneSlideshow({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative w-full h-48">
      {images.map((img, index) => (
        <img
          key={img}
          src={img || "/placeholder.svg"}
          alt={`Memory ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Navigation buttons for slideshow */}
      <Button
        variant="ghost"
        size="icon"
        onClick={prevImage}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-foreground rounded-full shadow-lg h-8 w-8"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={nextImage}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-foreground rounded-full shadow-lg h-8 w-8"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>

      {/* Slideshow indicators */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === currentIndex ? "bg-white w-4" : "bg-white/50 w-1.5"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export function Timeline() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center py-24 px-4 bg-gradient-to-b from-background to-secondary/30">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="font-cursive text-4xl md:text-6xl font-semibold text-center mb-4 text-primary text-balance">
          Our Journey Together
        </h2>
        <p className="text-center text-muted-foreground mb-16 text-lg">
          Every moment with you is a memory worth treasuring
        </p>

        {/* Journey milestones grid */}
        <div
          className={`grid md:grid-cols-2 gap-8 transition-all duration-1000 delay-500 mb-16 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {milestones.map((milestone, index) => (
            <Card
              key={index}
              className="overflow-hidden bg-card hover:shadow-xl transition-all duration-300 border-primary/10"
            >
              {milestone.images ? (
                <MilestoneSlideshow images={milestone.images} />
              ) : (
                <img
                  src={milestone.image || "/placeholder.svg"}
                  alt={milestone.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <div className="text-sm text-primary font-medium mb-2">{milestone.month}</div>
                <h3 className="font-cursive text-2xl font-semibold mb-3 text-card-foreground">{milestone.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Journey videos grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Video 1 */}
          <Card className="overflow-hidden bg-card border-primary/10">
            <div className="relative aspect-video bg-secondary/50 flex items-center justify-center group">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <Play className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-muted-foreground font-medium">Journey Video 1</p>
                  <p className="text-sm text-muted-foreground/70 mt-1">(Replace with your video)</p>
                </div>
              </div>
              {<video
                className="w-full h-full object-cover"
                controls
                /*poster="/path/to/video1-thumbnail.jpg"*/
              >
                <source src="/images/video1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>}
            </div>
          </Card>

          {/* Video 2 */}
          <Card className="overflow-hidden bg-card border-primary/10">
            <div className="relative aspect-video bg-secondary/50 flex items-center justify-center group">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <Play className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-muted-foreground font-medium">Journey Video 2</p>
                  <p className="text-sm text-muted-foreground/70 mt-1">(Replace with your video)</p>
                </div>
              </div>
              {/* UNCOMMENT AND ADD YOUR VIDEO URL BELOW: */}
              {<video
                className="w-full h-full object-cover"
                controls
                /*poster="/path/to/video2-thumbnail.jpg"*/
              >
                <source src="/images/video2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>}
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}