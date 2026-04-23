type SkillGroupCardProps = {
  title: string
  items: string[]
}

export default function SkillGroupCard({
  title,
  items,
}: SkillGroupCardProps) {
  return (
    <article className="rounded-2xl border border-neutral-300 bg-white/70 p-4 shadow-sm">
      <h3 className="text-sm font-bold uppercase tracking-wide text-neutral-800">
        {title}
      </h3>

      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-neutral-300 bg-[#f8f4ea] px-3 py-1 text-xs font-medium text-neutral-700"
          >
            {item}
          </span>
        ))}
      </div>
    </article>
  )
}