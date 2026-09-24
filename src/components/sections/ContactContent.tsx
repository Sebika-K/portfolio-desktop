export default function ContactContent() {
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
          <form className="space-y-4">
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
                placeholder="Write your message here..."
                className="w-full resize-none rounded-xl border border-line bg-card px-4 py-3 text-sm outline-none transition focus:border-accent"
              />
            </div>

            <button
              type="submit"
              className="rounded-lg border-2 border-outline bg-accent px-5 py-2 text-sm font-semibold text-on-accent transition hover:translate-y-[-1px]"
            >
              Send
            </button>
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