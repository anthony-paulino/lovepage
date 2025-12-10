"use client"

import { Card } from "@/components/ui/card"
import { Play, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState, useRef } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

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
		description: "The moment I gathered all my courage and asked you to be mine.",
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
		description: "Celebrating you was pure joy. You deserve the world and more.",
		image: "/images/yami-22-bday-1.JPEG",
	},
	{
		month: "February 14, 2024",
		title: "Our First Valentine's Together",
		description: "Roses, chocolates, and a heart full of love.",
		// SLIDESHOW: Add Valentine's Day photos
		images: [
			"/images/first-valentines-dinner-2.jpg",
			"/images/first-valentines-dinner-1.JPG",
			"/images/first-valentines-party.jpg",
			"/images/first-valentines-present.jpg",
		],
	},
	{
		month: "October 6, 2024",
		title: "Pumpkin Patch Adventures",
		description: "Fall vibes, pumpkins, and you by my side.",
		image: "/images/pumpkin-patch-2.JPEG",
	},
	{
		month: "October 6, 2024",
		title: "Her First Flowers",
		description: "The first time I gave you flowers and saw that beautiful smile.",
		image: "/images/first-flowers.JPG",
	},
	{
		month: "December 9, 2025",
		title: "Our First Permanent Jewelry",
		description: "silver king and gold queen.",
		image: "/images/first-permanent-bracelets.jpg",
	},
	{
		month: "",
		title: "Photo Booth Memories",
		description: "Silly faces, sweet kisses, and candid moments captured forever.",
		images: ["/images/photo-booth-1.JPG", "/images/photo-booth-2.jpg", "/images/photo-booth-3.JPG"],
	},
	{
		month: "December 7 2024",
		title: "Christmas Farm",
		description: "Twinkling lights, hot cocoa, and holiday spirit.",
		// SLIDESHOW: Add Christmas farm photos
		image: "/images/christmas-farm-1.jpg",
	},
	{
		month: "November 2024",
		title: "Our First Trip to NYC",
		description: "A lot of walking this day.",
		image: "/images/first-nyc-trip.jpg",
	},
]

// REPLACE: smoother slideshow using sliding transform + aspect ratio
function MilestoneSlideshow({ images }: { images: string[] }) {
	const [currentIndex, setCurrentIndex] = useState(0)

	const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length)
	const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)

	return (
		<div className="relative w-full aspect-video overflow-hidden bg-black/5 shadow-sm">
			{/* sliding strip */}
			<div
				className="absolute inset-0 flex h-full will-change-transform"
				style={{
					transform: `translateX(-${currentIndex * 100}%)`,
					transition: "transform 420ms cubic-bezier(.22,.9,.3,1)",
				}}
			>
				{images.map((img, i) => (
					<img
						key={img + i}
						src={img || "/placeholder.svg"}
						alt={`Memory ${i + 1}`}
						loading="lazy"
						decoding="async"
						// NOTE: image is NOT rounded — card will clip to its rounded corners
						className="flex-shrink-0 w-full h-full object-cover will-change-transform transform transition-transform duration-400 ease-[cubic-bezier(.22,.9,.3,1)]"
					/>
				))}
			</div>

			{/* soft overlay + vignette */}
			<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/6 mix-blend-overlay" />

			{/* Controls */}
			<Button
				variant="ghost"
				size="icon"
				onClick={prevImage}
				className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-foreground rounded-full shadow-md h-9 w-9"
				aria-label="Previous image"
			>
				<ChevronLeft className="w-4 h-4" />
			</Button>
			<Button
				variant="ghost"
				size="icon"
				onClick={nextImage}
				className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-foreground rounded-full shadow-md h-9 w-9"
				aria-label="Next image"
			>
				<ChevronRight className="w-4 h-4" />
			</Button>

			{/* indicators */}
			<div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
				{images.map((_, i) => (
					<button
						key={i}
						onClick={() => setCurrentIndex(i)}
						className={`h-1.5 rounded-full transition-all ${i === currentIndex ? "bg-white w-6" : "bg-white/40 w-2"}`}
						aria-label={`Go to image ${i + 1}`}
					/>
				))}
			</div>
		</div>
	)
}

