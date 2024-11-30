"use client"

import React, { useState, useRef, useEffect } from 'react'
import { cn } from "@/lib/utils"

interface ExpandingInputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
  shouldExpand?: boolean
}

export default function ExpandingInput({ className, shouldExpand = true, ...props }: ExpandingInputProps) {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      if (shouldExpand) {
        // Reset height to auto to get the correct scrollHeight
        textareaRef.current.style.height = 'auto'
        // Set the height to the scrollHeight
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
      } else {
        textareaRef.current.style.height = 'auto'
      }
    }
  }, [value, shouldExpand])

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value)
    if (props.onChange) {
      props.onChange(event)
    }
  }

  return (
    <textarea
      {...props}
      ref={textareaRef}
      value={value}
      onChange={handleChange}
      rows={1}
      className={cn(
        "flex min-h-[40px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        "resize-none overflow-hidden transition-all duration-200",
        value ? "h-auto" : "h-10",
        className
      )}
    />
  )
}

