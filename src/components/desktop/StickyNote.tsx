import type { SectionId } from "../../data/sections";

type StickyNoteProps = {
  onOpenSection: (sectionId: SectionId) => void;
  isMobile: boolean;
};

// A paper sticky note stuck to the desktop wallpaper, telling recruiters
// I'm looking for a job. On a computer it sits in the top-right corner,
// just below the top bar. On a phone the icons wrap into a second column
// at the top, so there it moves to the empty bottom-right corner instead
// (phones have no taskbar, so bottom-6 is just above the screen's edge). Windows open on top of it, like real paper
// under real windows.
//
// To take it down once I've found a job: delete this file and the
// <StickyNote /> line in App.tsx.
export default function StickyNote({ onOpenSection, isMobile }: StickyNoteProps) {
  return (
    <aside
      aria-label="Note to recruiters"
      // -rotate-3: tilted like it was stuck on by hand.
      // hover:rotate-0: it straightens up when you point at it.
      className={`absolute right-8 w-44 ${isMobile ? "bottom-6" : "top-16"} -rotate-3 transition-transform duration-200 hover:rotate-0`}
    >
      {/* A strip of tape holding the note up */}
      <div
        aria-hidden="true"
        className="absolute -top-2 left-1/2 h-4 w-14 -translate-x-1/2 rotate-2 bg-white/60"
      />

      {/* A little flower doodle in the corner: five round petals around a
          center, drawn with outlines only so it looks hand-drawn. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 40 40"
        className="absolute -right-2 -top-3 h-9 w-9 rotate-12"
        fill="none"
        stroke="#c2577e"
        strokeWidth="1.6"
      >
        <circle cx="20" cy="10" r="6" fill="#fbd5e3" />
        <circle cx="29.5" cy="17" r="6" fill="#fbd5e3" />
        <circle cx="26" cy="28" r="6" fill="#fbd5e3" />
        <circle cx="14" cy="28" r="6" fill="#fbd5e3" />
        <circle cx="10.5" cy="17" r="6" fill="#fbd5e3" />
        <circle cx="20" cy="20" r="4" fill="#fde68a" />
      </svg>

      {/* The note itself. Fixed paper colors (not theme colors), because a
          sticky note is soft pink paper in light mode and dark mode alike. */}
      <div className="bg-[#fdf0f4] px-3.5 pb-2.5 pt-3.5 text-[#7a3550] shadow-md">
        <p className="font-indie text-lg leading-tight">psst, recruiters!</p>
        <p className="mt-1 text-xs leading-snug">
          I&rsquo;m looking for a full-time software engineering role.
        </p>

        <div className="mt-2 flex flex-col items-start gap-0.5 font-indie text-base leading-tight">
          <button
            type="button"
            onClick={() => onOpenSection("resume")}
            className="underline decoration-wavy decoration-1 underline-offset-4 hover:text-[#c2577e]"
          >
            &rarr; read my resume
          </button>
          <button
            type="button"
            onClick={() => onOpenSection("contact")}
            className="underline decoration-wavy decoration-1 underline-offset-4 hover:text-[#c2577e]"
          >
            &rarr; say hi
          </button>
        </div>
      </div>
    </aside>
  );
}