// --- UPDATED FocusedViewer: remove description; add slide transition for images ---
function FocusedViewer({
	milestone,
	onClose,
	origin,
}: {
	milestone: (typeof milestones)[number]
	onClose: () => void
	origin?: DOMRect | null
}) {
	const images = milestone.images || (milestone.image ? [milestone.image] : [])
	const [index, setIndex] = useState(0)
	const [visible, setVisible] = useState(false)
	// initialize with null so useRef has an initial value (TypeScript requirement)
	const escHandlerRef = useRef<((e: KeyboardEvent) => void) | null>(null)
	const [initialTransform, setInitialTransform] = useState<string>("translate(0px,0px) scale(0.86)")

	useEffect(() => {
		setIndex(0)

		// compute initial translate delta from clicked image center -> viewport center (safe fallback)
		if (!origin) {
			setInitialTransform("translate(0px,0px) scale(0.86)")
		} else {
			const vw = window.innerWidth
			const vh = window.innerHeight
			const centerX = vw / 2
			const centerY = vh / 2
			const originCenterX = origin.left + origin.width / 2
			const originCenterY = origin.top + origin.height / 2
			const deltaX = originCenterX - centerX
			const deltaY = originCenterY - centerY
			setInitialTransform(`translate(${deltaX}px, ${deltaY}px) scale(0.86)`)
		}

		// small tick to kick the transition to final state
		const t = requestAnimationFrame(() => setVisible(true))
		return () => cancelAnimationFrame(t)
	}, [milestone, origin])

	useEffect(() => {
		escHandlerRef.current = (e: KeyboardEvent) => {
			if (e.key === "Escape") handleClose()
			if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length)
			if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + images.length) % images.length)
		}
		const handler = (e: KeyboardEvent) => escHandlerRef.current?.(e)
		window.addEventListener("keydown", handler)
		return () => window.removeEventListener("keydown", handler)
	}, [images.length])

	useEffect(() => {
		// lock scroll while open
		const prev = document.body.style.overflow
		document.body.style.overflow = "hidden"
		return () => {
			document.body.style.overflow = prev
		}
	}, [])

	const handleClose = () => {
		setVisible(false)
		setTimeout(() => {
			onClose()
		}, 220)
	}

	return (
		<div
			role="dialog"
			aria-modal="true"
			className={`fixed inset-0 z-50 flex items-center justify-center p-6 transition-all`}
			style={{
				backgroundColor: visible ? "rgba(0,0,0,0.72)" : "rgba(0,0,0,0.0)",
				backdropFilter: visible ? "blur(6px)" : "none",
			}}
			onClick={handleClose}
		>
			<div
				className={`relative w-[92vw] h-[84vh] max-w-5xl rounded-lg flex items-center justify-center transform transition-all duration-220`}
				onClick={(e) => e.stopPropagation()}
				style={{
					transform: visible ? "translate(0px, 0px) scale(1)" : initialTransform,
					opacity: visible ? 1 : 0,
				}}
			>
				{/* Image / slideshow: absolute images with slide transition */}
				<div className="relative w-full h-full flex items-center justify-center overflow-hidden">
					{images.map((src, i) => {
						const offset = (i - index) * 100
						const isActive = i === index
						return (
							<img
								key={src + i}
								src={src || "/placeholder.svg"}
								alt={`${milestone.title} ${i + 1}`}
								// absolute full-size image; transforms handle slide
								style={{
									position: "absolute",
									left: 0,
									top: 0,
									width: "100%",
									height: "100%",
									objectFit: "contain",
									transform: `translateX(${offset}%) ${isActive ? "scale(1)" : "scale(0.97)"}`,
									transition: "transform 320ms cubic-bezier(.22,.9,.3,1), opacity 240ms ease",
									opacity: isActive ? 1 : 0.9,
								}}
								className="rounded-lg shadow-2xl bg-black/80 will-change-transform"
							/>
						)
					})}

					{/* Prev / Next */}
					{images.length > 1 && (
						<>
							<button
								aria-label="Previous"
								onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
								className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/20 hover:bg-white/30 p-2"
							>
								<ChevronLeft className="w-5 h-5 text-white" />
							</button>
							<button
								aria-label="Next"
								onClick={() => setIndex((i) => (i + 1) % images.length)}
								className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/20 hover:bg-white/30 p-2"
							>
								<ChevronRight className="w-5 h-5 text-white" />
							</button>

							{/* indicators */}
							<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
								{images.map((_, i) => (
									<button
										key={i}
										onClick={() => setIndex(i)}
										className={`h-2 rounded-full transition-all ${i === index ? "bg-white w-8" : "bg-white/40 w-2"}`}
										aria-label={`Go to image ${i + 1}`}
									/>
								))}
							</div>
						</>
					)}

					{/* Close button */}
					<button
						onClick={handleClose}
						aria-label="Close viewer"
						className="absolute top-4 right-4 z-30 rounded-full bg-white/20 hover:bg-white/30 p-2"
					>
						✕
					</button>
				</div>

				{/* title / month only (description removed) */}
				<div className="absolute top-6 left-6 right-6 text-center text-sm text-white/90 pointer-events-none">
					<div className="font-medium">{milestone.title}</div>
					{milestone.month && <div className="text-xs text-white/70 mt-1">{milestone.month}</div>}
				</div>
			</div>
		</div>
	)
}
// --- END FocusedViewer ---

