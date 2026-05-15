"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface SpecialStaffAlertProps {
  isOpen: boolean
  onClose: () => void
  staffName: string
  avatarUrl?: string
}

export function SpecialStaffAlert({ isOpen, onClose, staffName, avatarUrl }: SpecialStaffAlertProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (isOpen) {
      setProgress(0)
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer)
            return 100
          }
          return prev + 2
        })
      }, 50)
      return () => clearInterval(timer)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="glass-card rounded-2xl p-8 w-full max-w-md relative z-10 neon-red">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Alert Header */}
        <h2 className="text-3xl font-black text-red-500 text-center mb-6 text-glow-red tracking-wider">
          SPECIAL STAFF JOINED!
        </h2>

        {/* Avatar - Minecraft style */}
        <div className="flex justify-center mb-6">
          <div className="w-28 h-28 rounded-lg overflow-hidden border-2 border-red-500/60 shadow-[0_0_20px_rgba(239,68,68,0.4)]">
            {avatarUrl ? (
              <img src={avatarUrl} alt={staffName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-600 to-orange-500 flex items-center justify-center">
                {/* Minecraft-style face placeholder */}
                <svg viewBox="0 0 8 8" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
                  <rect fill="#c4a484" x="0" y="0" width="8" height="8"/>
                  <rect fill="#8b5a2b" x="0" y="0" width="8" height="4"/>
                  <rect fill="#c4a484" x="1" y="2" width="6" height="6"/>
                  <rect fill="#ffffff" x="1" y="3" width="2" height="2"/>
                  <rect fill="#ffffff" x="5" y="3" width="2" height="2"/>
                  <rect fill="#3d2314" x="2" y="4" width="1" height="1"/>
                  <rect fill="#3d2314" x="5" y="4" width="1" height="1"/>
                  <rect fill="#8b4513" x="3" y="6" width="2" height="1"/>
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Staff Name */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-black text-red-500 text-glow-red">{staffName}</h3>
          <p className="text-gray-400 mt-1">has joined the server!</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="h-1.5 bg-red-500/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(239,68,68,0.6)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={onClose}
            className="px-10 py-2 border-gray-600 hover:bg-white/5 text-white font-medium"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
