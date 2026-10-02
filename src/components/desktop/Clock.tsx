import useNow from "../../hooks/useNow";

type ClockProps = {
  // "stacked" = time above date (taskbar, like Windows)
  // "inline"  = time only, on one line (top bar on phones)
  variant: "stacked" | "inline";
};

// A live clock, shared by the taskbar (desktop) and the top bar (phones).
// toLocale...String formats it the way the *visitor* is used to
// (their language and 12h/24h preference), using their own clock.
export default function Clock({ variant }: ClockProps) {
  const now = useNow();

  const time = now.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
  const date = now.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  // <time> tells browsers and screen readers this is a date/time.
  // tabular-nums gives every digit the same width, so it doesn't jiggle.
  if (variant === "inline") {
    return (
      <time dateTime={now.toISOString()} className="tabular-nums">
        {time}
      </time>
    );
  }

  return (
    <time
      dateTime={now.toISOString()}
      className="flex flex-col items-end text-xs leading-tight tabular-nums text-text"
    >
      <span className="font-medium">{time}</span>
      <span>{date}</span>
    </time>
  );
}
