"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, MapPin, Calendar, Send, User, MessageSquare, X } from "lucide-react"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useTheme } from "next-themes"

// Types for user profile and jobs
type UserProfile = {
  disability?: string
  age?: number
  gender?: string
  educationLevel?: string
  skills: string[]
  experience?: string
  jobType?: string
  industry?: string
  accessibilityOptions: string[]
}

type Job = {
  id: number
  title: string
  company: string
  location: string
  type: string
  description: string
  suitableFor: string[]
  requiredSkills: string[]
  industry: string
  experienceLevel: string
  educationLevel: string
  accessibilityFeatures: string[]
  postedDate: string
}

// Mock job data
const jobsData: Job[] = [
  {
    id: 1,
    title: "Customer Service Representative",
    company: "Inclusive Solutions",
    location: "Remote",
    type: "Remote",
    description: "Provide customer support via email and chat. No phone calls required.",
    suitableFor: ["Deaf/Dumb", "Physical Disability"],
    requiredSkills: ["Customer service", "Written communication", "Problem solving"],
    industry: "Technology",
    experienceLevel: "5+ years",
    educationLevel: "Graduate",
    accessibilityFeatures: ["Inclusive environment", "Text-based communication"],
    postedDate: "2024-03-15",
  },
  {
    id: 2,
    title: "Sign Language Instructor",
    company: "Learning Together NGO",
    location: "Remote",
    type: "Remote",
    description: "Teach sign language to beginners through our online platform.",
    suitableFor: ["Deaf/Dumb"],
    requiredSkills: ["Sign language", "Teaching", "Patience"],
    industry: "NGO",
    experienceLevel: "3+ years",
    educationLevel: "Graduate",
    accessibilityFeatures: ["Inclusive environment", "Visual communication tools"],
    postedDate: "2024-03-20",
  },
  {
    id: 3,
    title: "Accessibility Consultant",
    company: "Equal Access Foundation",
    location: "Remote",
    type: "Remote",
    description: "Help organizations improve their accessibility practices for deaf and hard of hearing individuals.",
    suitableFor: ["Deaf/Dumb"],
    requiredSkills: ["Sign language", "Accessibility knowledge", "Consulting"],
    industry: "NGO",
    experienceLevel: "8+ years",
    educationLevel: "Postgraduate",
    accessibilityFeatures: ["Inclusive environment", "Sign language interpreters available"],
    postedDate: "2024-03-18",
  },
  {
    id: 4,
    title: "Data Entry Specialist",
    company: "DataFirst Solutions",
    location: "Remote",
    type: "Remote",
    description: "Input and process information into company databases with high accuracy.",
    suitableFor: ["Deaf/Dumb", "Physical Disability", "Visual Impairment"],
    requiredSkills: ["Data entry", "Attention to detail", "Computer skills"],
    industry: "Technology",
    experienceLevel: "1+ years",
    educationLevel: "High School",
    accessibilityFeatures: ["Screen reader compatible", "Flexible hours"],
    postedDate: "2024-03-25",
  },
  {
    id: 5,
    title: "NGO Program Coordinator",
    company: "Disability Rights Action",
    location: "Remote",
    type: "Remote",
    description: "Coordinate programs that support individuals with hearing impairments.",
    suitableFor: ["Deaf/Dumb"],
    requiredSkills: ["Project management", "Sign language", "Customer service"],
    industry: "NGO",
    experienceLevel: "7+ years",
    educationLevel: "Postgraduate",
    accessibilityFeatures: ["Inclusive environment", "Sign language interpreters"],
    postedDate: "2024-03-10",
  },
]

// Chat message type
type Message = {
  id: string
  type: "bot" | "user" | "jobs"
  content: string | React.ReactNode
}

