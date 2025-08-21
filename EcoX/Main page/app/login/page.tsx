"use client"

import { useEffect } from "react"

export default function LoginPage() {
  useEffect(() => {
    // Redirect to the HTML login page
    window.location.href = '/login/Login.html'
  }, [])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Redirecting to login...</p>
      </div>
    </div>
  )
}
