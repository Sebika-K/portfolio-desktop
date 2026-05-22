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
          <span className="absolute h-2 w-2 animate-ping rounded-full bg-[#EF8E39]" />
          <span className="absolute -left-3 -top-3 h-8 w-8 animate-[spark_0.6s_ease-out_forwards] rounded-full border-2 border-[#EF8E39]" />
        </span>
      ))}
    </div>
  )
}