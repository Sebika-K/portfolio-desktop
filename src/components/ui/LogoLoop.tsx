import { useEffect, useRef, useState, type ReactNode } from "react"

// A strip of items that slides sideways forever and eases to a stop on hover.
// Based on React Bits' "Logo Loop" (reactbits.dev/animations/logo-loop),
// trimmed down to what this site needs.
//
// The trick: draw the list several times in a row, slide the whole row left,
// and the moment it has moved exactly one list-width, jump back to the start.
// Because copy 2 looks identical to copy 1, the jump is invisible.

type LoopItem = {
  key: string
  node: ReactNode
}

type LogoLoopProps = {
  items: LoopItem[]
  speed?: number // pixels per second
  gap?: number // space between items, in px
  fadeColor?: string // the background behind the strip, for the soft edges
  ariaLabel?: string
}

// How quickly speed changes when you hover in/out (bigger = slower ease).
const EASE_SECONDS = 0.25

export default function LogoLoop({
  items,
  speed = 40,
  gap = 36,
  fadeColor = "var(--color-window)",
  ariaLabel = "Technologies",
}: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const firstCopyRef = useRef<HTMLUListElement>(null)

  const [copyWidth, setCopyWidth] = useState(0) // width of one copy of the list
  const [copies, setCopies] = useState(2) // how many copies fill the strip
  const [isHovered, setIsHovered] = useState(false)

  // Measure the list, and re-measure whenever its size changes.
  // offsetWidth is used on purpose: the desktop is shrunk/grown with
  // transform: scale(), and offsetWidth ignores that, so it matches the
  // pixel units we slide by. (getBoundingClientRect would include the scale
  // and the loop would visibly "jump".)
  useEffect(() => {
    const measure = () => {
      const listWidth = firstCopyRef.current?.offsetWidth ?? 0
      const stripWidth = containerRef.current?.offsetWidth ?? 0
      if (listWidth === 0) return
      setCopyWidth(listWidth)
      // Enough copies to cover the strip, plus one spare sliding in.
      setCopies(Math.max(2, Math.ceil(stripWidth / listWidth) + 1))
    }
    // ResizeObserver also fires once right away, so this covers the first measure.
    const observer = new ResizeObserver(measure)
    if (containerRef.current) observer.observe(containerRef.current)
    if (firstCopyRef.current) observer.observe(firstCopyRef.current)
    return () => observer.disconnect()
  }, [items])

  // The animation: every frame, move a little left (requestAnimationFrame
  // runs once per screen refresh). Refs keep position and speed between frames.
  const offsetRef = useRef(0)
  const velocityRef = useRef(0)
  useEffect(() => {
    const track = trackRef.current
    if (!track || copyWidth === 0) return
    // Respect visitors who turned on "reduce motion" in their system settings.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let frame = 0
    let lastTime: number | null = null
    const tick = (now: number) => {
      const seconds = lastTime === null ? 0 : (now - lastTime) / 1000
      lastTime = now
      // Ease toward the target speed: full speed normally, 0 while hovered.
      const target = isHovered ? 0 : speed
      velocityRef.current += (target - velocityRef.current) * (1 - Math.exp(-seconds / EASE_SECONDS))
      // % copyWidth = after one full list-width, wrap back to 0 (the invisible jump).
      offsetRef.current = (offsetRef.current + velocityRef.current * seconds) % copyWidth
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [copyWidth, isHovered, speed])

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label={ariaLabel}
      className="relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Soft fade on both edges, so logos melt in and out instead of being cut */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12"
        style={{ background: `linear-gradient(to right, ${fadeColor}, transparent)` }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12"
        style={{ background: `linear-gradient(to left, ${fadeColor}, transparent)` }}
      />

      <div ref={trackRef} className="flex w-max will-change-transform">
        {Array.from({ length: copies }, (_, copy) => (
          // Only the first copy is read by screen readers; the rest are repeats.
          <ul
            key={copy}
            ref={copy === 0 ? firstCopyRef : undefined}
            aria-hidden={copy > 0}
            className="flex items-center"
          >
            {items.map((item) => (
              <li key={item.key} className="flex-none" style={{ marginRight: gap }}>
                {item.node}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
