import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { SectionId } from "../../data/sections";
import { runCommand } from "./commands";

type TerminalProps = {
  // Lets commands like `open projects` open other windows.
  onOpenSection: (id: SectionId) => void;
};

// One line on the screen: either something the visitor typed, or a reply.
type Line = { kind: "input" | "output"; text: string };

const PROMPT = "visitor@sebikaos:~$";

const WELCOME: Line[] = [
  { kind: "output", text: "welcome to SebikaOS terminal ✦" },
  { kind: "output", text: "type `help` to get started." },
];

// The Terminal app: a screen of past lines plus a text box at the bottom.
// What each command *does* lives in commands.ts; this file only handles
// typing, showing lines, and scrolling.
export default function Terminal({ onOpenSection }: TerminalProps) {
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [input, setInput] = useState("");
  // Everything typed so far, so ↑ / ↓ can bring old commands back.
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  // useRef = a direct handle on an HTML element, without causing re-renders.
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Whenever a new line appears, scroll so the latest one is visible.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [lines]);

  const submit = () => {
    const result = runCommand(input);
    const typed: Line = { kind: "input", text: input };
    const replies: Line[] = result.lines.map((text) => ({ kind: "output", text }));

    setLines((prev) => (result.clear ? [] : [...prev, typed, ...replies]));
    if (input.trim()) setHistory((prev) => [...prev, input]);
    setHistoryIndex(null);
    setInput("");

    if (result.open) onOpenSection(result.open);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submit();
    } else if (e.key === "ArrowUp" && history.length > 0) {
      e.preventDefault(); // stop the cursor jumping to the start of the text
      const next = historyIndex === null ? history.length - 1 : Math.max(historyIndex - 1, 0);
      setHistoryIndex(next);
      setInput(history[next]);
    } else if (e.key === "ArrowDown" && historyIndex !== null) {
      e.preventDefault();
      const next = historyIndex + 1;
      if (next >= history.length) {
        setHistoryIndex(null);
        setInput("");
      } else {
        setHistoryIndex(next);
        setInput(history[next]);
      }
    }
  };

  return (
    // Clicking anywhere in the terminal puts the cursor in the text box.
    <div
      onClick={() => inputRef.current?.focus()}
      className="min-h-full cursor-text bg-[#1e1e2e] p-4 font-mono text-sm leading-6 text-[#e6e6f0]"
    >
      {lines.map((line, i) => (
        // whitespace-pre-wrap keeps the spacing/alignment of the text
        <div key={i} className="whitespace-pre-wrap break-words">
          {line.kind === "input" ? (
            <>
              <span className="text-[#b8f3f9]">{PROMPT}</span> {line.text}
            </>
          ) : (
            line.text
          )}
        </div>
      ))}

      {/* The line you're typing on */}
      <div ref={bottomRef} className="flex gap-2">
        <label htmlFor="terminal-input" className="shrink-0 text-[#b8f3f9]">
          {PROMPT}
        </label>
        <input
          id="terminal-input"
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          className="flex-1 bg-transparent caret-[#f4b6c2] outline-none"
        />
      </div>
    </div>
  );
}
