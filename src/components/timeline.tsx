"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Maximize2, Play } from "lucide-react"
import { useRef, useState, useEffect } from "react"
import { ImageViewerModal } from "./image-viewer-modal"

const milestones = [
  {
    id: "1",
    month: "December 7, 2024",
    title: "The Day I Asked You Out",
    description: "The moment I gathered all my courage and asked you to be mine.",
    image: "/images/ask-her-out.jpg",
  },
  {
    id: "2",
    month: "August 21, 2025",
    title: "Our First Trip Together",
    description:
      "An adventure that brought us closer. Every moment exploring together made me fall deeper in love with you.",
    images: ["/images/before-our-first-flight.jpg", "/images/resort-in-DR-1.jpg", "/images/resort-in-DR-3.jpg"],
  },
  {
    id: "3",
    month: "January 20, 2025",
    title: "My First Birthday With You",
    description:
      "You made my birthday so special. The thoughtfulness and love you gave me, showed me how lucky I am to have you.",
    image: "/images/ant-22-bday.jpg",
  },
  {
    id: "4",
    month: "October 15, 2024",
    title: "Her First Birthday We Celebrated",
    description: "Celebrating you was pure joy. You deserve the world and more.",
    image: "/images/yami-22-bday-1.jpg",
  },
  {
    id: "5",
    month: "February 14, 2024",
    title: "Our First Valentine's Together",
    description: "Roses, chocolates, and a heart full of love.",
    images: [
      "/images/first-valentines-dinner-2.jpg",
      "/images/first-valentines-dinner-1.jpg",
      "/images/first-valentines-party.jpg",
      "/images/first-valentines-present.jpg",
    ],
  },
  {
    id: "6",
    month: "October 6, 2024",
    title: "Pumpkin Patch Adventures",
    description: "Fall vibes, pumpkins, and you by my side.",
    image: "/images/pumpkin-patch-2.jpg",
  },
  {
    id: "7",
    month: "October 6, 2024",
    title: "Her First Flowers",
    description: "The first time I gave you flowers and saw that beautiful smile.",
    image: "/images/first-flowers.jpg",
  },
  {
    id: "8",
    month: "December 9, 2025",
    title: "Our First Permanent Jewelry",
    description: "silver king and gold queen.",
    image: "/images/first-permanent-bracelets.jpg",
  },
  {
    id: "9",
    month: "",
    title: "Photo Booth Memories",
    description: "Silly faces, sweet kisses, and candid moments captured forever.",
    images: ["/images/photo-booth-1.jpg", "/images/photo-booth-2.jpg", "/images/photo-booth-3.jpg"],
  },
  {
    id: "10",
    month: "December 7, 2024",
    title: "Christmas Farm",
    description: "Twinkling lights, hot cocoa, and holiday spirit.",
    image: "/images/christmas-farm-1.jpg",
  },
  {
    id: "11",
    month: "October 19, 2024",
    title: "Our First Trip to NYC",
    description: "A lot of walking this day.",
    image: "/images/first-nyc-trip.jpg",
  },
  {
    id: "12",
    month: "June 2024",
    title: "Our College Graduation",
    description: "One of our biggest accomplishment together so far.",
    images: ["/images/yami-graduation.jpg", "/images/ant-graduation.jpg"],
  },
]

const videos = [
  {
    key: "video-1",
    poster: "/images/video1.jpg",
    src: "/images/video1.MOV",
    title: "Christmas Farm",
    description: "Mrs. Paulino with the hops.",
  },
  {
    key: "video-2",
    poster: "/images/video2.jpg",
    src: "/images/video2.MOV",
    title: "Pumpkin Patch",
    description: "Mrs. Paulino becoming a bowling master.",
  },
]

