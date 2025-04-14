"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ModeToggle } from "./mode-toggle"
import Link from "next/link"
import { Menu, ArrowLeft, ArrowRight, Home } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [canGoBack, setCanGoBack] = useState(false)
  const [canGoForward, setCanGoForward] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Check if we can go back or forward
  useEffect(() => {
    // This is a simplified check - in a real app, you would track history
    setCanGoBack(pathname !== "/")

    // For demo purposes, we'll just disable forward button after navigation
    const handlePopState = () => {
      setCanGoForward(window.history.state !== null)
    }

    window.addEventListener("popstate", handlePopState)

    // Initial check
    setCanGoForward(window.history.state !== null)

    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [pathname])

  const goBack = () => {
    router.back()
  }

  const goForward = () => {
    router.forward()
  }

  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 fixed top-0 left-0 right-0 z-50">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          {/* Back and Forward Navigation Buttons */}
          <div className="flex items-center gap-2 mr-4">
            <Button variant="ghost" size="icon" onClick={goBack} disabled={!canGoBack} aria-label="Go back">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={goForward} disabled={!canGoForward} aria-label="Go forward">
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>

          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold">
              <span className="text-purple-700 dark:text-purple-400">Access</span>
              Arc
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/" ? "text-primary font-semibold" : ""}`}
          >
            <span className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              Home
            </span>
          </Link>
          <Link
            href="/schemes"
            className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/schemes" ? "text-primary font-semibold" : ""}`}
          >
            Schemes
          </Link>
          <Link
            href="/jobs"
            className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/jobs" ? "text-primary font-semibold" : ""}`}
          >
            Jobs
          </Link>
          <Link
            href="/job-matching"
            className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/job-matching" ? "text-primary font-semibold" : ""}`}
          >
            Job Matching
          </Link>
          <Link
            href="/resources"
            className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/resources" ? "text-primary font-semibold" : ""}`}
          >
            Resources
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/about" ? "text-primary font-semibold" : ""}`}
          >
            About
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          </div>
          <ModeToggle />

          {/* Mobile Menu */}
          <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px] md:hidden">
              <DropdownMenuItem asChild>
                <Link href="/">
                  <span className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    Home
                  </span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/schemes">Schemes</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/jobs">Jobs</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/job-matching">Job Matching</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/resources">Resources</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/about">About</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/login">Log in</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/register">Register</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
