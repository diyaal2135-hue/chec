"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LogoutModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="glass-card rounded-2xl p-6 w-full max-w-sm relative z-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-lg font-bold text-white mb-3">
          Confirm Logout
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          Are you sure you want to logout?
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            className="flex-1 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold border-0 shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]"
            onClick={onConfirm}
          >
            Logout
          </Button>
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="flex-1 border-gray-600 hover:bg-white/5 text-white"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}
