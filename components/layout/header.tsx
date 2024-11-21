import Link from "next/link"
import { Bot } from "lucide-react"
import { AuthButton } from "@/components/auth/auth-button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Bot className="h-6 w-6" />
          <span className="font-bold">AI Assistant</span>
        </Link>

        <AuthButton />
      </div>
    </header>
  )
}