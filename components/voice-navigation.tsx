"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Mic, MicOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function VoiceNavigation() {
  const router = useRouter()
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [showHelp, setShowHelp] = useState(false)

  // Mock implementation of speech recognition
  // In a real app, you would use the Web Speech API
  useEffect(() => {
    if (!isListening) return

    // This is a simplified mock of speech recognition
    // In a real app, you would use the actual Web Speech API
    const mockRecognition = {
      start: () => {
        console.log("Started listening")
      },
      stop: () => {
        console.log("Stopped listening")
      },
      onresult: null as ((event: any) => void) | null,
    }

    // Simulate voice commands for demo purposes
    const handleVoiceCommand = (command: string) => {
      setTranscript(command)

      // Process commands
      const lowerCommand = command.toLowerCase()

      if (lowerCommand.includes("help")) {
        setShowHelp(true)
      } else if (lowerCommand.includes("navigate to home") || lowerCommand.includes("go to home")) {
        router.push("/")
      } else if (lowerCommand.includes("navigate to schemes") || lowerCommand.includes("go to schemes")) {
        router.push("/schemes")
      } else if (lowerCommand.includes("navigate to jobs") || lowerCommand.includes("go to jobs")) {
        router.push("/jobs")
      } else if (lowerCommand.includes("navigate to login") || lowerCommand.includes("go to login")) {
        router.push("/login")
      } else if (lowerCommand.includes("navigate to register") || lowerCommand.includes("go to register")) {
        router.push("/register")
      }
    }

    // In a real app, this would be connected to the Web Speech API events
    const mockVoiceCommands = ["Help", "Navigate to home", "Navigate to schemes", "Navigate to jobs"]

    // For demo purposes only - in a real app this would be triggered by actual speech
    const demoTimeout = setTimeout(() => {
      if (isListening) {
        handleVoiceCommand(mockVoiceCommands[Math.floor(Math.random() * mockVoiceCommands.length)])
      }
    }, 5000)

    return () => {
      clearTimeout(demoTimeout)
      mockRecognition.stop()
    }
  }, [isListening, router])

  const toggleListening = () => {
    setIsListening(!isListening)
    if (isListening) {
      setTranscript("")
    }
  }

  return (
    <>
      <div className="fixed bottom-4 left-4 z-50 flex flex-col items-start gap-2">
        <Button
          onClick={toggleListening}
          variant={isListening ? "default" : "outline"}
          size="icon"
          className={`rounded-full h-14 w-14 ${isListening ? "bg-red-500 hover:bg-red-600" : ""}`}
          aria-label={isListening ? "Stop voice navigation" : "Start voice navigation"}
        >
          {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
        </Button>

        {isListening && transcript && (
          <div className="bg-background border rounded-lg p-3 shadow-lg max-w-xs">
            <p className="text-sm font-medium">I heard: {transcript}</p>
          </div>
        )}
      </div>

      <Dialog open={showHelp} onOpenChange={setShowHelp}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Voice Navigation Commands</DialogTitle>
            <DialogDescription>You can use these voice commands to navigate the website.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h3 className="font-medium">Navigation Commands</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>"Navigate to home" - Go to the homepage</li>
                <li>"Navigate to schemes" - View government schemes</li>
                <li>"Navigate to jobs" - Browse job listings</li>
                <li>"Navigate to login" - Go to login page</li>
                <li>"Navigate to register" - Go to registration page</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Help Commands</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>"Help" - Show this help dialog</li>
                <li>"What can I say" - Show this help dialog</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
