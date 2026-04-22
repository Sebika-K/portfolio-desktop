import type { ReactNode } from "react"
import { useMemo } from "react"
import { Rnd } from "react-rnd"

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
  const defaultWidth = 760
  const defaultHeight = 500

  const defaultPosition = useMemo(() => {
    const x = Math.max((window.innerWidth - defaultWidth) / 2, 40)
    const y = Math.max((window.innerHeight - defaultHeight) / 2, 40)

    return {
      x,
      y,
      width: defaultWidth,
      height: defaultHeight,
    }
  }, [])

  return (
    <Rnd
      default={defaultPosition}
      minWidth={420}
      minHeight={300}
      bounds="window"
      dragHandleClassName="window-drag-handle"
      className="z-30"
    >
      <div className="flex h-full flex-col rounded-2xl border-2 border-neutral-800 bg-[#f6f1de] shadow-2xl">
        <div className="window-drag-handle flex cursor-move items-center justify-between rounded-t-2xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white">
          <span>:] {title}</span>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded border border-white/70 px-2 py-0.5 text-xs hover:bg-white/20"
          >
            X
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {children}
        </div>
      </div>
    </Rnd>
  )
}