// Questions to ask the user
const questions = [
  {
    id: "disability",
    question: "What is your disability type?",
    type: "select",
    options: ["Deaf/Dumb", "Physical Disability", "Cognitive Disability", "Multiple Disabilities", "Other"],
  },
  {
    id: "age",
    question: "What is your age?",
    type: "number",
  },
  {
    id: "gender",
    question: "What is your gender?",
    type: "select",
    options: ["Male", "Female", "Non-binary", "Prefer not to say"],
  },
  {
    id: "educationLevel",
    question: "What is your highest education level?",
    type: "select",
    options: ["High School", "Associate", "Graduate", "Postgraduate", "Doctorate"],
  },
  {
    id: "skills",
    question: "What skills do you have? (Select all that apply)",
    type: "multi-select",
    options: [
      "Sign language",
      "Customer service",
      "Data entry",
      "Programming",
      "Design",
      "Writing",
      "Project management",
      "Teaching",
      "Accounting",
      "Marketing",
    ],
  },
  {
    id: "experience",
    question: "How many years of work experience do you have?",
    type: "select",
    options: ["Less than 1 year", "1-3 years", "3-5 years", "5-10 years", "10+ years"],
  },
  {
    id: "jobType",
    question: "What type of job are you looking for?",
    type: "select",
    options: ["Remote", "On-site", "Hybrid", "Any"],
  },
  {
    id: "industry",
    question: "What industry are you interested in?",
    type: "select",
    options: [
      "Technology",
      "Healthcare",
      "Education",
      "Finance",
      "Retail",
      "Manufacturing",
      "NGO",
      "Government",
      "Other",
    ],
  },
  {
    id: "accessibilityOptions",
    question: "What accessibility options do you need? (Select all that apply)",
    type: "multi-select",
    options: [
      "Inclusive environment",
      "Sign language interpreters",
      "Screen reader compatibility",
      "Flexible hours",
      "Physical accommodations",
      "Text-based communication",
    ],
  },
]

