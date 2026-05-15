"use client"

import { X, ExternalLink, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface MinecraftLoginModalProps {
  isOpen: boolean
  onClose: () => void
  code?: string
}

export function MinecraftLoginModal({ isOpen, onClose, code = "C4JLLCFH" }: MinecraftLoginModalProps) {
  const [copied, setCopied] = useState(false)

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="glass-card rounded-2xl p-8 w-full max-w-md relative z-10 neon-purple">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-white mb-2">
          Login Minecraft Alt Account
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          To use the checker you must login with your Minecraft alt account.
        </p>

        {/* Code Display */}
        <div className="mb-6">
          <div className="text-xs text-gray-500 mb-2 text-right">Your Code</div>
          <div 
            className="code-box rounded-xl px-6 py-4 text-center cursor-pointer hover:border-purple-400/70 transition-all relative group"
            onClick={copyCode}
          >
            <span className="text-3xl font-mono font-black text-purple-400 tracking-[0.3em] text-glow-purple">
              {code}
            </span>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
              {copied ? (
                <Check className="w-5 h-5 text-green-400" />
              ) : (
                <Copy className="w-5 h-5 text-purple-400" />
              )}
            </div>
          </div>
          <p className="text-xs text-center text-gray-500 mt-2">Click to copy</p>
        </div>

        {/* Steps */}
        <div className="space-y-3 mb-6">
          {[
            "Click the button below to open the Microsoft login page",
            "Enter the code shown above",
            "Login with your Minecraft account",
            "The app will connect automatically",
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3 text-sm">
              <span className="w-5 h-5 rounded-full bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-xs text-purple-400 font-bold flex-shrink-0">
                {i + 1}
              </span>
              <span className="text-gray-400">{step}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            className="flex-1 btn-gradient text-white font-semibold border-0"
            onClick={() => window.open('https://microsoft.com/link', '_blank')}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Open Microsoft Login
          </Button>
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="border-gray-600 hover:bg-white/5 text-white"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}
