"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

interface ChatInputProps {
  onSubmit: (message: string) => void
}

export function ChatInput({ onSubmit }: ChatInputProps) {
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSubmit(message)
      setMessage("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
      <div className="absolute inset-0 h-full w-full scale-[0.80] transform rounded-full bg-primary/5 blur-3xl" />
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="h-12 rounded-full border-2 bg-background/80 px-6 backdrop-blur-sm focus-visible:ring-primary"
        placeholder="Ask me anything..."
      />
      <Button type="submit" size="icon" className="h-12 w-12 rounded-full">
        <Send className="h-5 w-5" />
      </Button>
    </form>
  )
}