import type { CSSProperties } from "react";

//
// Sizes and positions use vw/vh (percent of the screen), so the clouds sit
// in the same spots on any screen size. The images are the web-optimized
// copies in public/clouds/web/ (the original PNGs stay in public/clouds/).

type Cloud = {
  src: string;
  style: CSSProperties; // where it sits and how wide it is
};

const CLOUDS: Cloud[] = [
  // Layout idea: big + small clouds balanced diagonally.
  //   upper left: big cloud 4      upper right: small clouds 3 and 2
  //   lower left: medium cloud 5   lower right: the big bank (cloud 1)

  // Big bank, bottom right. right: -2vw tucks its straight cut edge just off-screen.
  { src: "/clouds/web/cloud-1.webp", style: { bottom: 0, right: "-2vw", width: "64vw" } },
  // Big cloud, upper left, peeking in from the left edge.
  { src: "/clouds/web/cloud-4.webp", style: { top: "12vh", left: "-2vw", width: "40vw" } },
  // Medium cloud, lower left.
  { src: "/clouds/web/cloud-5.webp", style: { bottom: "4vh", left: "-3vw", width: "24vw" } },
  // Small clouds on the right, staggered.
  { src: "/clouds/web/cloud-3.webp", style: { top: "8vh", right: "10vw", width: "13vw" } },
  { src: "/clouds/web/cloud-2.webp", style: { top: "38vh", right: "4vw", width: "13vw" } },
];

export default function Clouds() {
  return (
    // pointer-events-none: clicks go straight through to the desktop.
    // aria-hidden: decoration, so screen readers skip it.
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-[var(--cloud-opacity)] transition-opacity"
      aria-hidden="true"
    >
      {CLOUDS.map((cloud) => (
        <img
          key={cloud.src}
          src={cloud.src}
          alt=""
          draggable={false}
          className="absolute h-auto select-none"
          style={cloud.style}
        />
      ))}
    </div>
  );
}
