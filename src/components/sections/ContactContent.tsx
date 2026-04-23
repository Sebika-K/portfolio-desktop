export default function ContactContent() {
  return (
    <div className="space-y-6 text-neutral-700">
      <div>
        <h2 className="text-3xl font-bold text-orange-500">Contact</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
          Feel free to reach out for opportunities, collaborations, or just to say hi.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Form side */}
        <div className="rounded-2xl border border-neutral-300 bg-[#efe8d7]/70 p-5 shadow-sm">
          <form className="space-y-4">
            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block text-sm font-medium text-neutral-800"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="Your name"
                className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-orange-400"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-neutral-800"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-orange-400"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-neutral-800"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                placeholder="Write your message here..."
                className="w-full resize-none rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-orange-400"
              />
            </div>

            <button
              type="submit"
              className="rounded-lg border-2 border-neutral-800 bg-orange-500 px-5 py-2 text-sm font-semibold text-white transition hover:translate-y-[-1px]"
            >
              Send
            </button>
          </form>
        </div>

        {/* Illustration side */}
        <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-neutral-300 bg-[#efe8d7]/70 p-5 shadow-sm">
          <div className="flex h-full w-full items-center justify-center rounded-2xl border border-dashed border-neutral-400 bg-white/60 text-center text-sm text-neutral-500">
            Contact Illustration / Graphic
          </div>
        </div>
      </div>
    </div>
  )
}