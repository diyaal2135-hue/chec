"use client"

import { useState } from "react"
import { X, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AddMemberModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (data: { username: string; password: string; role: string }) => void
}

const roles = [
  { value: "member", label: "Member", bgClass: "bg-cyan-500/20 hover:bg-cyan-500/30", textClass: "text-cyan-400", borderClass: "border-cyan-500/50" },
  { value: "staff", label: "Staff", bgClass: "bg-green-500/20 hover:bg-green-500/30", textClass: "text-green-400", borderClass: "border-green-500/50" },
  { value: "admin", label: "Admin", bgClass: "bg-yellow-500/20 hover:bg-yellow-500/30", textClass: "text-yellow-400", borderClass: "border-yellow-500/50" },
  { value: "owner", label: "Owner", bgClass: "bg-orange-500/20 hover:bg-orange-500/30", textClass: "text-orange-400", borderClass: "border-orange-500/50" },
]

export function AddMemberModal({ isOpen, onClose, onAdd }: AddMemberModalProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showRoleDropdown, setShowRoleDropdown] = useState(false)

  if (!isOpen) return null

  const handleSubmit = () => {
    if (username && password && role) {
      onAdd({ username, password, role })
      setUsername("")
      setPassword("")
      setRole("")
      onClose()
    }
  }

  const selectedRole = roles.find(r => r.value === role)

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

        <h2 className="text-xl font-bold text-white mb-6">
          Add Member
        </h2>

        <div className="space-y-5">
          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username" className="text-gray-300">Username</Label>
            <Input
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-[#0d0912]/80 border-purple-500/30 focus:border-purple-500/60 text-white placeholder:text-gray-500 h-11"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-300">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#0d0912]/80 border-purple-500/30 focus:border-purple-500/60 text-white placeholder:text-gray-500 pr-10 h-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-400 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label htmlFor="role" className="text-gray-300">Role</Label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className="w-full h-11 px-3 bg-[#0d0912]/80 border border-purple-500/30 rounded-md text-left flex items-center justify-between text-white hover:border-purple-500/60 transition-colors"
              >
                {selectedRole ? (
                  <span className={selectedRole.textClass}>{selectedRole.label}</span>
                ) : (
                  <span className="text-gray-500">Select role</span>
                )}
                <svg className={`w-4 h-4 text-gray-400 transition-transform ${showRoleDropdown ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showRoleDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-[#1a1025] border border-purple-500/30 rounded-lg overflow-hidden z-10 shadow-xl">
                  {roles.map((r) => (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => {
                        setRole(r.value)
                        setShowRoleDropdown(false)
                      }}
                      className={`w-full px-4 py-2.5 text-left ${r.textClass} ${r.bgClass} transition-colors font-medium`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-8">
          <Button
            className="flex-1 bg-green-600 hover:bg-green-500 text-white font-semibold border-0 h-11 shadow-[0_0_15px_rgba(34,197,94,0.3)]"
            onClick={handleSubmit}
          >
            Add Member
          </Button>
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="flex-1 border-gray-600 hover:bg-white/5 text-white h-11"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}