export default function JobMatchingChatbot({ initiallyOpen = false }: { initiallyOpen?: boolean }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "bot",
      content:
        "Hello! I'm your job matching assistant. I'll help you find jobs that match your profile. Let's start with a few questions.",
    },
  ])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userProfile, setUserProfile] = useState<UserProfile>({
    skills: [],
    accessibilityOptions: [],
  })
  const [inputValue, setInputValue] = useState("")
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [isProfileComplete, setIsProfileComplete] = useState(false)
  const [matchedJobs, setMatchedJobs] = useState<Job[]>([])
  const [isChatOpen, setIsChatOpen] = useState(initiallyOpen)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { theme, setTheme } = useTheme()

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      // Use scrollIntoView with a block: "nearest" option to prevent page scrolling
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" })
    }
  }, [messages])

  // Ask the first question when the component mounts
  useEffect(() => {
    if (currentQuestionIndex === 0 && messages.length === 1) {
      setTimeout(() => {
        askQuestion(questions[0])
      }, 500)
    }
  }, [])

  // Filter jobs based on user profile
  useEffect(() => {
    if (isProfileComplete) {
      const filtered = jobsData.filter((job) => {
        // Match disability
        const disabilityMatch = !userProfile.disability || job.suitableFor.includes(userProfile.disability)

        // Match job type
        const jobTypeMatch = !userProfile.jobType || userProfile.jobType === "Any" || job.type === userProfile.jobType

        // Match industry
        const industryMatch =
          !userProfile.industry || userProfile.industry === "Other" || job.industry === userProfile.industry

        // Match education level (exact match or higher)
        const educationLevels = ["High School", "Associate", "Graduate", "Postgraduate", "Doctorate"]
        const userEducationIndex = userProfile.educationLevel ? educationLevels.indexOf(userProfile.educationLevel) : -1
        const jobEducationIndex = educationLevels.indexOf(job.educationLevel)
        const educationMatch = userEducationIndex === -1 || jobEducationIndex >= userEducationIndex

        // Match experience level
        const experienceLevels = {
          "Less than 1 year": 0,
          "1-3 years": 1,
          "3-5 years": 3,
          "5-10 years": 5,
          "10+ years": 10,
        }
        const userExperience = userProfile.experience
          ? experienceLevels[userProfile.experience as keyof typeof experienceLevels]
          : 0
        const jobExperience = Number.parseInt(job.experienceLevel.split("+")[0])
        const experienceMatch = userExperience >= jobExperience

        // Match skills (at least one skill should match)
        const skillsMatch =
          userProfile.skills.length === 0 || userProfile.skills.some((skill) => job.requiredSkills.includes(skill))

        // Match accessibility options (at least one option should match)
        const accessibilityMatch =
          userProfile.accessibilityOptions.length === 0 ||
          userProfile.accessibilityOptions.some((option) => job.accessibilityFeatures.includes(option))

        return disabilityMatch && jobTypeMatch && industryMatch && educationMatch && skillsMatch && accessibilityMatch
      })

      setMatchedJobs(filtered)

      // Add matched jobs to chat
      setMessages((prev) => [
        ...prev,
        {
          id: `jobs-${Date.now()}`,
          type: "bot",
          content: `I found ${filtered.length} job${filtered.length === 1 ? "" : "s"} that match your profile.`,
        },
        {
          id: `jobs-list-${Date.now()}`,
          type: "jobs",
          content: renderJobs(filtered),
        },
      ])
    }
  }, [isProfileComplete])

  // Ask a question
  const askQuestion = (question: (typeof questions)[0]) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `question-${question.id}`,
        type: "bot",
        content: question.question,
      },
    ])
  }

  // Handle user response
  const handleResponse = () => {
    const currentQuestion = questions[currentQuestionIndex]

    if (currentQuestion.type === "multi-select") {
      // For multi-select questions, use the selectedOptions state
      if (selectedOptions.length === 0) {
        return // Don't proceed if no options are selected
      }

      // Add user response to chat
      setMessages((prev) => [
        ...prev,
        {
          id: `response-${currentQuestion.id}`,
          type: "user",
          content: selectedOptions.join(", "),
        },
      ])

      // Update user profile
      setUserProfile((prev) => ({
        ...prev,
        [currentQuestion.id]: selectedOptions,
      }))

      // Reset selected options for next multi-select question
      setSelectedOptions([])
    } else {
      // For text input or single select
      if (!inputValue) return

      // Add user response to chat
      setMessages((prev) => [
        ...prev,
        {
          id: `response-${currentQuestion.id}`,
          type: "user",
          content: inputValue,
        },
      ])

      // Update user profile
      setUserProfile((prev) => ({
        ...prev,
        [currentQuestion.id]: currentQuestion.type === "number" ? Number.parseInt(inputValue) : inputValue,
      }))

      // Clear input
      setInputValue("")
    }

    // Move to next question or complete profile
    const nextQuestionIndex = currentQuestionIndex + 1
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex)

      // Ask next question after a short delay
      setTimeout(() => {
        askQuestion(questions[nextQuestionIndex])
      }, 500)
    } else {
      // Profile complete, show summary
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: "profile-complete",
            type: "bot",
            content: "Thank you for providing your information. I'll now find jobs that match your profile.",
          },
        ])
        setIsProfileComplete(true)
      }, 500)
    }
  }

  // Toggle selected option for multi-select questions
  const toggleOption = (option: string) => {
    setSelectedOptions((prev) => (prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]))
  }

  // Render jobs
  const renderJobs = (jobs: Job[]) => {
    if (jobs.length === 0) {
      return (
        <div className="text-center py-4">
          <p>No matching jobs found. Try adjusting your preferences.</p>
          <Button onClick={resetChat} className="mt-4">
            Start Over
          </Button>
        </div>
      )
    }

    return (
      <div className="space-y-4">
        {jobs.map((job) => (
          <Card key={job.id} className="border-2 hover:border-purple-300 transition-all">
            <CardHeader className="pb-2">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-md bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-purple-600 dark:text-purple-300" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{job.title}</CardTitle>
                  <p className="text-sm font-medium">{job.company}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm mb-2">{job.description}</p>

              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-2">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>Posted: {job.postedDate}</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap gap-1">
                  {job.suitableFor.map((disability, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {disability}
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1">
                  {job.requiredSkills.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Link href={`/jobs/${job.id}`} className="w-full">
                <Button size="sm" className="w-full">
                  Apply Now
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}

        <Button onClick={resetChat} variant="outline" className="w-full mt-4">
          Start Over
        </Button>
      </div>
    )
  }

  // Reset chat
  const resetChat = () => {
    setMessages([
      {
        id: "welcome",
        type: "bot",
        content:
          "Hello! I'm your job matching assistant. I'll help you find jobs that match your profile. Let's start with a few questions.",
      },
    ])
    setCurrentQuestionIndex(0)
    setUserProfile({
      skills: [],
      accessibilityOptions: [],
    })
    setInputValue("")
    setSelectedOptions([])
    setIsProfileComplete(false)
    setMatchedJobs([])

    // Ask first question after a short delay
    setTimeout(() => {
      askQuestion(questions[0])
    }, 500)
  }

  // Toggle chat open/closed
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Render current input based on question type
  const renderInput = () => {
    if (isProfileComplete) return null

    const currentQuestion = questions[currentQuestionIndex]

    switch (currentQuestion.type) {
      case "select":
        return (
          <Select value={inputValue} onValueChange={setInputValue}>
            <SelectTrigger className="w-full" aria-label={currentQuestion.question}>
              <SelectValue placeholder={`Select ${currentQuestion.id}`} />
            </SelectTrigger>
            <SelectContent>
              {currentQuestion.options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case "multi-select":
        return (
          <div className="space-y-2">
            {currentQuestion.options.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={option}
                  checked={selectedOptions.includes(option)}
                  onCheckedChange={() => toggleOption(option)}
                />
                <Label htmlFor={option} className="text-sm cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        )

      case "number":
        return (
          <Input
            type="number"
            placeholder="Enter a number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            min={1}
            max={100}
          />
        )

      default:
        return (
          <Input placeholder="Type your answer..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        )
    }
  }

  return (
    <>
      {/* Chat toggle button */}
      {!initiallyOpen && (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
          <Button
            onClick={toggleTheme}
            variant="outline"
            size="icon"
            className="rounded-full h-10 w-10"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </Button>

          <Button
            onClick={toggleChat}
            className={`rounded-full h-14 w-14 ${isChatOpen ? "bg-red-500 hover:bg-red-600" : "bg-purple-600 hover:bg-purple-700"}`}
            aria-label={isChatOpen ? "Close job matching chatbot" : "Open job matching chatbot"}
          >
            {isChatOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
          </Button>
        </div>
      )}

      {/* Chat window - always visible when initiallyOpen is true */}
      {isChatOpen && (
        <div
          className={`${initiallyOpen ? "w-full h-auto position-static" : "fixed bottom-20 right-4 z-50 w-full max-w-md bg-background border rounded-lg shadow-lg"} flex flex-col ${initiallyOpen ? "min-h-[500px]" : "h-[70vh] max-h-[600px]"}`}
        >
          <div className="p-4 border-b flex justify-between items-center">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-purple-600" />
              <h2 className="font-semibold">Job Matching Assistant</h2>
            </div>
            {!initiallyOpen && (
              <Button variant="ghost" size="icon" onClick={toggleChat} aria-label="Close chat">
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <ScrollArea className="flex-grow p-4" style={{ height: initiallyOpen ? "400px" : "60vh", overflowY: "auto" }}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === "user"
                        ? "bg-purple-600 text-white"
                        : message.type === "jobs"
                          ? "w-full"
                          : "bg-muted"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="p-4 border-t">
            {!isProfileComplete && (
              <div className="space-y-4">
                {renderInput()}

                <Button
                  onClick={handleResponse}
                  className="w-full"
                  disabled={
                    (questions[currentQuestionIndex].type === "multi-select" && selectedOptions.length === 0) ||
                    (questions[currentQuestionIndex].type !== "multi-select" && !inputValue)
                  }
                >
                  <Send className="h-4 w-4 mr-2" />
                  Submit
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Only show the toggle button when not initiallyOpen */}
    </>
  )
}
