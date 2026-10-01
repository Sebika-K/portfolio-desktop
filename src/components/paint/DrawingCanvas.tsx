import {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
  type Ref,
} from "react";

const BACKGROUND = "#ffffff";

// Pastels to match the desktop icons, plus black for outlines.
const COLORS = ["#2b2b2b", "#f4a7b9", "#f7c59f", "#fbe38e", "#c9e7b5", "#b8e3f3", "#c7b8ea"];
const SIZES = [4, 10, 22];

// Things a parent component can ask the canvas to do, through a ref.
// (Paint uses toDataURL to save; the Guestbook uses toBlob to upload.)
export type DrawingCanvasHandle = {
  hasDrawing: () => boolean; // has anything been drawn since the last clear?
  clear: () => void;
  toDataURL: () => string;
  toBlob: () => Promise<Blob | null>;
};

type DrawingCanvasProps = {
  width: number; // the drawing's real size in pixels
  height: number;
  ref?: Ref<DrawingCanvasHandle>; // in React 19, `ref` is a normal prop
  extraTools?: ReactNode; // extra buttons for the toolbar (e.g. Save PNG)
};

// A reusable drawing pad: color picker, brush sizes, eraser, clear, and the
// canvas itself. Paint and the Guestbook both use it, so the drawing code
// lives in one place.
export default function DrawingCanvas({
  width,
  height,
  ref,
  extraTools,
}: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const drewSomething = useRef(false);

  const [color, setColor] = useState(COLORS[1]);
  const [size, setSize] = useState(SIZES[1]);
  const [isEraser, setIsEraser] = useState(false);

  function clearCanvas() {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = BACKGROUND;
    ctx.fillRect(0, 0, width, height);
    drewSomething.current = false;
  }

  // Start with a white background (a new canvas is see-through).
  useEffect(() => {
    clearCanvas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Expose a few actions to the parent (see DrawingCanvasHandle above).
  useImperativeHandle(ref, () => ({
    hasDrawing: () => drewSomething.current,
    clear: clearCanvas,
    toDataURL: () => canvasRef.current?.toDataURL("image/png") ?? "",
    // canvas.toBlob uses a callback; wrapping it in a Promise lets us `await` it.
    toBlob: () =>
      new Promise((resolve) => {
        if (!canvasRef.current) return resolve(null);
        canvasRef.current.toBlob(resolve, "image/png");
      }),
  }));

  // Screen position → canvas pixels (works no matter how the canvas or
  // the whole desktop is scaled on screen).
  function toCanvasPoint(e: PointerEvent<HTMLCanvasElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * width,
      y: ((e.clientY - rect.top) / rect.height) * height,
    };
  }

  function drawLine(from: { x: number; y: number }, to: { x: number; y: number }) {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = isEraser ? BACKGROUND : color;
    ctx.lineWidth = isEraser ? size * 2 : size;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  }

  const handlePointerDown = (e: PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const point = toCanvasPoint(e);
    lastPoint.current = point;
    if (!isEraser) drewSomething.current = true;
    drawLine(point, point);
  };

  const handlePointerMove = (e: PointerEvent<HTMLCanvasElement>) => {
    if (!lastPoint.current) return;
    const point = toCanvasPoint(e);
    drawLine(lastPoint.current, point);
    lastPoint.current = point;
  };

  const stopDrawing = () => {
    lastPoint.current = null;
  };

  const toolButton =
    "rounded-md border border-line px-2.5 py-1 text-xs font-medium text-text transition hover:bg-cream";

  return (
    <div className="flex flex-col gap-3">
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
        {extraTools}
      </div>

      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDrawing}
        onPointerCancel={stopDrawing}
        aria-label="Drawing canvas"
        className={`w-full touch-none rounded-lg border border-line ${
          isEraser ? "cursor-cell" : "cursor-crosshair"
        }`}
        style={{ aspectRatio: `${width} / ${height}` }}
      />
    </div>
  );
}
