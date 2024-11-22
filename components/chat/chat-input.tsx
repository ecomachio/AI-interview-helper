"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2Icon, Send } from "lucide-react"
import Markdown from 'react-markdown'
import { Technology, useGloblaStore } from "../store"

export function ChatInput({ setShowSuggestions }: { setShowSuggestions: (show: boolean) => void }) {
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const setTechnologiesList = useGloblaStore.use.setTechnologiesList();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      setIsLoading(true)


      try {
        const res = await fetch('/api/technologies', {
          method: 'POST',
          body: JSON.stringify({ input })
        }).then(res => res.json() as Promise<{ response: Technology[] }>)
        console.log(res)
        setTechnologiesList(res.response)
        setInput("")
        setShowSuggestions(true)
      } catch (error) {
        console.error('Error:', error)

      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
        <div className="absolute inset-0 h-full w-full scale-[0.80] transform rounded-full bg-primary/5 blur-3xl" />
        <Input
          value={input}
          onChange={handleInputChange}
          className="h-12 rounded-full border-2 bg-background/80 px-6 backdrop-blur-sm focus-visible:ring-primary"
          placeholder="Cole os requisitos da vaga aqui"
        />
        <Button type="submit" size="icon" className="h-12 w-16 rounded-full">
          {isLoading ? <Loader2Icon className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
        </Button>
      </form>
    </>
  )
}