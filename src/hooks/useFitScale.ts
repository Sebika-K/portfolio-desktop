import { useEffect, useState } from "react";

// The screen size (in CSS pixels) the desktop is designed for.
// On a screen exactly this size, the desktop is drawn at its normal size (scale 1).
// Make these numbers bigger to make everything smaller, or smaller to make it bigger.
export const DESIGN_WIDTH = 1200;
export const DESIGN_HEIGHT = 720;

// How much to grow/shrink the desktop so it fits the current screen.
// Math.min picks whichever side runs out of room first, so it always fits.
function getScale() {
  return Math.min(
    window.innerWidth / DESIGN_WIDTH,
    window.innerHeight / DESIGN_HEIGHT,
  );
}

// Returns the current scale and updates it whenever the window is resized.
// Browser zoom (Cmd + / Cmd −) also counts as a resize, which is the point:
// zooming out makes the screen "wider" in CSS pixels, so the scale goes up
// and the desktop stays the same size on screen instead of shrinking.
export default function useFitScale() {
  const [scale, setScale] = useState(getScale);

  useEffect(() => {
    const handleResize = () => setScale(getScale());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return scale;
}
