import type { CSSProperties } from "react"
import type { TechIconInfo } from "../../data/techIcons"

type TechIconProps = {
  icon: TechIconInfo
  size: number // in px
}

// One tech logo, grey by default and in its brand color when hovered.
//
// How: the SVG is used as a *mask* (a stencil) over a block of color, so we
// can paint the logo any color with plain CSS. bg-current = the text color
// (grey). The nearest parent with the `group` class decides when it's
// hovered; then the color switches to --brand (or the text color if a brand
// has no color set).
export default function TechIcon({ icon, size }: TechIconProps) {
  const url = `url(/icons/tech/${icon.file}.svg)`
  const style = {
    width: size,
    height: size,
    maskImage: url,
    WebkitMaskImage: url, // Safari still needs the -webkit- version
    maskSize: "contain",
    WebkitMaskSize: "contain",
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskPosition: "center",
    WebkitMaskPosition: "center",
    "--brand": icon.color,
  } as CSSProperties

  return (
    <span
      aria-hidden="true"
      style={style}
      className="inline-block shrink-0 bg-current transition-colors duration-200 group-hover:bg-[var(--brand,currentColor)]"
    />
  )
}
