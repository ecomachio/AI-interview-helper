"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Bot, LandPlot, Sparkles } from "lucide-react"
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
    router.push("/dashboard")
  }

  const handleSkip = () => {
    setShowSuggestions(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">

          <div className={`relative transition-all duration-500 ${showSuggestions ? 'opacity-0 translate-y-[-1000px]' : 'opacity-100 translate-y-0'}`}>
            <div className="absolute -left-12 -top-12 h-24 w-24 animate-pulse rounded-full bg-primary/10" />
            <div className="absolute -right-16 -bottom-12 h-32 w-32 animate-pulse rounded-full bg-primary/5 delay-150" />
            <LandPlot className="h-20 w-20 text-primary" />
          </div>

          <div className={`relative z-10 max-w-3xl space-y-4 transition-all duration-500 ${showSuggestions ? 'opacity-0 translate-y-[-1000px]' : 'opacity-100 translate-y-0'}`}>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Seu copiloto na {" "}
              <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                entrevistas
              </span>
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Manda os requisitos da vaga e veja a mágica acontecer: estudo sob medida pra você!
            </p>
          </div>

          <div className={`w-full max-w-xl space-y-4 transition-all duration-500 ${showSuggestions ? 'translate-y-[-400px]' : 'translate-y-0'}`}>
            <ChatInput setShowSuggestions={setShowSuggestions} />

            {showSuggestions && (
              <SuggestionCard
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