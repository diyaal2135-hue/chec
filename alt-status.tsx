"use client"

import { Signal } from "lucide-react"

interface AltStatusProps {
  connected?: boolean
  server?: string
}

export function AltStatus({ connected = true, server = "purpleprison.com" }: AltStatusProps) {
  return (
    <div className="glass-card rounded-xl px-4 py-2.5 flex items-center gap-3">
      <div className="flex flex-col items-start">
        <span className="text-xs text-gray-500 mb-0.5">Alt Status</span>
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${connected ? 'bg-green-500 pulse-green' : 'bg-red-500'}`} />
          <span className={`text-sm font-semibold ${connected ? 'text-green-400 text-glow-green' : 'text-red-400'}`}>
            {connected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
        {connected && server && (
          <span className="text-xs text-gray-500">{server}</span>
        )}
      </div>
      <Signal className={`w-5 h-5 ${connected ? 'text-green-500' : 'text-gray-500'}`} />
    </div>
  )
}
