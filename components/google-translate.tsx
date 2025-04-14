"use client"

import { useEffect, useState } from "react"
import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock implementation of Google Translate API
// In a real application, you would integrate with the actual Google Translate API
const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "ja", name: "Japanese" },
  { code: "zh", name: "Chinese" },
  { code: "ar", name: "Arabic" },
  { code: "ru", name: "Russian" },
]

export default function GoogleTranslate() {
  const [currentLanguage, setCurrentLanguage] = useState("en")

  // This is a mock implementation
  // In a real application, you would use the Google Translate API
  useEffect(() => {
    // Add translation hover functionality
    const translateOnHover = (event: MouseEvent) => {
      const target = event.target as HTMLElement

      // Only translate text elements that are not in inputs or buttons
      if (
        target.nodeType === Node.TEXT_NODE ||
        (target instanceof HTMLElement &&
          !["INPUT", "BUTTON", "TEXTAREA", "SELECT"].includes(target.tagName) &&
          !target.closest(".no-translate"))
      ) {
        // In a real implementation, you would call the Google Translate API here
        // For now, we'll just add a data attribute to show it's translatable
        if (target instanceof HTMLElement && !target.dataset.translatable) {
          target.dataset.translatable = "true"

          // Store the original text
          if (!target.dataset.originalText) {
            target.dataset.originalText = target.innerText
          }

          // Add hover styles
          target.addEventListener("mouseenter", () => {
            target.classList.add("translate-hover")
          })

          target.addEventListener("mouseleave", () => {
            target.classList.remove("translate-hover")
          })
        }
      }
    }

    // Add event listener for mouseover
    if (currentLanguage !== "en") {
      document.addEventListener("mouseover", translateOnHover)
    }

    // Clean up
    return () => {
      document.removeEventListener("mouseover", translateOnHover)
    }
  }, [currentLanguage])

  // Change the page language
  const changeLanguage = (langCode: string) => {
    setCurrentLanguage(langCode)
    document.documentElement.lang = langCode

    // In a real implementation, you would call the Google Translate API to translate the page
    console.log(`Changed language to ${langCode}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full" aria-label="Change language">
          <Globe className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={currentLanguage === lang.code ? "bg-muted" : ""}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
