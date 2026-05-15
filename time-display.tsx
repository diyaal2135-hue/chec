"use client"

import { useState, useEffect } from "react"

export function TimeDisplay() {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    // Set initial time on client
    setTime(new Date().toLocaleTimeString())
    
    // Update every second
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])

  // Don't render anything until client-side to avoid hydration mismatch
  if (!time) return <span className="text-xs text-gray-500">--:--:-- --</span>
  
  return <span className="text-xs text-gray-500">{time}</span>
}
