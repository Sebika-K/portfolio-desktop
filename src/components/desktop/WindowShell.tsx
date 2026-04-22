import type { ReactNode } from "react"

type WindowShellProps = {
  title: string
  onClose: () => void
  children: ReactNode
}

export default function WindowShell({
  title,
  onClose,
  children,
}: WindowShellProps) {
  return (
    <div className="absolute left-1/2 top-1/2 z-20 w-[90%] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border-2 border-neutral-800 bg-[#f6f1de] shadow-2xl">
      <div className="flex items-center justify-between rounded-t-2xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white">
        <span>:] {title}</span>

        <button
          type="button"
          onClick={onClose}
          className="rounded border border-white/70 px-2 py-0.5 text-xs hover:bg-white/20"
        >
          X
        </button>
      </div>

      <div className="max-h-[70vh] overflow-y-auto px-6 py-6">
        {children}
      </div>
    </div>
  )
}