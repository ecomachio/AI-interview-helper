"use client"

import { useState } from "react"
import { BarChart, BookOpen, Calendar, CheckCircle, Code, Database, Layout, Network, Server } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useGloblaStore } from "@/components/store"
const topics = [
  { name: "Data Structures", icon: Database, progress: 75 },
  { name: "Algorithms", icon: Code, progress: 60 },
  { name: "System Design", icon: Layout, progress: 40 },
  { name: "Operating Systems", icon: Server, progress: 30 },
  { name: "Computer Networks", icon: Network, progress: 25 },
]

const schedule = [
  { day: "Monday", topic: "Data Structures", duration: "2 hours" },
  { day: "Tuesday", topic: "Algorithms", duration: "2 hours" },
  { day: "Wednesday", topic: "System Design", duration: "1.5 hours" },
  { day: "Thursday", topic: "Operating Systems", duration: "1 hour" },
  { day: "Friday", topic: "Computer Networks", duration: "1 hour" },
  { day: "Saturday", topic: "Practice Problems", duration: "3 hours" },
  { day: "Sunday", topic: "Mock Interview", duration: "1 hour" },
]

export default function Dashboard() {
  const [overallProgress, setOverallProgress] = useState(46)

  const technologiesList = useGloblaStore.use.technologiesList();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Tech Interview Study Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
            <CardDescription>Your journey to interview readiness</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <div className="relative h-40 w-40">
                <svg className="h-full w-full" viewBox="0 0 100 100">
                  <circle
                    className="text-muted-foreground stroke-current"
                    strokeWidth="10"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                  ></circle>
                  <circle
                    className="text-primary stroke-current"
                    strokeWidth="10"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    strokeDasharray={`${overallProgress * 2.51}, 251.2`}
                    transform="rotate(-90 50 50)"
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">{overallProgress}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Study Streak</CardTitle>
            <CardDescription>Consistency is key</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <BarChart className="h-10 w-10 text-primary" />
              <div>
                <p className="text-2xl font-semibold">7 Days</p>
                <p className="text-sm text-muted-foreground">Keep it up!</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Topics Mastered</CardTitle>
            <CardDescription>Your growing expertise</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <CheckCircle className="h-10 w-10 text-primary" />
              <div>
                <p className="text-2xl font-semibold">3 / 15</p>
                <p className="text-sm text-muted-foreground">Core topics</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Study Topics</h2>
      <div className="space-y-4">
        {topics.map((topic) => (
          <Card key={topic.name}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <topic.icon className="h-5 w-5 text-primary" />
                  <span className="font-medium">{topic.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">{topic.progress}%</span>
              </div>
              <Progress value={topic.progress} className="h-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Weekly Study Schedule</h2>
      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {schedule.map((item) => (
              <div key={item.day} className="flex items-center justify-between p-4">
                <div>
                  <p className="font-medium">{item.day}</p>
                  <p className="text-sm text-muted-foreground">{item.topic}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{item.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 flex justify-center">
        <Button className="flex items-center space-x-2">
          <BookOpen className="h-4 w-4" />
          <span>Start Studying</span>
        </Button>
      </div>
    </div>
  )
}

