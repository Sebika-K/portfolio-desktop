import type { CSSProperties } from "react";

// Sebika's hand-drawn clouds.
//
//  • All five start in the balanced layout we designed and travel very
//    slowly from left to right. The big bank (cloud 1) is the slowest and
//    is drawn in front, so the others pass behind it. (Its image has its
//    cut side edges faded out, so it can travel too.)
//  • Each cloud has a MIRRORED partner following
//    half a loop behind it: the moment a cloud starts sliding out on the
//    right, its mirrored partner starts sliding in on the left.
//
// The animation itself lives in index.css (cloud-travel).
// The images are the web-optimized copies in public/clouds/web/.

type TravelingCloud = {
  src: string;
  position: CSSProperties; // its height on screen (top or bottom)
  width: string;
  loop: number; // seconds for one full loop (bigger = slower)
  delay: number; // negative = already partway along when the page loads
  restX: string; // its spot in the starting layout (also used for reduced motion)
};

// The delays put each cloud at its spot in the original layout when the page
// loads (big cloud 4 upper left, cloud 5 lower left, small 3 and 2 on the right),
// with every mirrored partner still waiting just off the left edge.
const TRAVELING: TravelingCloud[] = [
  { src: "/clouds/web/cloud-4.webp", position: { top: "12vh" }, width: "40vw", loop: 444, delay: -84, restX: "-2vw" },
  { src: "/clouds/web/cloud-5.webp", position: { bottom: "4vh" }, width: "24vw", loop: 441, delay: -47, restX: "-3vw" },
  { src: "/clouds/web/cloud-3.webp", position: { top: "8vh" }, width: "13vw", loop: 726, delay: -326, restX: "77vw" },
  { src: "/clouds/web/cloud-2.webp", position: { top: "38vh" }, width: "13vw", loop: 656, delay: -314, restX: "83vw" },
  // The big bank: last in the list so it's drawn in front, and the slowest.
  { src: "/clouds/web/cloud-1.webp", position: { bottom: 0 }, width: "64vw", loop: 1000, delay: -510, restX: "38vw" },
];

export default function Clouds() {
  return (
    // pointer-events-none: clicks go straight through to the desktop.
    // aria-hidden: decoration, so screen readers skip it.
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-[var(--cloud-opacity)] transition-opacity"
      aria-hidden="true"
    >
      {TRAVELING.map((cloud) =>
        // Two copies of each cloud: the normal one, and its mirrored partner
        // starting half a loop later (so it's exactly one screen-width behind).
        [false, true].map((mirrored) => (
          <img
            key={`${cloud.src}-${mirrored}`}
            src={cloud.src}
            alt=""
            draggable={false}
            className={`cloud-travel absolute left-0 h-auto select-none ${
              mirrored ? "cloud-partner" : ""
            }`}
            style={{
              ...cloud.position,
              width: cloud.width,
              // Hand this cloud's own numbers to the CSS animation.
              "--flip": mirrored ? -1 : 1,
              "--rest-x": cloud.restX,
              animationDuration: `${cloud.loop}s`,
              animationDelay: `${mirrored ? cloud.delay - cloud.loop / 2 : cloud.delay}s`,
            } as CSSProperties}
          />
        )),
      )}
    </div>
  );
}
