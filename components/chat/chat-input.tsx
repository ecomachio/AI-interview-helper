"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2Icon, Send } from "lucide-react"
import Markdown from 'react-markdown'
import { Technology, useGloblaStore } from "../store"
import { Textarea } from "../ui/textarea"
import ExpandingInput from "../ui/Expending-input"

export function ChatInput({ setShowSuggestions }: { setShowSuggestions: (show: boolean) => void }) {
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const setTechnologiesList = useGloblaStore.use.setTechnologiesList();
  const shouldChatInputExpand = useGloblaStore.use.shouldChatInputExpand();
  const setShouldChatInputExpand = useGloblaStore.use.setShouldChatInputExpand();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      setIsLoading(true)

      try {
        const res = await fetch('/api/technologies/extract', {
          method: 'POST',
          body: JSON.stringify({ input })
        }).then(res => res.json() as Promise<{ response: Technology[] }>)
        console.log(res)
        setTechnologiesList(res.response)
        setShouldChatInputExpand(false)
        setInput("")
        setShowSuggestions(true)
      } catch (error) {
        console.error('Error:', error)

      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="relative flex items-center gap-4">
        <ExpandingInput
          value={input}
          onChange={handleInputChange}
          className="rounded-2xl border-2 max-h-[200px] bg-background/80 px-6 backdrop-blur-sm focus-visible:ring-primary overflow-auto scroll-hidden"
          placeholder="Cole os requisitos da vaga aqui"
          shouldExpand={shouldChatInputExpand}
        />
        <Button type="submit" size="icon" className="h-12 w-16 rounded-full self-end">
          {isLoading ? <Loader2Icon className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
        </Button>
      </form>
    </>
  )
}