import type { ReactNode } from "react"
import { motion } from "framer-motion"

type MobilePanelProps = {
  title: string
  onClose: () => void
  children: ReactNode
}

export default function MobilePanel({
  title,
  onClose,
  children,
}: MobilePanelProps) {
  return (
    <div className="fixed inset-0 z-40 bg-black/20 md:hidden">
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 right-0 h-[78vh] rounded-t-3xl border-x-2 border-t-2 border-neutral-800 bg-[#f6f1de] shadow-2xl"
      >
        <div className="flex items-center justify-between rounded-t-3xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white">
          <span>:] {title}</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded border border-white/70 px-2 py-0.5 text-xs"
          >
            X
          </button>
        </div>

        <div className="h-[calc(78vh-52px)] overflow-y-auto px-5 py-5">
          {children}
        </div>
      </motion.div>
    </div>
  )
}