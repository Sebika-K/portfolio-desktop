import { useRef } from "react";
import DrawingCanvas, { type DrawingCanvasHandle } from "./DrawingCanvas";

// The Paint app: the shared drawing pad, plus a "Save PNG" button.
// (All the drawing code now lives in DrawingCanvas.tsx.)
export default function Paint() {
  const canvas = useRef<DrawingCanvasHandle>(null);

  // Save: turn the drawing into a PNG and "click" a hidden download link.
  const download = () => {
    const url = canvas.current?.toDataURL();
    if (!url) return;
    const link = document.createElement("a");
    link.download = "sebikaos-doodle.png";
    link.href = url;
    link.click();
  };

  return (
    <DrawingCanvas
      ref={canvas}
      width={1200}
      height={780}
      extraTools={
        <button
          type="button"
          onClick={download}
          className="rounded-md border border-line px-2.5 py-1 text-xs font-medium text-text transition hover:bg-cream"
        >
          Save PNG
        </button>
      }
    />
  );
}
