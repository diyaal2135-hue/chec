"use client"

import { cn } from "@/lib/utils"
import { Star, Eye } from "lucide-react"

type StatusType = "online" | "vanished" | "offline" | "spectating"

interface StatusBadgeProps {
  status: StatusType
  target?: string
  className?: string
}

const statusConfig: Record<StatusType, { label: string; className: string; dotClass: string }> = {
  online: { 
    label: "Online", 
    className: "status-online", 
    dotClass: "bg-green-500 pulse-green" 
  },
  vanished: { 
    label: "Vanished", 
    className: "status-vanished", 
    dotClass: "bg-purple-500" 
  },
  offline: { 
    label: "Offline", 
    className: "status-offline", 
    dotClass: "bg-gray-500" 
  },
  spectating: { 
    label: "Spectating", 
    className: "status-spectating", 
    dotClass: "bg-cyan-400" 
  },
}

export function StatusBadge({ status, target, className }: StatusBadgeProps) {
  const config = statusConfig[status]
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("w-2.5 h-2.5 rounded-full", config.dotClass)} />
      <span className={cn("text-sm font-medium flex items-center gap-1", config.className)}>
        {status === "vanished" && <Star className="w-3 h-3 fill-current" />}
        {status === "spectating" && <Eye className="w-3 h-3" />}
        {config.label}
        {status === "spectating" && target && (
          <span className="text-cyan-300/70 ml-1">
            <span className="text-cyan-400">→</span> {target}
          </span>
        )}
      </span>
    </div>
  )
}

export type { StatusType }
