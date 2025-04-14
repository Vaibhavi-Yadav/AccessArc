"use client"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Settings, ZoomIn, Type, Contrast, MousePointer } from "lucide-react"
import { useState, useEffect } from "react"
import GoogleTranslate from "./google-translate"

export default function AccessibilityToolbar() {
  const [fontSize, setFontSize] = useState(100)
  const [highContrast, setHighContrast] = useState(false)
  const [focusOutline, setFocusOutline] = useState(false)
  const [largePointer, setLargePointer] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // Apply accessibility settings
  useEffect(() => {
    // Font size
    document.documentElement.style.fontSize = `${fontSize}%`

    // High contrast
    if (highContrast) {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }

    // Focus outline
    if (focusOutline) {
      document.documentElement.classList.add("focus-visible")
    } else {
      document.documentElement.classList.remove("focus-visible")
    }

    // Large pointer
    if (largePointer) {
      document.documentElement.classList.add("large-pointer")
    } else {
      document.documentElement.classList.remove("large-pointer")
    }
  }, [fontSize, highContrast, focusOutline, largePointer])

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex flex-col items-end gap-2">
        <GoogleTranslate />

        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              size="lg"
              className="rounded-full h-14 w-14 bg-purple-600 hover:bg-purple-700"
              aria-label="Accessibility settings"
            >
              <Settings className="h-6 w-6" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Accessibility Settings</h3>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Type className="h-4 w-4" />
                    <span>Font Size</span>
                  </div>
                  <span>{fontSize}%</span>
                </div>
                <Slider
                  value={[fontSize]}
                  min={75}
                  max={200}
                  step={5}
                  onValueChange={(value) => setFontSize(value[0])}
                  aria-label="Adjust font size"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Contrast className="h-4 w-4" />
                  <span>High Contrast</span>
                </div>
                <Switch
                  checked={highContrast}
                  onCheckedChange={setHighContrast}
                  aria-label="Toggle high contrast mode"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ZoomIn className="h-4 w-4" />
                  <span>Focus Outline</span>
                </div>
                <Switch checked={focusOutline} onCheckedChange={setFocusOutline} aria-label="Toggle focus outline" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MousePointer className="h-4 w-4" />
                  <span>Large Pointer</span>
                </div>
                <Switch checked={largePointer} onCheckedChange={setLargePointer} aria-label="Toggle large pointer" />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
