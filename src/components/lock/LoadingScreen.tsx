import { motion } from "framer-motion";

// A short "booting up" screen between the lock screen and the desktop.
// App.tsx decides how long it shows; the bar is timed to match.
export default function LoadingScreen({ duration }: { duration: number }) {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[2000] flex flex-col items-center justify-center gap-4 text-[#2c4a63]"
      role="status"
      aria-label="Loading SebikaOS"
    >
      {/* Same frosted glass and navy text as the lock screen */}
      <p className="rounded-full border border-white/60 bg-white/45 px-5 py-1.5 text-sm font-semibold uppercase tracking-[0.3em] backdrop-blur-md">
        Loading
      </p>

      {/* Progress bar: the inner bar grows from 0% to 100% width */}
      <div className="h-2 w-48 overflow-hidden rounded-full bg-white/45 backdrop-blur-md">
        <motion.div
          className="h-full rounded-full bg-[#2c4a63]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: duration / 1000, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
