import { experiences } from "../../data/experience";
import { GITHUB_URL, LINKEDIN_URL } from "../../data/links";
import { projects } from "../../data/projects";
import { sections, type SectionId } from "../../data/sections";
import { skillGroups } from "../../data/skills";

// What running a command produces:
//   lines  → text to print
//   open   → (optional) a window to open, e.g. `open projects`
//   clear  → (optional) wipe the screen, for `clear`
export type CommandResult = {
  lines: string[];
  open?: SectionId;
  clear?: boolean;
};

// The list `help` prints. Hidden easter eggs are left out on purpose.
const HELP: [string, string][] = [
  ["help", "show this list"],
  ["whoami", "who is Sebika?"],
  ["projects", "things I've built"],
  ["experience", "where I've worked"],
  ["skills", "what I work with"],
  ["socials", "find me online"],
  ["ls", "list the apps on this desktop"],
  ["open <app>", "open an app, e.g. open projects"],
  ["contact", "open the contact form"],
  ["date", "today's date and time"],
  ["clear", "clean the screen"],
];

// Takes exactly what the visitor typed and returns what should happen.
// This is plain logic with no React in it, which makes it easy to read,
// change, and test on its own.
export function runCommand(input: string): CommandResult {
  // "  Open   Projects " → command "open", args ["projects"]
  const [command = "", ...args] = input.trim().toLowerCase().split(/\s+/);

  switch (command) {
    case "":
      return { lines: [] };

    case "help":
      return {
        lines: [
          "available commands:",
          ...HELP.map(([name, desc]) => `  ${name.padEnd(14)}${desc}`),
          "",
          "psst... there might be a few hidden ones too.",
        ],
      };

    case "whoami":
      return {
        lines: [
          "Sebika Khulal",
          "software engineer @ Utilyze, Inc. · Texas State CS '26",
          "full-stack dev, diving deep into AI/ML",
          "loves the sky, and a good sunset fixes everything.",
        ],
      };

    case "projects":
      return {
        lines: [
          ...projects.map((p) => `• ${p.title}  [${p.tech.slice(0, 4).join(", ")}]`),
          "",
          "type `open projects` for details.",
        ],
      };

    case "experience":
      return {
        lines: experiences.map((e) => `• ${e.role} @ ${e.company}  (${e.period})`),
      };

    case "skills":
    case "specs": // the window is called "My Specs", so both words work
      return {
        lines: skillGroups.map((g) => `${g.title}: ${g.items.join(", ")}`),
      };

    case "socials":
      return { lines: [`github    ${GITHUB_URL}`, `linkedin  ${LINKEDIN_URL}`] };

    case "ls":
      return { lines: [sections.map((s) => s.id).join("   ")] };

    case "open": {
      // "specs" is a nickname for the skills window (shown as "My Specs").
      const name = args[0] === "specs" ? "skills" : args[0];
      const target = sections.find((s) => s.id === name);
      if (!target) {
        return { lines: [`open: no app called "${args[0] ?? ""}". try \`ls\`.`] };
      }
      return { lines: [`opening ${target.title}...`], open: target.id };
    }

    case "contact":
      return { lines: ["opening Contact..."], open: "contact" };

    case "date":
      return { lines: [new Date().toString()] };

    case "clear":
      return { lines: [], clear: true };

    // ---- hidden easter eggs (not listed in `help`) ----
    case "sudo":
      return { lines: ["nice try :) you don't have admin rights on SebikaOS."] };

    case "sunset":
      return {
        lines: [
          "          \\   |   /",
          "        --    ☀    --",
          "  ~~~~~~~~~~~~~~~~~~~~~~~~~~~",
          "  the sky turns pink and gold. all problems: gone.",
        ],
      };

    case "coffee":
      return { lines: ["brewing... ☕  (have you seen CoffeeDunk in `projects`?)"] };

    default:
      return {
        lines: [`command not found: ${command}. type \`help\` to see what I can do.`],
      };
  }
}
