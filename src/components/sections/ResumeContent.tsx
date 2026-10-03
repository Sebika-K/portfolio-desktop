import { RESUME_URL } from "../../data/links";

// The Resume window: a small toolbar on top, and the PDF itself underneath.
// The browser's own PDF viewer draws the file inside an <iframe>
// (a "window into another page"), so we don't need any PDF library.
export default function ResumeContent() {
  const buttonClass =
    "rounded-lg border-2 border-outline px-3 py-1 text-sm font-semibold transition hover:translate-y-[-1px]";

  return (
    <div className="flex h-full flex-col">
      {/* Toolbar */}
      <div className="flex shrink-0 items-center gap-2 border-b border-line px-4 py-2">
        {/* `download` tells the browser to save the file instead of opening it */}
        <a
          href={RESUME_URL}
          download="Sebika_Khulal_Resume.pdf"
          className={`${buttonClass} bg-accent text-on-accent`}
        >
          ↓ Download
        </a>
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonClass} bg-cream text-text-strong`}
        >
          ↗ Open in new tab
        </a>
      </div>

      {/* The PDF fills the rest of the window. min-h-[400px] keeps it tall
          enough on phones, where the slide-up panel has no fixed height. */}
      <div className="relative min-h-[400px] flex-1 overflow-hidden bg-white">
        {/* Keeping the PDF sharp:
            The whole desktop is zoomed by --scale to fit the screen (see
            App.tsx). Text survives zooming, but the browser's PDF viewer
            draws the page as a picture, and zooming a picture blurs it.
            So the iframe is made --scale times bigger, then shrunk by
            1 / --scale. The two cancel out against the desktop's zoom, so
            the viewer draws at the screen's real size: no stretching, no blur.
            (On phones --scale is 1, so nothing changes there.) */}
        <iframe
          src={`${RESUME_URL}#view=FitH`}
          title="Sebika Khulal's resume"
          className="absolute left-0 top-0 origin-top-left"
          style={{
            width: "calc(100% * var(--scale, 1))",
            height: "calc(100% * var(--scale, 1))",
            transform: "scale(calc(1 / var(--scale, 1)))",
          }}
        />
      </div>
    </div>
  );
}
