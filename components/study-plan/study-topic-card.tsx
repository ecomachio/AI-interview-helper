"use client"

import { CheckCircle2, Circle, Clock, ExternalLink } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useState } from "react"

interface Resource {
  type: string
  title: string
  duration: string
}

interface Topic {
  id: string
  title: string
  description: string
  resources: Resource[]
}

interface StudyTopicCardProps {
  topic: Topic
  isCompleted: boolean
  onToggleComplete: () => void
}

export function StudyTopicCard({ topic, isCompleted, onToggleComplete }: StudyTopicCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card className="overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold">{topic.title}</h3>
            <p className="text-sm text-muted-foreground">{topic.description}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={isCompleted ? "text-green-500" : "text-muted-foreground"}
            onClick={onToggleComplete}
          >
            {isCompleted ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <Circle className="h-5 w-5" />
            )}
          </Button>
        </div>

        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between mt-4">
              <span>View Resources</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-4 space-y-3">
              {topic.resources.map((resource, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <p className="font-medium">{resource.title}</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {resource.type}
                    </p>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    {resource.duration}
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </Card>
  )
}