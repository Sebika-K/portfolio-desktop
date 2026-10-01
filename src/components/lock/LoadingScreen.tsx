import { motion } from "framer-motion";

// A short "booting up" screen between the lock screen and the desktop.
// App.tsx decides how long it shows; the bar is timed to match.
export default function LoadingScreen({ duration }: { duration: number }) {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[2000] flex flex-col items-center justify-center gap-4 bg-page text-white [text-shadow:0_1px_3px_rgb(0_0_0/0.25)]"
      role="status"
      aria-label="Loading SebikaOS"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.3em]">
        Loading
      </p>

      {/* Progress bar: the inner bar grows from 0% to 100% width */}
      <div className="h-2 w-48 overflow-hidden rounded-full bg-white/30">
        <motion.div
          className="h-full rounded-full bg-white"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: duration / 1000, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
