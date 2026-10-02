import Clock from "./Clock";
import SocialLinks from "../ui/SocialLinks";
import ThemeToggle from "../ui/ThemeToggle";

type TopBarProps = {
  isDark: boolean;
  onToggleDark: () => void;
  // Phones have no taskbar, so the clock stays up here on phones only.
  showClock: boolean;
};

// The menu bar across the top of the screen, like on a Mac:
// "SebikaOS" on the left; links and theme toggle on the right.
// (On desktop the clock lives in the taskbar, bottom right.)
export default function TopBar({ isDark, onToggleDark, showClock }: TopBarProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-[1000] flex h-9 items-center justify-between bg-menubar px-4 text-sm text-text backdrop-blur-md">
      <span className="font-bold">SebikaOS</span>

      <div className="flex items-center gap-4">
        <SocialLinks size={18} gap="gap-2" />
        <ThemeToggle isDark={isDark} onToggle={onToggleDark} size={20} />

        {showClock && <Clock variant="inline" />}
      </div>
    </header>
  );
}
