"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { ChevronRight, SkipForward } from "lucide-react"
import { useState } from "react"
import { useGloblaStore } from "../store"

const FAMILIARITY_LABELS = [
  "Não conheço nada",
  "Já ouvi falar",
  "Conheço superficialmente",
  "Entendo os conceitos básicos",
  "Conheço, mas raramente uso",
  "Uso ocasionalmente",
  "Uso com frequência",
  "Uso diariamente",
  "Tenho experiência avançada",
  "Domino completamente"
]

type Familiarity = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

interface SuggestionCardProps {
  onSelect: (suggestion: string, value: number) => void
  onSkip: () => void
}

export function SuggestionCard({ onSelect, onSkip }: SuggestionCardProps) {
  const technologiesList = useGloblaStore.use.technologiesList();
  const setTechnologiesList = useGloblaStore.use.setTechnologiesList();

  const handleSliderChange = (index: number, value: number[]) => {
    const newOptions = [...technologiesList]

    if (value[0] < 0 || value[0] > 10) return;

    newOptions[index].familiarity = value[0] as Familiarity
    setTechnologiesList(newOptions)
  }

  return (
    <Card className="w-full max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-6">
        <div className="mb-10">
          <h2 className="text-lg font-semibold">
            Essas sao as tecnologias que encontramos na sua vaga
          </h2>
          <h3 className="mb-4 text-sm font-medium text-muted-foreground">
            O quao familiar você é com cada tecnologia?
          </h3>
        </div>
        <div className="space-y-6">
          {technologiesList.map((option, index) => (
            <div key={index} className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1 text-left">
                  <p className="text-sm font-medium leading-none">
                    {option.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {option.description}
                  </p>
                </div>
              </div>
              <div className="px-2">
                <Slider
                  value={[option.familiarity]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={(value) => handleSliderChange(index, value)}
                  className="py-2"
                />
                <p className="text-sm text-muted-foreground text-right">
                  {FAMILIARITY_LABELS[option.familiarity - 1]}
                </p>
              </div>
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