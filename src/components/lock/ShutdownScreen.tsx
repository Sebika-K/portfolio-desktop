import { motion } from "framer-motion";

type ShutdownScreenProps = {
  onPowerOn: () => void;
};

// What's left after "Shut down": a dark, quiet screen with a nod to old
// Windows ("It's now safe to turn off your computer") and a power button
// that turns SebikaOS back on (it goes to the lock screen).
export default function ShutdownScreen({ onPowerOn }: ShutdownScreenProps) {
  return (
    <motion.div
      // Fades in slowly, like a screen powering down; fades out when turned on.
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      // A solid dark background covers the sky and clouds, in both themes.
      className="fixed inset-0 z-[2000] flex select-none flex-col items-center justify-center gap-10 bg-[#111111] text-center"
    >
      <div>
        {/* Orange text on black, like the old Windows message */}
        <p className="text-2xl font-semibold text-[#ef8e39]">
          It’s now safe to close this tab.
        </p>
        <p className="mt-2 text-sm text-white/60">
          …or turn SebikaOS back on.
        </p>
      </div>

      {/* autoFocus: keyboard users can press Enter or Space right away */}
      <button
        type="button"
        autoFocus
        onClick={onPowerOn}
        aria-label="Turn SebikaOS back on"
        title="Power on"
        className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/40 text-white/80 outline-none transition hover:border-[#ef8e39] hover:text-[#ef8e39] focus-visible:border-[#ef8e39] focus-visible:text-[#ef8e39]"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M12 3v9" />
          <path d="M6.3 6.3a8 8 0 1 0 11.4 0" />
        </svg>
      </button>
    </motion.div>
  );
}
