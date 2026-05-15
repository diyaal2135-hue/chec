"use client"

import { Minus, Square, X } from "lucide-react"

interface WindowFrameProps {
  title?: string
  children: React.ReactNode
  showControls?: boolean
}

export function WindowFrame({ title = "PurplePrison Staff Checker", children, showControls = true }: WindowFrameProps) {
  return (
    <div className="flex flex-col h-screen w-full bg-[#0a0812] overflow-hidden">
      {/* Title Bar */}
      <div className="flex items-center justify-between h-9 bg-[#08060f] border-b border-purple-500/20 px-3 shrink-0">
        <span className="text-xs text-gray-500 font-medium">{title}</span>
        {showControls && (
          <div className="flex items-center gap-1">
            <button className="p-1.5 hover:bg-purple-500/10 rounded transition-colors">
              <Minus className="w-3 h-3 text-gray-500" />
            </button>
            <button className="p-1.5 hover:bg-purple-500/10 rounded transition-colors">
              <Square className="w-3 h-3 text-gray-500" />
            </button>
            <button className="p-1.5 hover:bg-red-500/20 rounded transition-colors group">
              <X className="w-3 h-3 text-gray-500 group-hover:text-red-400" />
            </button>
          </div>
        )}
      </div>
      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  )
}
