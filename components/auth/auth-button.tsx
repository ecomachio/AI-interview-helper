"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogIn, LogOut, UserPlus, User } from "lucide-react"
import { AuthDialog } from "@/components/auth/auth-dialog"

interface AuthButtonProps {
  isAuthenticated?: boolean
  userImage?: string
  userInitials?: string
}

export function AuthButton({ 
  isAuthenticated = false, 
  userImage = "", 
  userInitials = "U"
}: AuthButtonProps) {
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [authType, setAuthType] = useState<"login" | "signup">("login")

  const handleAuthClick = (type: "login" | "signup") => {
    setAuthType(type)
    setShowAuthDialog(true)
  }

  if (!isAuthenticated) {
    return (
      <>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => handleAuthClick("login")}>
            <LogIn className="mr-2 h-4 w-4" />
            Log in
          </Button>
          <Button size="sm" onClick={() => handleAuthClick("signup")}>
            <UserPlus className="mr-2 h-4 w-4" />
            Sign up
          </Button>
        </div>
        <AuthDialog 
          isOpen={showAuthDialog}
          onClose={() => setShowAuthDialog(false)}
          defaultTab={authType}
        />
      </>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={userImage} alt="Profile" />
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}