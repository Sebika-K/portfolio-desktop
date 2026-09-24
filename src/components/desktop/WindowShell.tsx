import type { ReactNode } from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Rnd } from "react-rnd"

type WindowShellProps = {
  title: string
  onClose: () => void
  children: ReactNode
  zIndex: number
  onFocus: () => void
  // How much the desktop is scaled (see useFitScale). react-rnd needs it so a
  // window follows the mouse exactly while dragging/resizing.
  scale: number
}

export default function WindowShell({
  title,
  onClose,
  children,
  zIndex,
  onFocus,
  scale,
}: WindowShellProps) {
  const defaultWidth = 760
  const defaultHeight = 500

  // Worked out once, when the window first opens (useState's starter function).
  const [defaultPosition] = useState(() => {
    // The stage is (screen size / scale) wide, so center within that.
    const x = Math.max((window.innerWidth / scale - defaultWidth) / 2, 40)
    const y = Math.max((window.innerHeight / scale - defaultHeight) / 2, 40)

    return {
      x,
      y,
      width: defaultWidth,
      height: defaultHeight,
    }
  })

  return (
    <Rnd
      default={defaultPosition}
      minWidth={420}
      minHeight={300}
      bounds="parent"
      scale={scale}
      style={{ zIndex }}
      onMouseDown={onFocus}
      dragHandleClassName="window-drag-handle"
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 12 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 12 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="flex h-full flex-col rounded-2xl border border-window-border bg-window transition-colors shadow-xl"
      >
        <div className="window-drag-handle flex cursor-move items-center justify-between rounded-t-2xl  border-b border-titlebar-line bg-titlebar px-4 py-2 text-sm font-semibold text-white">
          <span>:) {title}</span>

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
      </motion.div>
    </Rnd>
  )
}