export function Timeline() {
  	const { ref, isVisible } = useScrollAnimation()

	// ...existing state...
	const [mounted, setMounted] = useState(false)
	// focused holds index and origin rect to animate from card -> modal
	const [focused, setFocused] = useState<{ index: number; origin?: DOMRect | null } | null>(null)
	const closeFocused = () => setFocused(null)

	// NEW: interactive hover + video playing state
	const [hoveredKey, setHoveredKey] = useState<string | null>(null)
	const [playingKey, setPlayingKey] = useState<string | null>(null)

	// NEW: track which video was activated (played at least once).
	const [activeKey, setActiveKey] = useState<string | null>(null)

	const videoRefs = useRef<Array<HTMLVideoElement | null>>([])

	useEffect(() => {
		setMounted(true)
	}, [])

	// --- NEW: pause other videos when one starts playing ---
	useEffect(() => {
		if (!playingKey) return
		videoRefs.current.forEach((v, i) => {
			const key = `video-${i + 1}`
			if (key !== playingKey && v && !v.paused) {
				try {
					v.pause()
				} catch {
					/* ignore pause errors */
				}
			}
		})
	}, [playingKey])

	return (
		<section className="relative min-h-screen flex items-center py-24 px-4 bg-gradient-to-b from-background to-secondary/30">
			
			{/* Focused viewer shown when an item is clicked */}
			{focused !== null && <FocusedViewer milestone={milestones[focused.index]} origin={focused.origin} onClose={closeFocused} />}
			<div className="max-w-6xl mx-auto w-full">
				<h2 className="font-cursive text-4xl md:text-6xl font-semibold text-center mb-4 text-primary text-balance" >
					Our Journey Together
				</h2>
				<p className="text-center text-muted-foreground mb-16 text-lg">
					Every moment with you is a memory worth treasuring
				</p>

				{/* Journey milestones grid - modern responsive auto-fill layout */}
				<div
					className={`grid gap-8 transition-all duration-500 mb-16 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
					style={{
						gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
						gridAutoRows: "minmax(220px, auto)",
						gridAutoFlow: "dense",
					}}
				>
					{milestones.map((milestone, index) => (
						<Card
							key={index}
							// subtle glass, lift + staggered reveal
							className={`overflow-hidden transition-transform duration-400 transform-gpu rounded-xl bg-gradient-to-br from-white/3 to-white/2 border border-white/6 backdrop-blur-sm ${
								hoveredKey === `ms-${index}` ? "scale-[1.035] shadow-2xl ring-1 ring-primary/10" : hoveredKey !== null ? "opacity-90" : "hover:shadow-lg hover:ring-1 hover:ring-primary/6"
							}`}
							style={{ transitionDelay: `${index * 40}ms` }}
							onMouseEnter={() => setHoveredKey(`ms-${index}`)}
							onMouseLeave={() => setHoveredKey((k) => (k === `ms-${index}` ? null : k))}
							onClick={(e) => {
								// capture image rect (prefer first img inside card)
								const cardEl = e.currentTarget as HTMLElement
								const imgEl = cardEl.querySelector("img") as HTMLImageElement | null
								const rect = imgEl ? imgEl.getBoundingClientRect() : undefined
								setFocused({ index, origin: rect })
							}}
							role="button"
							tabIndex={0}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									e.preventDefault()
									setFocused({ index, origin: undefined })
								}
							}}
						>
							{/* image area: use aspect wrapper but DO NOT round the inner container;
	    the Card's rounded corners will clip the media so image appears flush */}
							<div className={`relative overflow-hidden will-change-transform transition-transform duration-400 ${hoveredKey === `ms-${index}` ? "scale-[1.03]" : "scale-100"}`}>
								{milestone.images ? (
									<MilestoneSlideshow images={milestone.images} />
								) : (
									<div className="w-full aspect-video bg-secondary/50 overflow-hidden">
										{/* image is NOT rounded so it fits flush with the card; keep gentle transform */}
										<img
											src={milestone.image || "/placeholder.svg"}
											alt={milestone.title}
											loading="lazy"
											decoding="async"
											className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(.22,.9,.3,1)] will-change-transform"
										/>
										{/* soft vignette overlay (no rounding on image) */}
										<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/6 to-transparent mix-blend-overlay" />
									</div>
								)}
							</div>

							{/* content: soft spacing and controlled lines */}
							<div className="p-6 pb-7 transition-colors duration-300">
								<div className="text-sm text-primary font-medium mb-2">{milestone.month}</div>
								<h3 className="font-cursive text-2xl font-semibold mb-2 text-card-foreground transition-colors">{milestone.title}</h3>
								<p className="text-muted-foreground leading-relaxed text-sm line-clamp-3">{milestone.description}</p>
							</div>
						</Card>
					))}
				</div>

				{/* small transition header so photos -> videos feels intentional */}
				<div className="max-w-3xl mx-auto text-center mb-8">
					<h3 className="text-xl font-cursive text-primary mb-1">Moving Pictures</h3>
					<p className="text-sm text-muted-foreground">Short clips and candid moments — tap to play.</p>
				</div>

				{/* Journey videos grid - same modern responsive behavior with poster-overlay crossfade */}
				<div
					className="grid gap-8 max-w-6xl mx-auto"
					style={{
						gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
						gridAutoRows: "minmax(220px, auto)",
						gridAutoFlow: "dense",
					}}
				>
					{/* Video 1 */}
					<Card
						className={`bg-card border-primary/6 transition-transform duration-400 transform-gpu rounded-xl overflow-hidden ${
							hoveredKey === "video-1" ? "scale-103 shadow-2xl ring-1 ring-primary/10 backdrop-blur-sm" : "hover:shadow-lg hover:scale-102"
						}`}
						onMouseEnter={() => setHoveredKey("video-1")}
						onMouseLeave={() => setHoveredKey((k) => (k === "video-1" ? null : k))}
						style={{ transitionDelay: "30ms" }}
					>
						<div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gradient-to-b from-black/5 to-black/2">
							{/* poster overlay (hidden once activated) */}
							<img
								src="/images/video1.jpg"
								alt="Video 1 poster"
								className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-420 ${activeKey === "video-1" ? "pointer-events-none" : ""}`}
								style={{ opacity: activeKey === "video-1" ? 0 : 1, zIndex: 8 }}
								loading="lazy"
							/>

							<video
								ref={(el) => {
									videoRefs.current[0] = el
								}}
								className="absolute inset-0 w-full h-full object-cover rounded-lg transform transition-opacity duration-420 will-change-opacity"
								controls
								controlsList="nodownload"
								playsInline
								onPlay={() => {
									setPlayingKey("video-1")
									setActiveKey("video-1")
								}}
								onPause={() => {
									// keep activeKey so poster does NOT reappear on pause
									setPlayingKey((k) => (k === "video-1" ? null : k))
								}}
								onEnded={() => {
									// when video fully ends, return to poster state
									setPlayingKey((k) => (k === "video-1" ? null : k))
									setActiveKey((k) => (k === "video-1" ? null : k))
								}}
								poster="/images/video1.jpg"
								style={{ opacity: playingKey === "video-1" ? 1 : 0.86, zIndex: 6 }}
							>
								<source src="/images/video1.mp4" type="video/mp4" />
							</video>

							{/* soft play CTA: only show before the video was activated */}
							{activeKey !== "video-1" && (
								<button
									onClick={(e) => {
										e.stopPropagation()
										const v = videoRefs.current[0]
										if (v) {
											// mark active then attempt to play
											setActiveKey("video-1")
											v.play().catch(() => {})
										}
										setHoveredKey("video-1")
									}}
									aria-label="Play video 1"
									className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 rounded-full bg-black/40 hover:bg-black/50 p-3 transition-all duration-300"
								>
									<Play className="w-6 h-6 text-white" />
								</button>
							)}
						</div>

						<div className="p-4">
							<div className="text-sm text-primary font-medium">Christmas Farm</div>
							<p className="text-xs text-muted-foreground mt-1 line-clamp-2">Mrs. Paulino with the hops.</p>
						</div>
					</Card>

					{/* Video 2 */}
					<Card
						className={`bg-card border-primary/6 transition-transform duration-400 transform-gpu rounded-xl overflow-hidden ${
							hoveredKey === "video-2" ? "scale-103 shadow-2xl ring-1 ring-primary/10 backdrop-blur-sm" : "hover:shadow-lg hover:scale-102"
						}`}
						onMouseEnter={() => setHoveredKey("video-2")}
						onMouseLeave={() => setHoveredKey((k) => (k === "video-2" ? null : k))}
						style={{ transitionDelay: "60ms" }}
					>
						<div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gradient-to-b from-black/5 to-black/2">
							<img
								src="/images/video2.jpg"
								alt="Video 2 poster"
								className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-420 ${activeKey === "video-2" ? "pointer-events-none" : ""}`}
								style={{ opacity: activeKey === "video-2" ? 0 : 1, zIndex: 8 }}
								loading="lazy"
							/>

							<video
								ref={(el) => {
									videoRefs.current[1] = el
								}}
								className="absolute inset-0 w-full h-full object-cover rounded-lg transform transition-opacity duration-420 will-change-opacity"
								controls
								controlsList="nodownload"
								playsInline
								onPlay={() => {
									setPlayingKey("video-2")
									setActiveKey("video-2")
								}}
								onPause={() => {
									setPlayingKey((k) => (k === "video-2" ? null : k))
								}}
								onEnded={() => {
									setPlayingKey((k) => (k === "video-2" ? null : k))
									setActiveKey((k) => (k === "video-2" ? null : k))
								}}
								poster="/images/video2.jpg"
								style={{ opacity: playingKey === "video-2" ? 1 : 0.86, zIndex: 6 }}
							>
								<source src="/images/video2.mp4" type="video/mp4" />
							</video>

							{activeKey !== "video-2" && (
								<button
									onClick={(e) => {
										e.stopPropagation()
										const v = videoRefs.current[1]
										if (v) {
											setActiveKey("video-2")
											v.play().catch(() => {})
										}
										setHoveredKey("video-2")
									}}
									aria-label="Play video 2"
									className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 rounded-full bg-black/40 hover:bg-black/50 p-3 transition-all duration-300"
								>
									<Play className="w-6 h-6 text-white" />
								</button>
							)}
						</div>

						<div className="p-4">
							<div className="text-sm text-primary font-medium">Pumpkin Patch</div>
							<p className="text-xs text-muted-foreground mt-1 line-clamp-2">Mrs. Paulino becoming a bowling master.</p>
						</div>
					</Card>
				</div>
			</div>
		</section>
	)
}
