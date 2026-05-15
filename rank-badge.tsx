"use client"

import { cn } from "@/lib/utils"

type RankType = "owner" | "admin" | "manager" | "srmod" | "mod" | "helper" | "special" | "member"

interface RankBadgeProps {
  rank: RankType
  className?: string
}

const rankConfig: Record<RankType, { label: string; className: string }> = {
  owner: { label: "Owner", className: "rank-owner" },
  admin: { label: "Admin", className: "rank-owner" },
  manager: { label: "Manager", className: "rank-manager" },
  srmod: { label: "Sr Mod", className: "rank-srmod" },
  mod: { label: "Mod", className: "rank-mod" },
  helper: { label: "Helper", className: "rank-helper" },
  special: { label: "Special", className: "rank-special" },
  member: { label: "Member", className: "bg-gray-500/20 text-gray-400 border border-gray-500/40" },
}

export function RankBadge({ rank, className }: RankBadgeProps) {
  const config = rankConfig[rank]
  return (
    <span
      className={cn(
        "px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wide",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  )
}

export type { RankType }
