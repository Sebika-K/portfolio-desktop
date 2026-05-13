import type { ReactNode } from "react"
import { useMemo } from "react"
import { motion } from "framer-motion"
import { Rnd } from "react-rnd"

type WindowShellProps = {
  title: string
  onClose: () => void
  children: ReactNode
  zIndex: number
  onFocus: () => void
}

export default function WindowShell({
  title,
  onClose,
  children,
  zIndex,
  onFocus,
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
      style={{ zIndex }}
      onMouseDown={onFocus}
      dragHandleClassName="window-drag-handle"
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 12 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 12 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="flex h-full flex-col rounded-2xl border border-[#673C33]/25 bg-[#F1F0DD] shadow-xl"
      >
        <div className="window-drag-handle flex cursor-move items-center justify-between rounded-t-2xl  bg-[#CC5500]/80 px-4 py-2 text-sm font-semibold text-white">
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