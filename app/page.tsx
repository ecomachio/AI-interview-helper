"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Bot, Sparkles } from "lucide-react"
import { ChatInput } from "@/components/chat/chat-input"
import { SuggestionCard } from "@/components/chat/suggestion-card"

export default function Home() {
  const router = useRouter()
  const [showSuggestions, setShowSuggestions] = useState(false)

  const handleMessage = (message: string) => {
    console.log("User message:", message)
    setShowSuggestions(true)
  }

  const handleSuggestionSelect = (suggestion: string, value: number) => {
    console.log("Selected suggestion:", suggestion, "with value:", value)
    router.push("/study-plan")
  }

  const handleSkip = () => {
    setShowSuggestions(false)
  }

  const suggestions = [
    {
      question: "Understanding the fundamentals",
      sliderLabel: "How familiar are you with this topic",
    },
    {
      question: "Practical implementation",
      sliderLabel: "Years of experience in this area",
    },
    {
      question: "Advanced concepts",
      sliderLabel: "Rate your expertise level",
    },
    {
      question: "Real-world applications",
      sliderLabel: "How often do you use this",
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <div className="relative">
            <div className="absolute -left-12 -top-12 h-24 w-24 animate-pulse rounded-full bg-primary/10" />
            <div className="absolute -right-16 -bottom-12 h-32 w-32 animate-pulse rounded-full bg-primary/5 delay-150" />
            <Bot className="h-16 w-16 text-primary" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Your AI Assistant for{" "}
              <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                Everything
              </span>
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Experience the power of AI conversation. Ask questions, get insights, and explore new ideas with our advanced chatbot.
            </p>
          </div>

          <div className="w-full max-w-xl space-y-4">
            <ChatInput onSubmit={handleMessage} />
            
            {showSuggestions && (
              <SuggestionCard
                suggestions={suggestions}
                onSelect={handleSuggestionSelect}
                onSkip={handleSkip}
              />
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4" />
            <span>Powered by advanced AI technology</span>
          </div>
        </div>
      </div>
    </main>
  )
}