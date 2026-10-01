import type { CSSProperties } from "react";

// Sebika's hand-drawn clouds, placed around the sky, each gently swaying
// side to side (the `cloud-drift` animation lives in index.css).
//
// Sizes and positions use vw/vh (percent of the screen), so the clouds sit
// in the same spots on any screen size. The images are the web-optimized
// copies in public/clouds/web/ (the original PNGs stay in public/clouds/).

type Cloud = {
  src: string;
  style: CSSProperties; // where it sits and how wide it is
  drift: number; // how far it sways to each side, in vw
  duration: number; // seconds for one full sway there and back
  delay: number; // negative = start partway through, so clouds aren't in sync
};

const CLOUDS: Cloud[] = [
  // Layout idea: big + small clouds balanced diagonally.
  //   upper left: big cloud 4      upper right: small clouds 3 and 2
  //   lower left: medium cloud 5   lower right: the big bank (cloud 1)

  // Big bank, bottom right. right: -2vw tucks its straight cut edge just off-screen.
  { src: "/clouds/web/cloud-1.webp", style: { bottom: 0, right: "-2vw", width: "64vw" }, drift: 1.5, duration: 70, delay: -20 },
  // Big cloud, upper left, peeking in from the left edge.
  { src: "/clouds/web/cloud-4.webp", style: { top: "12vh", left: "-2vw", width: "40vw" }, drift: 2.5, duration: 55, delay: -8 },
  // Medium cloud, lower left.
  { src: "/clouds/web/cloud-5.webp", style: { bottom: "4vh", left: "-3vw", width: "24vw" }, drift: 2, duration: 62, delay: -35 },
  // Small clouds on the right, staggered.
  { src: "/clouds/web/cloud-3.webp", style: { top: "8vh", right: "10vw", width: "13vw" }, drift: 1.2, duration: 80, delay: -50 },
  { src: "/clouds/web/cloud-2.webp", style: { top: "38vh", right: "4vw", width: "13vw" }, drift: 1.2, duration: 74, delay: -12 },
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
          className="cloud-drift absolute h-auto select-none"
          style={{
            ...cloud.style,
            // Hand this cloud's own numbers to the CSS animation.
            "--drift": `${cloud.drift}vw`,
            animationDuration: `${cloud.duration}s`,
            animationDelay: `${cloud.delay}s`,
          } as CSSProperties}
        />
      ))}
    </div>
  );
}
