import { useEffect } from "react";
import { motion } from "framer-motion";
import useNow from "../../hooks/useNow";

type LockScreenProps = {
  onEnter: () => void;
};

// The first thing visitors see, like a computer's lock screen:
// a welcome line, a big live clock on a frosted card, a short intro,
// and "click or press space to enter".
export default function LockScreen({ onEnter }: LockScreenProps) {
  const now = useNow();

  // Let the keyboard unlock it too (Space or Enter), from anywhere on the page.
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        onEnter();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onEnter]);

  // Split the time into pieces so each can be styled differently.
  // formatToParts follows the visitor's own 12h/24h preference.
  const parts = new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  }).formatToParts(now);
  const hour = parts.find((p) => p.type === "hour")?.value;
  const minute = parts.find((p) => p.type === "minute")?.value;
  const dayPeriod = parts.find((p) => p.type === "dayPeriod")?.value; // AM/PM, if used
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const date = now.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

  return (
    <motion.div
      // Fades out when it's removed (App wraps it in AnimatePresence).
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.4 }}
      onClick={onEnter}
      className="fixed inset-0 z-[2000] flex cursor-pointer select-none flex-col items-center justify-center gap-8 text-white [text-shadow:0_1px_3px_rgb(0_0_0/0.25)]"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.3em]">
        Welcome to SebikaOS
      </p>

      {/* Frosted-glass clock card */}
      <div className="flex flex-col items-center rounded-3xl border border-white/40 bg-white/20 px-12 py-8 shadow-lg backdrop-blur-md">
        <span className="text-lg font-semibold">{date}</span>
        <span className="text-7xl font-bold leading-tight tabular-nums">
          {hour}
        </span>
        <span className="flex items-baseline gap-2 text-7xl font-bold leading-tight tabular-nums">
          {minute}
          <span className="text-xl font-semibold">{seconds}</span>
        </span>
        {dayPeriod && (
          <span className="mt-1 text-sm font-semibold">{dayPeriod}</span>
        )}
      </div>

      <div className="text-center">
        <h1 className="text-2xl font-bold">Hi! I’m Sebika</h1>
        <p className="mt-1 font-indie text-lg">
          Software engineer, designer, and creative builder
        </p>
      </div>

      {/* A real button, so keyboard and screen-reader users can unlock it.
          autoFocus puts the keyboard focus here right away. */}
      <button
        type="button"
        autoFocus
        onClick={(e) => {
          e.stopPropagation(); // the screen behind also listens for clicks
          onEnter();
        }}
        className="animate-pulse rounded-full px-4 py-1 text-sm outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        click or press space to enter
      </button>
    </motion.div>
  );
}