function MilestoneSlideshow({
  images,
  onFullscreen,
}: {
  images: string[]
  onFullscreen: () => void
}) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }
  const prevImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative w-full h-48 sm:h-64 md:h-80 rounded-lg overflow-hidden group">
      {images.map((img, i) => (
        <img
          key={img}
          src={img || "/placeholder.svg"}
          alt={`Slideshow image ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            i === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <Button
        variant="ghost"
        size="icon"
        onClick={onFullscreen}
        className="absolute top-2 right-2 sm:top-3 sm:right-3
            bg-white/80 hover:bg-white
            text-foreground
            rounded-full shadow-lg
            h-8 w-8 sm:h-9 sm:w-9
            transition-all hover:scale-110 active:scale-95
            opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
        >
        <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
      </Button>

      {/* Navigation buttons */}
      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={prevImage}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-foreground rounded-full shadow-lg h-8 w-8 sm:h-9 sm:w-9 transition-all hover:scale-110 active:scale-95 z-10"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextImage}
            aria-label="Next image"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-foreground rounded-full shadow-lg h-8 w-8 sm:h-9 sm:w-9 transition-all hover:scale-110 active:scale-95 z-10"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>

          {/* Dot indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/30 rounded-full px-3 py-1.5 backdrop-blur-sm z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === currentIndex ? "bg-white w-4" : "bg-white/40 w-1.5 hover:bg-white/60"
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// Timeline without the videos
// export function Timeline() {
//   const [focused, setFocused] = useState<{ index: number; origin: DOMRect | null } | null>(null)
//   const cardRefs = useRef<{ [key: number]: HTMLDivElement | null }>({})
//   const sectionRef = useRef<HTMLDivElement>(null)
//   const [sectionVisible, setSectionVisible] = useState(false)

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setSectionVisible(true)
//         }
//       },
//       { threshold: 0.1 },
//     )

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current)
//     }

//     return () => observer.disconnect()
//   }, [])

//   const closeFocused = () => {
//     setFocused(null)
//   }

//   const openFullscreen = (milestoneIndex: number) => {
//     const ref = cardRefs.current[milestoneIndex]
//     if (ref) {
//       const imgContainer = ref.querySelector(".image-container") as HTMLElement | null
//       setFocused({ index: milestoneIndex, origin: imgContainer?.getBoundingClientRect() || null })
//     } else {
//       setFocused({ index: milestoneIndex, origin: null })
//     }
//   }

//   return (
//     <section ref={sectionRef} className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6">
// 	<div className="max-w-6xl mx-auto">
//       <h2
//         className={`font-cursive text-4xl md:text-6xl font-semibold text-center mb-4 text-primary text-balance transition-all duration-700 ${
//           sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
//         }`}
//       >
//         Our Journey Together
//       </h2>
//       <p
//         className={`text-center text-muted-foreground mb-16 text-lg transition-all duration-700 delay-100 ${
//           sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
//         }`}
//       >
//         Every moment with you is a memory worth treasuring
//       </p>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
//         {milestones.map((milestone, index) => {
//           const delayMs = sectionVisible ? index * 50 : 0

//           return (
//             <div
//               key={milestone.id}
//               ref={(el) => {
//                 if (el) cardRefs.current[index] = el
//               }}
//               className={`transition-all duration-500 ${
//                 sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
//               }`}
//               style={sectionVisible ? { transitionDelay: `${delayMs}ms` } : {}}
//             >
// 				<Card
// 				className="p-4 sm:p-6 md:p-8 
// 							border border-border 
// 							shadow-sm 
// 							hover:shadow-2xl hover:-translate-y-1 hover:border-primary/40
// 							transition-all duration-300 
// 							h-full flex flex-col"
// 				>                <div className="image-container w-full mb-4">
//                   {milestone.images ? (
//                     <MilestoneSlideshow images={milestone.images} onFullscreen={() => openFullscreen(index)} />
//                   ) : milestone.image ? (
//                     <div className="relative w-full h-48 sm:h-64 md:h-72 rounded-lg overflow-hidden group">
//                       <img
//                         src={milestone.image || "/placeholder.svg"}
//                         alt={milestone.title}
//                         className="w-full h-full object-cover"
//                       />
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => openFullscreen(index)}
//                         className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/80 hover:bg-white text-foreground rounded-full shadow-lg h-8 w-8 sm:h-9 sm:w-9 transition-all hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100"
//                       >
//                         <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
//                       </Button>
//                     </div>
//                   ) : null}
//                 </div>

//                 <div className="flex-1">
//                   <div className="text-xs sm:text-sm text-primary font-medium mb-2">{milestone.month}</div>
//                   <h3 className="font-cursive text-lg sm:text-2xl font-semibold mb-2 text-card-foreground transition-colors">
//                     {milestone.title}
//                   </h3>
//                   <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">{milestone.description}</p>
//                 </div>
//               </Card>
//             </div>
//           )
//         })}
//       </div>

//       {focused && (
//         <ImageViewerModal
//           images={
//             milestones[focused.index].images ||
//             (milestones[focused.index].image ? [milestones[focused.index].image] : [])
//           }
//           title={milestones[focused.index].title}
//           month={milestones[focused.index].month}
//           isOpen={!!focused}
//           onClose={closeFocused}
//           origin={focused.origin}
//         />
//       )}
// 	</div>
//     </section>
//   )
// }

function MovingPicturesSection({ sectionVisible }: { sectionVisible: boolean }) {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null)
  const [playingKey, setPlayingKey] = useState<string | null>(null)
  const [activeKey, setActiveKey] = useState<string | null>(null)
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([])

  // Pause any other video when one starts playing
  useEffect(() => {
    if (!playingKey) return
    videoRefs.current.forEach((video, idx) => {
      const key = videos[idx]?.key
      if (key && key !== playingKey && video && !video.paused) {
        try {
          video.pause()
        } catch {
          /* ignore */
        }
      }
    })
  }, [playingKey])

  return (
    <div
      className={`transition-all duration-700 ${
        sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="max-w-3xl mx-auto text-center mb-8">
        <h3 className="text-3xl sm:text-3xl font-cursive text-primary mb-1">Moving Pictures</h3>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Short clips and candid moments — tap to play.
        </p>
      </div>

      {/* use same grid “feel” as the milestones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
        {videos.map((video, idx) => {
          const delayMs = sectionVisible ? 30 + idx * 40 : 0

          return (
            <div
              key={video.key}
              className={`transition-all duration-500 ${
                sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={sectionVisible ? { transitionDelay: `${delayMs}ms` } : {}}
            >
              <Card
                className={`p-4 sm:p-6 md:p-8 
                            border border-border 
                            shadow-sm 
                            hover:shadow-2xl hover:-translate-y-1 hover:border-primary/40
                            transition-all duration-300 
                            h-full flex flex-col ${
                              hoveredKey === video.key ? "ring-1 ring-primary/10" : ""
                            }`}
                onMouseEnter={() => setHoveredKey(video.key)}
                onMouseLeave={() => setHoveredKey((k) => (k === video.key ? null : k))}
              >
                {/* match image card: image-container + mb-4 */}
                <div className="image-container w-full mb-4">
                  <div className="relative w-full aspect-[6/7] rounded-lg overflow-hidden bg-gradient-to-b from-black/5 to-black/40">
                    {/* Poster (when not active) */}
                    <img
                      src={video.poster}
                      alt={`${video.title} poster`}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                        activeKey === video.key ? "pointer-events-none opacity-0" : "opacity-100"
                      }`}
                      loading="lazy"
                    />

                    {/* Video */}
                    <video
                      ref={(el) => {
                        videoRefs.current[idx] = el
                      }}
                      className="absolute inset-0 w-full h-full object-cover rounded-lg transform transition-opacity duration-300 will-change-opacity"
                      controls
                      controlsList="nodownload"
                      playsInline
                      onPlay={() => {
                        setPlayingKey(video.key)
                        setActiveKey(video.key)
                      }}
                      onPause={() => {
                        setPlayingKey((k) => (k === video.key ? null : k))
                      }}
                      onEnded={() => {
                        setPlayingKey((k) => (k === video.key ? null : k))
                        setActiveKey((k) => (k === video.key ? null : k))
                      }}
                      poster={video.poster}
                      style={{ opacity: playingKey === video.key ? 1 : 0.86, zIndex: 6 }}
                    >
                      <source src={video.src} type="video/mp4" />
                    </video>

                    {/* Big play button overlay */}
                    {activeKey !== video.key && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          const v = videoRefs.current[idx]
                          if (v) {
                            setActiveKey(video.key)
                            v.play().catch(() => {})
                          }
                          setHoveredKey(video.key)
                        }}
                        aria-label={`Play ${video.title}`}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 rounded-full bg-black/40 hover:bg-black/50 p-3 transition-all duration-300 hover:scale-110"
                      >
                        <Play className="w-6 h-6 text-white" />
                      </button>
                    )}
                  </div>
                </div>

                {/* text area: same spacing / vibe as milestone cards */}
                <div className="flex-1">
                  <div className="text-sm text-primary font-medium">{video.title}</div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {video.description}
                  </p>
                </div>
              </Card>
            </div>
          )
        })}
      </div>
    </div>
  )
}


export function Timeline() {
  const [focused, setFocused] = useState<{ index: number; origin: DOMRect | null } | null>(null)
  const cardRefs = useRef<{ [key: number]: HTMLDivElement | null }>({})
  const sectionRef = useRef<HTMLDivElement>(null)
  const [sectionVisible, setSectionVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const closeFocused = () => {
    setFocused(null)
  }

  const openFullscreen = (milestoneIndex: number) => {
    const ref = cardRefs.current[milestoneIndex]
    if (ref) {
      const imgContainer = ref.querySelector(".image-container") as HTMLElement | null
      setFocused({ index: milestoneIndex, origin: imgContainer?.getBoundingClientRect() || null })
    } else {
      setFocused({ index: milestoneIndex, origin: null })
    }
  }

  return (
    <section ref={sectionRef} className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <h2
          className={`font-cursive text-4xl md:text-6xl font-semibold text-center mb-4 text-primary text-balance transition-all duration-700 ${
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Our Journey Together
        </h2>
        <p
          className={`text-center text-muted-foreground mb-16 text-lg transition-all duration-700 delay-100 ${
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Every moment with you is a memory worth treasuring
        </p>

        {/* Milestone cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {milestones.map((milestone, index) => {
            const delayMs = sectionVisible ? index * 50 : 0

            return (
              <div
                key={milestone.id}
                ref={(el) => {
                  if (el) cardRefs.current[index] = el
                }}
                className={`transition-all duration-500 ${
                  sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={sectionVisible ? { transitionDelay: `${delayMs}ms` } : {}}
              >
                <Card
                  className="p-4 sm:p-6 md:p-8 
                  border border-border 
                  shadow-sm 
                  hover:shadow-2xl hover:-translate-y-1 hover:border-primary/40
                  transition-all duration-300 
                  h-full flex flex-col"
                >
                  <div className="image-container w-full mb-4">
                    {milestone.images ? (
                      <MilestoneSlideshow images={milestone.images} onFullscreen={() => openFullscreen(index)} />
                    ) : milestone.image ? (
                      <div className="relative w-full h-48 sm:h-64 md:h-72 rounded-lg overflow-hidden group">
                        <img
                          src={milestone.image || "/placeholder.svg"}
                          alt={milestone.title}
                          className="w-full h-full object-cover"
                        />
                        {/* Fullscreen button: always visible on mobile, hover-only on desktop */}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openFullscreen(index)}
                          className="absolute top-2 right-2 sm:top-3 sm:right-3
                                      bg-white/80 hover:bg-white
                                      text-foreground
                                      rounded-full shadow-lg
                                      h-8 w-8 sm:h-9 sm:w-9
                                      transition-all hover:scale-110 active:scale-95
                                      opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                          >
                          <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        </Button>
                      </div>
                    ) : null}
                  </div>

                  <div className="flex-1">
                    {milestone.month && (
                      <div className="text-xs sm:text-sm text-primary font-medium mb-2">{milestone.month}</div>
                    )}
                    <h3 className="font-cursive text-lg sm:text-2xl font-semibold mb-2 text-card-foreground transition-colors">
                      {milestone.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
                      {milestone.description}
                    </p>
                  </div>
                </Card>
              </div>
            )
          })}
        </div>

        {/* Fullscreen image viewer */}
        {focused && (
          <ImageViewerModal
            images={
              milestones[focused.index].images ||
              (milestones[focused.index].image ? [milestones[focused.index].image] : [])
            }
            title={milestones[focused.index].title}
            month={milestones[focused.index].month}
            isOpen={!!focused}
            onClose={closeFocused}
            origin={focused.origin}
          />
        )}

        {/* Moving Pictures / videos section */}
        <div className="mt-16">
          <MovingPicturesSection sectionVisible={sectionVisible} />
        </div>
      </div>
    </section>
  )
}