import { useState, type FormEvent } from "react"

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // Stop the browser's default "reload the page" behavior on submit.
    event.preventDefault()
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
                onChange={(e) => setName(e.target.value)}
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setMessage(e.target.value)}
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
                <span className="text-text-strong">
                  Sorry, something went wrong. Please try again in a moment.
                </span>
              )}
            </p>
          </form>
        </div>

        {/* Illustration side */}
        <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-line bg-panel/70 p-5 shadow-sm">
          <div className="flex h-full w-full items-center justify-center rounded-2xl border border-dashed border-line-strong bg-card/60 text-center text-sm text-text-faint">
            Contact Illustration / Graphic
          </div>
        </div>
      </div>
    </div>
  )
}