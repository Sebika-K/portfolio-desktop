import { useState } from "react"
import type { ProjectMedia } from "../../data/projects"

type MediaStripProps = {
  media: ProjectMedia[]
}

// A sideways-scrolling row of screenshots and videos, like a film strip.
// snap-x makes each item settle neatly into place when you stop scrolling.
export default function MediaStrip({ media }: MediaStripProps) {
  // How wide the widest video is compared to its height (e.g. 2.2 = 2.2× wider
  // than tall). 0 until a video has loaded enough to know its size.
  const [videoAspect, setVideoAspect] = useState(0)

  // Every item in the strip shares ONE height, so the row stays even.
  // Normally that's 18rem. But if a video is so wide that 18rem would make it
  // wider than the strip (and cut it off), the height shrinks just enough for
  // the video to fit. Screenshots can still run past the edge, since you scroll
  // to see them; a video you can't fully see is hard to watch.
  // 100cqw = the strip's full width (see container-type on the <ul>).
  const height = videoAspect ? `min(18rem, calc(100cqw / ${videoAspect}))` : "18rem"

  return (
    <ul
      className="flex snap-x gap-3 overflow-x-auto pb-2 [container-type:inline-size]"
      aria-label="Screenshots and demo"
    >
      {media.map((item) => (
        <li key={item.src} className="shrink-0 snap-start">
          {/* w-min: the figure is only as wide as the picture, so the frame
              hugs it with no gap and the caption wraps to fit underneath. */}
          <figure className="w-min">
            <div className="overflow-hidden rounded-xl border border-line bg-cream">
              {item.type === "video" ? (
                // muted + playsInline let it play on phones without going fullscreen;
                // preload="metadata" only downloads the first bit until you press play,
                // which is also enough to learn the video's size.
                <video
                  src={item.src}
                  controls
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={item.caption}
                  onLoadedMetadata={(e) => {
                    const v = e.currentTarget
                    if (v.videoHeight > 0) {
                      const aspect = v.videoWidth / v.videoHeight
                      setVideoAspect((prev) => Math.max(prev, aspect))
                    }
                  }}
                  style={{ height }}
                  className="block w-auto max-w-none"
                />
              ) : (
                // loading="lazy": the browser waits until it's about to be seen.
                <img
                  src={item.src}
                  alt={item.caption}
                  loading="lazy"
                  style={{ height }}
                  className="block w-auto max-w-none"
                />
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
