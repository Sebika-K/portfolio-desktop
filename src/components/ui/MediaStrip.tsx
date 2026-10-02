import type { ProjectMedia } from "../../data/projects"

type MediaStripProps = {
  media: ProjectMedia[]
}

// A sideways-scrolling row of screenshots and videos, like a film strip.
// snap-x makes each item settle neatly into place when you stop scrolling.
export default function MediaStrip({ media }: MediaStripProps) {
  return (
    <ul className="flex snap-x gap-3 overflow-x-auto pb-2" aria-label="Screenshots and demo">
      {media.map((item) => (
        <li key={item.src} className="shrink-0 snap-start">
          {/* w-min: the figure is only as wide as the picture, so the frame
              hugs it with no gap and the caption wraps to fit underneath. */}
          <figure className="w-min">
            <div className="overflow-hidden rounded-xl border border-line bg-cream">
              {item.type === "video" ? (
                // muted + playsInline let it play on phones without going fullscreen;
                // preload="metadata" only downloads the first bit until you press play.
                <video
                  src={item.src}
                  controls
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={item.caption}
                  className="block h-72 w-auto max-w-none"
                />
              ) : (
                // loading="lazy": the browser waits until it's about to be seen.
                <img src={item.src} alt={item.caption} loading="lazy" className="block h-72 w-auto max-w-none" />
              )}
            </div>
            <figcaption className="mt-1.5 text-[11px] leading-4 text-text-faint">
              {item.caption}
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  )
}
