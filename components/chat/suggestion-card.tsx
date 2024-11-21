"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { ChevronRight, SkipForward } from "lucide-react"
import { useState } from "react"

interface SuggestionOption {
  question: string
  sliderLabel: string
  value: number
}

interface SuggestionCardProps {
  suggestions: Array<{
    question: string
    sliderLabel: string
  }>
  onSelect: (suggestion: string, value: number) => void
  onSkip: () => void
}

export function SuggestionCard({ suggestions, onSelect, onSkip }: SuggestionCardProps) {
  const [options, setOptions] = useState<SuggestionOption[]>(
    suggestions.map(s => ({ ...s, value: 5 }))
  )

  const handleSliderChange = (index: number, value: number[]) => {
    const newOptions = [...options]
    newOptions[index].value = value[0]
    setOptions(newOptions)
  }

  return (
    <Card className="w-full max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-6">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">
          Rate your experience with each option
        </h3>
        <div className="space-y-6">
          {options.map((option, index) => (
            <div key={index} className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {option.question}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {option.sliderLabel}: {option.value}
                  </p>
                </div>
              </div>
              <div className="px-2">
                <Slider
                  value={[option.value]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={(value) => handleSliderChange(index, value)}
                  className="py-2"
                />
              </div>
              <Button
                variant="outline"
                className="w-full justify-between"
                onClick={() => onSelect(option.question, option.value)}
              >
                <span>Continue with this option</span>
                <ChevronRight className="h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </div>
          ))}
        </div>
        <Button
          variant="ghost"
          className="mt-6 w-full text-muted-foreground"
          onClick={onSkip}
        >
          <SkipForward className="mr-2 h-4 w-4" />
          Skip suggestions
        </Button>
      </div>
    </Card>
  )
}