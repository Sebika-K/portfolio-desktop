import { useEffect, useRef, useState, type PointerEvent } from "react";

// The drawing's real size in pixels. On screen it's stretched to fit the
// window width (keeping this shape), so resizing the window never squashes it.
const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 780;
const BACKGROUND = "#ffffff";

// Pastels to match the desktop icons, plus black for outlines.
const COLORS = ["#2b2b2b", "#f4a7b9", "#f7c59f", "#fbe38e", "#c9e7b5", "#b8e3f3", "#c7b8ea"];
const SIZES = [4, 10, 22];

// The Paint app: pick a color and brush size, draw with mouse, pen or finger,
// erase, clear, or save your doodle as a PNG.
export default function Paint() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Where the pointer was a moment ago, so we can draw a line to where it is now.
  // A ref (not state) because it changes on every mouse movement and
  // nothing on screen needs to re-render because of it.
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  const [color, setColor] = useState(COLORS[1]);
  const [size, setSize] = useState(SIZES[1]);
  const [isEraser, setIsEraser] = useState(false);

  // Fill the canvas with white once, when Paint opens. (A new canvas is
  // see-through, which would make the saved PNG transparent.)
  useEffect(() => {
    clearCanvas();
  }, []);

  function clearCanvas() {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = BACKGROUND;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  // Convert a pointer position on the screen into canvas pixels.
  // The canvas is displayed smaller/larger than its real size (and the whole
  // desktop is scaled too), so we measure where it is on screen right now.
  function toCanvasPoint(e: PointerEvent<HTMLCanvasElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * CANVAS_WIDTH,
      y: ((e.clientY - rect.top) / rect.height) * CANVAS_HEIGHT,
    };
  }

  function drawLine(from: { x: number; y: number }, to: { x: number; y: number }) {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = isEraser ? BACKGROUND : color; // erasing = painting white
    ctx.lineWidth = isEraser ? size * 2 : size;
    ctx.lineCap = "round"; // round ends and corners make strokes look smooth
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  }

  const handlePointerDown = (e: PointerEvent<HTMLCanvasElement>) => {
    // Keep receiving moves even if the pointer leaves the canvas mid-stroke.
    e.currentTarget.setPointerCapture(e.pointerId);
    const point = toCanvasPoint(e);
    lastPoint.current = point;
    drawLine(point, point); // a single click makes a dot
  };

  const handlePointerMove = (e: PointerEvent<HTMLCanvasElement>) => {
    if (!lastPoint.current) return; // not drawing right now
    const point = toCanvasPoint(e);
    drawLine(lastPoint.current, point);
    lastPoint.current = point;
  };

  const stopDrawing = () => {
    lastPoint.current = null;
  };

  // Save: turn the canvas into a PNG and "click" a hidden download link.
  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "sebikaos-doodle.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const toolButton = "rounded-md border border-line px-2.5 py-1 text-xs font-medium text-text transition hover:bg-cream";

  return (
    <div className="flex flex-col gap-3">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-1.5" role="group" aria-label="Colors">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              aria-label={`Color ${c}`}
              aria-pressed={!isEraser && color === c}
              onClick={() => {
                setColor(c);
                setIsEraser(false);
              }}
              className={`h-6 w-6 rounded-full border-2 transition ${
                !isEraser && color === c ? "scale-110 border-outline" : "border-line"
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <div className="flex items-center gap-1.5" role="group" aria-label="Brush size">
          {SIZES.map((s) => (
            <button
              key={s}
              type="button"
              aria-label={`Brush size ${s}`}
              aria-pressed={size === s}
              onClick={() => setSize(s)}
              className={`flex h-7 w-7 items-center justify-center rounded-md border ${
                size === s ? "border-outline bg-cream" : "border-line"
              }`}
            >
              <span
                className="rounded-full bg-text"
                style={{ width: s / 2 + 2, height: s / 2 + 2 }}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          aria-pressed={isEraser}
          onClick={() => setIsEraser((v) => !v)}
          className={`${toolButton} ${isEraser ? "border-outline bg-cream" : ""}`}
        >
          Eraser
        </button>
        <button type="button" onClick={clearCanvas} className={toolButton}>
          Clear
        </button>
        <button type="button" onClick={download} className={toolButton}>
          Save PNG
        </button>
      </div>

      {/* The drawing surface. touch-none stops phones from scrolling
          the page while you draw with a finger. */}
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDrawing}
        onPointerCancel={stopDrawing}
        aria-label="Drawing canvas"
        className={`w-full touch-none rounded-lg border border-line ${
          isEraser ? "cursor-cell" : "cursor-crosshair"
        }`}
        style={{ aspectRatio: `${CANVAS_WIDTH} / ${CANVAS_HEIGHT}` }}
      />
    </div>
  );
}
