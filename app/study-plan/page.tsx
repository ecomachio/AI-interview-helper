"use client"

import { useState } from "react"
import { CheckCircle2, Circle, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card } from "@/components/ui/card"
import { StudyTopicCard } from "@/components/study-plan/study-topic-card"

export default function StudyPlan() {
  const [progress, setProgress] = useState(0)
  const [completedTopics, setCompletedTopics] = useState<string[]>([])

  const topics = [
    {
      id: "1",
      title: "Basic Concepts",
      description: "Foundation knowledge and core principles",
      resources: [
        { type: "video", title: "Introduction to the Topic", duration: "15 mins" },
        { type: "article", title: "Getting Started Guide", duration: "10 mins" },
        { type: "exercise", title: "Basic Practice Problems", duration: "20 mins" },
      ],
    },
    {
      id: "2",
      title: "Intermediate Applications",
      description: "Practical implementations and real-world scenarios",
      resources: [
        { type: "tutorial", title: "Hands-on Workshop", duration: "45 mins" },
        { type: "quiz", title: "Knowledge Check", duration: "15 mins" },
        { type: "project", title: "Mini Project", duration: "60 mins" },
      ],
    },
    {
      id: "3",
      title: "Advanced Techniques",
      description: "Complex concepts and specialized knowledge",
      resources: [
        { type: "video", title: "Deep Dive Session", duration: "30 mins" },
        { type: "exercise", title: "Advanced Problems", duration: "40 mins" },
        { type: "project", title: "Final Project", duration: "90 mins" },
      ],
    },
  ]

  const handleTopicComplete = (topicId: string) => {
    if (completedTopics.includes(topicId)) {
      setCompletedTopics(completedTopics.filter(id => id !== topicId))
    } else {
      setCompletedTopics([...completedTopics, topicId])
    }
    const newProgress = Math.round((completedTopics.length / topics.length) * 100)
    setProgress(newProgress)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold">Your Personalized Study Plan</h1>
        <p className="text-muted-foreground">
          Track your progress and complete the topics at your own pace.
        </p>
        
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold">Overall Progress</h2>
              <p className="text-sm text-muted-foreground">
                {completedTopics.length} of {topics.length} topics completed
              </p>
            </div>
            {progress === 100 && (
              <Trophy className="h-6 w-6 text-yellow-500 animate-bounce" />
            )}
          </div>
          <Progress value={progress} className="h-2" />
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <StudyTopicCard
            key={topic.id}
            topic={topic}
            isCompleted={completedTopics.includes(topic.id)}
            onToggleComplete={() => handleTopicComplete(topic.id)}
          />
        ))}
      </div>
    </div>
  )
}