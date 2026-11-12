import type { SectionId } from "../../data/sections";

type StickyNoteProps = {
  onOpenSection: (sectionId: SectionId) => void;
};

// A paper sticky note stuck to the desktop wallpaper, telling recruiters
// I'm looking for a job. It sits in the top-right corner, away from the
// icon column on the left. Windows open on top of it, like real paper
// under real windows.
//
// To take it down once I've found a job: delete this file and the
// <StickyNote /> line in App.tsx.
export default function StickyNote({ onOpenSection }: StickyNoteProps) {
  return (
    <aside
      aria-label="Note to recruiters"
      // -rotate-3: tilted like it was stuck on by hand.
      // hover:rotate-0: it straightens up when you point at it.
      className="absolute right-8 top-16 w-52 -rotate-3 transition-transform duration-200 hover:rotate-0"
    >
      {/* A strip of tape holding the note up */}
      <div
        aria-hidden="true"
        className="absolute -top-2.5 left-1/2 h-5 w-16 -translate-x-1/2 rotate-2 bg-white/60"
      />

      {/* The note itself. Fixed paper colors (not theme colors), because a
          sticky note is yellow paper in light mode and dark mode alike. */}
      <div className="bg-[#fde68a] px-4 pb-3 pt-4 text-[#5b4214] shadow-md">
        <p className="font-indie text-xl leading-tight">psst, recruiters!</p>
        <p className="mt-1.5 text-sm leading-snug">
          I&rsquo;m looking for a full-time software engineering role.
        </p>

        <div className="mt-3 flex flex-col items-start gap-1 font-indie text-lg leading-tight">
          <button
            type="button"
            onClick={() => onOpenSection("resume")}
            className="underline decoration-wavy decoration-1 underline-offset-4 hover:text-[#c2410c]"
          >
            &rarr; read my resume
          </button>
          <button
            type="button"
            onClick={() => onOpenSection("contact")}
            className="underline decoration-wavy decoration-1 underline-offset-4 hover:text-[#c2410c]"
          >
            &rarr; say hi
          </button>
        </div>
      </div>
    </aside>
  );
}
