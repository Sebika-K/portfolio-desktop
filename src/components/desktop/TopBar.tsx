import useNow from "../../hooks/useNow";
import SocialLinks from "../ui/SocialLinks";
import ThemeToggle from "../ui/ThemeToggle";

type TopBarProps = {
  isDark: boolean;
  onToggleDark: () => void;
};

// The menu bar across the top of the screen, like on a Mac:
// "SebikaOS" on the left; links, theme toggle, date and clock on the right.
export default function TopBar({ isDark, onToggleDark }: TopBarProps) {
  const now = useNow();

  // toLocale...String formats the date/time the way the *visitor* is used
  // to (their language and 12h/24h preference), using their own clock.
  const date = now.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const time = now.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <header className="fixed inset-x-0 top-0 z-[1000] flex h-9 items-center justify-between bg-menubar px-4 text-sm text-text backdrop-blur-md">
      <span className="font-bold">SebikaOS</span>

      <div className="flex items-center gap-4">
        <SocialLinks size={18} gap="gap-2" />
        <ThemeToggle isDark={isDark} onToggle={onToggleDark} size={20} />

        {/* <time> tells browsers and screen readers this is a date/time */}
        <time dateTime={now.toISOString()} className="tabular-nums">
          <span className="hidden sm:inline">{date} </span>
          {time}
        </time>
      </div>
    </header>
  );
}
