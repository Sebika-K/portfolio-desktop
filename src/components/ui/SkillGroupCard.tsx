type SkillGroupCardProps = {
  title: string
  items: string[]
}

export default function SkillGroupCard({
  title,
  items,
}: SkillGroupCardProps) {
  return (
    <article className="rounded-2xl border border-line bg-card/70 p-4 shadow-sm">
      <h3 className="text-sm font-bold uppercase tracking-wide text-text-strong">
        {title}
      </h3>

      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-line bg-cream px-3 py-1 text-xs font-medium text-text"
          >
            {item}
          </span>
        ))}
      </div>
    </article>
  )
}