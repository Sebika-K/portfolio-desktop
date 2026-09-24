import { type ReactNode, useState } from "react"

type Spark = {
  id: number
  x: number
  y: number
}

type ClickSparkProps = {
  children: ReactNode
}

export default function ClickSpark({ children }: ClickSparkProps) {
  const [sparks, setSparks] = useState<Spark[]>([])

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()

    const newSpark = {
      id: Date.now(),
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }

    setSparks((prev) => [...prev, newSpark])

    setTimeout(() => {
      setSparks((prev) => prev.filter((spark) => spark.id !== newSpark.id))
    }, 600)
  }

  return (
    <div onMouseEnter={handleClick} className="relative inline-block">
      {children}

      {sparks.map((spark) => (
        <span
          key={spark.id}
          className="pointer-events-none absolute left-0 top-0"
          style={{
            transform: `translate(${spark.x}px, ${spark.y}px)`,
          }}
        >
          {Array.from({ length: 10 }).map((_, i) => {
            const angle = (360 / 10) * i

            return (
              <span
                key={i}
                className="absolute h-[2px] w-3 origin-left rounded-full bg-[#EF8E39] animate-[sparkLine_0.5s_ease-out_forwards]"
                style={{
                  transform: `rotate(${angle}deg)`,
                }}
              />
            )
          })}
        </span>
      ))}
    </div>
  )
}