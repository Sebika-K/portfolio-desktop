import { useRef, useState, type FormEvent } from "react";
import DrawingCanvas, { type DrawingCanvasHandle } from "../paint/DrawingCanvas";
import { sendEntry } from "./sendEntry";

type Status = "idle" | "sending" | "success" | "error";

const NAME_MAX = 40; // same limits as the database checks in guestbook.sql
const MESSAGE_MAX = 280;
const COOLDOWN_MS = 60_000; // one entry per minute per browser
const LAST_SENT_KEY = "sebikaos-guestbook-last-sent";

// Reads/writes when this browser last sent an entry. Wrapped in try/catch
// because some browsers (private mode) block localStorage.
function getLastSent() {
  try {
    return Number(localStorage.getItem(LAST_SENT_KEY)) || 0;
  } catch {
    return 0;
  }
}
function setLastSent() {
  try {
    localStorage.setItem(LAST_SENT_KEY, String(Date.now()));
  } catch {
    /* ignore */
  }
}

// The Guestbook app: visitors leave a name, a note, and (optionally) a doodle.
// Entries are saved unapproved and only appear once Sebika approves them.
export default function Guestbook() {
  const canvas = useRef<DrawingCanvasHandle>(null);
  const [name, setName] = useState("");
  const [showName, setShowName] = useState(true);
  const [message, setMessage] = useState("");
  const [botcheck, setBotcheck] = useState(false); // honeypot, like the contact form
  const [status, setStatus] = useState<Status>("idle");
  const [errorText, setErrorText] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Bot ticked the hidden box: pretend it worked, send nothing.
    if (botcheck) {
      setStatus("success");
      return;
    }

    // Too soon since the last entry from this browser?
    const waitMs = COOLDOWN_MS - (Date.now() - getLastSent());
    if (waitMs > 0) {
      setStatus("error");
      setErrorText(`Please wait ${Math.ceil(waitMs / 1000)}s before signing again.`);
      return;
    }

    setStatus("sending");
    try {
      // Only attach the doodle if they actually drew something.
      const doodle = canvas.current?.hasDrawing()
        ? await canvas.current.toBlob()
        : null;

      await sendEntry({ name, showName, message, doodle });

      setLastSent();
      setStatus("success");
      setName("");
      setMessage("");
      canvas.current?.clear();
    } catch (err) {
      console.error(err); // details for you in DevTools
      setStatus("error");
      setErrorText("Sorry, something went wrong. Please try again in a moment.");
    }
  };

  return (
    <div className="space-y-6 text-text">
      <div>
        <h2 className="text-3xl font-bold text-accent">Guestbook</h2>
        <p className="mt-2 text-sm leading-6 text-text-muted">
          Leave me a note, and a doodle if you like! Your note is just for me.
          Approved doodles go up on the wall, with your name only if you
          choose.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-line bg-panel/70 p-5"
      >
        {/* Honeypot: hidden from people, tempting for bots */}
        <input
          type="checkbox"
          name="botcheck"
          className="hidden"
          tabIndex={-1}
          aria-hidden="true"
          autoComplete="off"
          checked={botcheck}
          onChange={(e) => setBotcheck(e.target.checked)}
        />

        <div>
          <label htmlFor="gb-name" className="mb-2 block text-sm font-medium text-text-strong">
            Name <span className="font-normal text-text-faint">(optional)</span>
          </label>
          <input
            id="gb-name"
            maxLength={NAME_MAX}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-xl border border-line bg-card px-4 py-3 text-sm outline-none transition focus:border-accent"
          />
        </div>

        <div>
          <label htmlFor="gb-message" className="mb-2 block text-sm font-medium text-text-strong">
            Note <span className="font-normal text-text-faint">(only I'll see this)</span>
          </label>
          <textarea
            id="gb-message"
            required
            rows={3}
            maxLength={MESSAGE_MAX}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Say hi!"
            className="w-full resize-none rounded-xl border border-line bg-card px-4 py-3 text-sm outline-none transition focus:border-accent"
          />
          {/* Live character counter */}
          <p className="mt-1 text-right text-xs text-text-faint">
            {message.length}/{MESSAGE_MAX}
          </p>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-text-strong">
            Doodle <span className="font-normal text-text-faint">(optional)</span>
          </p>
          <DrawingCanvas ref={canvas} width={600} height={360} />

          {/* Only offered once they've typed a name */}
          {name.trim() && (
            <label className="mt-3 flex items-center gap-2 text-sm text-text">
              <input
                type="checkbox"
                checked={showName}
                onChange={(e) => setShowName(e.target.checked)}
                className="h-4 w-4 accent-accent"
              />
              Show my name next to my doodle on the wall
            </label>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-lg border-2 border-outline bg-accent px-5 py-2 text-sm font-semibold text-on-accent transition hover:translate-y-[-1px] disabled:cursor-wait disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : "Sign the guestbook"}
        </button>

        <p role="status" className="text-sm text-text-strong">
          {status === "success" &&
            "Thank you! Your entry will appear on the wall once it's approved."}
          {status === "error" && errorText}
        </p>
      </form>
    </div>
  );
}
