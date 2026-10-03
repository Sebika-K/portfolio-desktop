import { useState, type ChangeEvent, type FormEvent } from "react"
import { LINKEDIN_URL } from "../../data/links"

// Where Web3Forms receives messages. It then emails them to you.
const WEB3FORMS_URL = "https://api.web3forms.com/submit"

// The form can be in one of these states. The UI changes based on it.
type Status = "idle" | "sending" | "success" | "error"

export default function ContactContent() {
  // What the visitor has typed. React keeps it here so we can send it.
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  // Spam trap ("honeypot"): a hidden checkbox people never see, but bots
  // that fill in every field will tick. If it's ticked, it's a bot.
  const [botcheck, setBotcheck] = useState(false)

  // Used by all three fields. It saves what was typed, and if the
  // "Thanks! Your message was sent" line is showing, hides it: the visitor
  // is writing a new message, which hasn't been sent yet.
  const handleTyping =
    (setValue: (value: string) => void) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(event.target.value)
      if (status === "success") setStatus("idle")
    }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // Stop the browser's default "reload the page" behavior on submit.
    event.preventDefault()

    // A bot ticked the hidden box: pretend it worked, but don't send anything.
    // (Pretending means the bot doesn't learn it was caught.)
    if (botcheck) {
      setStatus("success")
      return
    }

    setStatus("sending")

    try {
      const response = await fetch(WEB3FORMS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          subject: `New portfolio message from ${name}`,
          name,
          email,
          message,
          // Web3Forms also rejects the message on its side if this is true.
          botcheck,
        }),
      })
      const result = await response.json()

      if (result.success) {
        setStatus("success")
        // Clear the form so it's ready for another message.
        setName("")
        setEmail("")
        setMessage("")
      } else {
        setStatus("error")
      }
    } catch {
      // No internet, or the service didn't answer.
      setStatus("error")
    }
  }

  return (
    <div className="space-y-6 text-text">
      <div>
        <h2 className="text-3xl font-bold text-accent">Contact</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-text-muted">
          Feel free to reach out for opportunities, collaborations, or just to say hi.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Form side */}
        <div className="rounded-2xl border border-line bg-panel/70 p-5 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot: hidden from people (display: none), skipped by the
                Tab key (tabIndex -1), ignored by screen readers (aria-hidden),
                and not auto-filled by the browser (autoComplete off). */}
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
              <label
                htmlFor="fullName"
                className="mb-2 block text-sm font-medium text-text-strong"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                required
                value={name}
                onChange={handleTyping(setName)}
                placeholder="Your name"
                className="w-full rounded-xl border border-line bg-card px-4 py-3 text-sm outline-none transition focus:border-accent"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-text-strong"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={handleTyping(setEmail)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-line bg-card px-4 py-3 text-sm outline-none transition focus:border-accent"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-text-strong"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                required
                value={message}
                onChange={handleTyping(setMessage)}
                placeholder="Write your message here..."
                className="w-full resize-none rounded-xl border border-line bg-card px-4 py-3 text-sm outline-none transition focus:border-accent"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-lg border-2 border-outline bg-accent px-5 py-2 text-sm font-semibold text-on-accent transition hover:translate-y-[-1px] disabled:cursor-wait disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Send"}
            </button>

            {/* Feedback after sending. role="status" makes screen readers read it out. */}
            <p role="status" className="text-sm">
              {status === "success" && (
                <span className="text-text-strong">
                  Thanks! Your message was sent. I'll get back to you soon.
                </span>
              )}
              {status === "error" && (
                // If sending fails (no internet, or the form service is down),
                // offer LinkedIn so the visitor can still reach Sebika.
                <span className="text-text-strong">
                  Sorry, something went wrong. Please try again, or message me on{" "}
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline underline-offset-2"
                  >
                    LinkedIn
                  </a>
                  .
                </span>
              )}
            </p>
          </form>
        </div>

        {/* Illustration side: Sebika's drawing "Dreamers unite".
            The PNG has a see-through background and black lines, so it sits
            on the card in light mode. In dark mode, [.dark_&]:invert flips
            the black lines to white so they show up on the navy card.
            ("[.dark_&]" means "when an ancestor has the dark class", the
            same class App.tsx puts on <html> for dark mode.) */}
        <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-line bg-panel/70 p-5 shadow-sm">
          <img
            src="/contact/dreamers-unite.png"
            alt="Hand-drawn illustration: three people floating, their heads hidden in one shared cloud that says “Dreamers unite”"
            className="max-h-[300px] w-auto object-contain [.dark_&]:invert"
            draggable={false}
          />
        </div>
      </div>
    </div>
  )
}