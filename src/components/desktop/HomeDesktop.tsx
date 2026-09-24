import { sections, type SectionId } from "../../data/sections";
import SocialLinks from "../ui/SocialLinks";

type HomeDesktopProps = {
  onOpenSection: (sectionId: SectionId) => void;
};

export default function HomeDesktop({ onOpenSection }: HomeDesktopProps) {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="w-[837px] h-[501px] rounded-[12px] border border-window-border bg-window transition-colors shadow-xl max-md:w-[92vw] max-md:h-auto">
        {/* Top Bar */}
        <div className="flex items-center justify-between rounded-t-[12px] border-b border-titlebar-line bg-titlebar px-4 py-2 text-sm font-semibold text-white">
          <span>:) Home</span>
        </div>

        {/* Content */}
        <div className="flex h-[455px] flex-col items-center justify-center gap-12 px-6 py-8 text-center max-md:h-auto max-md:min-h-[520px]">
          {/* Heading */}
          <div>
            <h1 className="text-5xl font-bold text-heading">
              Hi! <span className="text-accent">I’m Sebika</span>
            </h1>

            <p className="mt-3 font-indie text-base text-text-muted">
              Software engineer, designer, and creative builder
            </p>
          </div>

          {/* Icons */}
          <div className="grid grid-cols-3 gap-8 sm:grid-cols-5 sm:gap-12">
            {sections.map((item) => (
              <button
                key={item.id}
                onClick={() => onOpenSection(item.id)}
                className="flex flex-col items-center gap-2 rounded-lg p-2 transition hover:scale-105"
              >
                <img
                  src={item.icon}
                  alt={item.title}
                  className="h-16 w-16 object-contain"
                />

                <span className="text-xs font-medium text-text">
                  {item.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Socials */}
      <SocialLinks />
    </div>
  );
}
