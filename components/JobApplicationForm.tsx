"use client"

import { useState } from "react"
import { useRouter } from "next/navigation" // Changed from "next/router"
import Head from "next/head"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

type Props = {
    jobId: string
}

interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
}

const JobApplicationForm = ({ jobId }: Props) => {
    const router = useRouter()
   
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [fileName, setFileName] = useState<string>("")
    const [formStep, setFormStep] = useState<number>(1)
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false)
    const [formProgress, setFormProgress] = useState<number>(0)
    
    const jobs: Job[] = [
        {
          id: "1",
          title: "Accessibility Tester",
          company: "TechAccess Solutions",
          location: "Remote",
          type: "Full-time"
        },
        {
          id: "2",
          title: "Customer Support Specialist",
          company: "Inclusive Services Inc.",
          location: "New York, NY",
          type: "Part-time"
        },
        {
          id: "3",
          title: "Data Entry Operator",
          company: "DataFirst Solutions",
          location: "Chicago, IL",
          type: "Contract"
        },
        {
          id: "4",
          title: "Content Writer",
          company: "Creative Minds Publishing",
          location: "Remote",
          type: "Freelance"
        },
        {
          id: "5",
          title: "Accounting Assistant",
          company: "Financial Partners Ltd.",
          location: "Boston, MA",
          type: "Full-time"
        },
    ]
    
    const job = jobs.find(job => job.id === jobId) || { 
        title: "Job Position", 
        company: "Company", 
        location: "Location", 
        type: "Type" 
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFileName(e.target.files[0].name)
            // Update progress
            calculateProgress();
        }
    }

    const calculateProgress = () => {
        // Simple progress calculation based on form step
        const progress = formStep === 1 ? 33 : formStep === 2 ? 66 : 100;
        setFormProgress(progress);
    }

    const nextStep = () => {
        const nextStep = formStep + 1;
        setFormStep(nextStep);
        calculateProgress();
    }

    const prevStep = () => {
        const prevStep = formStep - 1;
        setFormStep(prevStep);
        calculateProgress();
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        
        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false)
            setFormSubmitted(true)
            setFormProgress(100)
            // Wait 3 seconds before redirecting
            setTimeout(() => {
                router.push("/jobs")
            }, 3000)
        }, 2000)
    }

    return (
        <main className="min-h-screen py-10 bg-gradient-to-b from-purple-50 to-white dark:from-purple-950/20 dark:to-background">
            <Head>
                <title>Apply for {job.title} | Inclusive Jobs Portal</title>
            </Head>
            <div className="container mx-auto px-4 max-w-3xl">
                <Link href="/jobs" className="flex items-center gap-2 text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 mb-6 transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Jobs</span>
                </Link>

                {formSubmitted ? (
                    <Card className="border-2 border-green-200 dark:border-green-800 shadow-lg">
                        <CardHeader className="bg-green-50 dark:bg-green-900/20">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                                <CardTitle className="text-2xl">Application Submitted!</CardTitle>
                            </div>
                            <CardDescription>Thank you for applying to {job.title} at {job.company}</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4">
                            <p>Your application has been successfully submitted. We will review your application and get back to you soon.</p>
                            <p>You will be redirected to the jobs page shortly...</p>
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="border-2 border-purple-200 dark:border-purple-800 shadow-lg">
                        <CardHeader className="bg-purple-50 dark:bg-purple-950/20 border-b border-purple-100 dark:border-purple-800/30">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <CardTitle className="text-2xl text-purple-800 dark:text-purple-300">{job.title}</CardTitle>
                                    <CardDescription className="text-purple-600 dark:text-purple-400">at {job.company}</CardDescription>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700">
                                        {job.location}
                                    </Badge>
                                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700">
                                        {job.type}
                                    </Badge>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="flex justify-between text-xs text-purple-600 dark:text-purple-400 mb-1">
                                    <span>Application Progress</span>
                                    <span>{formProgress}%</span>
                                </div>
                                <Progress value={formProgress} className="h-2 bg-purple-100 dark:bg-purple-900/30 [&>div]:bg-purple-600 [&>div]:dark:bg-purple-400" />
                            </div>
                        </CardHeader>
                        
                        <form onSubmit={handleSubmit}>
                            <CardContent className="pt-6 space-y-6">
                                {formStep === 1 && (
                                    <div className="space-y-6 animate-in fade-in-50 duration-300">
                                        <h3 className="text-lg font-medium text-purple-800 dark:text-purple-300">Personal Information</h3>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="firstName" className="text-purple-700 dark:text-purple-300">First Name *</Label>
                                                <Input 
                                                    id="firstName" 
                                                    required 
                                                    placeholder="Enter your first name" 
                                                    className="border-purple-200 focus:border-purple-400 dark:border-purple-800 dark:focus:border-purple-600"
                                                />
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <Label htmlFor="lastName" className="text-purple-700 dark:text-purple-300">Last Name *</Label>
                                                <Input 
                                                    id="lastName" 
                                                    required 
                                                    placeholder="Enter your last name" 
                                                    className="border-purple-200 focus:border-purple-400 dark:border-purple-800 dark:focus:border-purple-600"
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-purple-700 dark:text-purple-300">Email Address *</Label>
                                            <Input 
                                                id="email" 
                                                type="email" 
                                                required 
                                                placeholder="Enter your email address" 
                                                className="border-purple-200 focus:border-purple-400 dark:border-purple-800 dark:focus:border-purple-600"
                                            />
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <Label htmlFor="phone" className="text-purple-700 dark:text-purple-300">Phone Number *</Label>
                                            <Input 
                                                id="phone" 
                                                required 
                                                placeholder="Enter your phone number" 
                                                className="border-purple-200 focus:border-purple-400 dark:border-purple-800 dark:focus:border-purple-600"
                                            />
                                        </div>

                                        <Alert className="bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800">
                                            <AlertCircle className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                            <AlertTitle className="text-purple-700 dark:text-purple-300">Privacy Notice</AlertTitle>
                                            <AlertDescription className="text-purple-600 dark:text-purple-400">
                                                Your personal information will be handled according to our privacy policy.
                                            </AlertDescription>
                                        </Alert>
                                    </div>
                                )}

                                {formStep === 2 && (
                                    <div className="space-y-6 animate-in fade-in-50 duration-300">
                                        <h3 className="text-lg font-medium text-purple-800 dark:text-purple-300">Accessibility Information</h3>
                                        
                                        <div className="space-y-2">
                                            <Label htmlFor="disability" className="text-purple-700 dark:text-purple-300">Disability Type</Label>
                                            <Select>
                                                <SelectTrigger id="disability" className="border-purple-200 focus:border-purple-400 dark:border-purple-800 dark:focus:border-purple-600">
                                                    <SelectValue placeholder="Select your disability type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="visual">Visual Impairment</SelectItem>
                                                    <SelectItem value="hearing">Hearing Impairment</SelectItem>
                                                    <SelectItem value="physical">Physical Disability</SelectItem>
                                                    <SelectItem value="mobility">Mobility Disability</SelectItem>
                                                    <SelectItem value="cognitive">Cognitive Disability</SelectItem>
                                                    <SelectItem value="neurological">Neurological Disability</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                    <SelectItem value="prefer-not">Prefer not to say</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <Label htmlFor="accommodations" className="text-purple-700 dark:text-purple-300">Required Accommodations</Label>
                                            <Textarea 
                                                id="accommodations" 
                                                placeholder="Please let us know if you require any specific accommodations for the interview process"
                                                className="min-h-24 border-purple-200 focus:border-purple-400 dark:border-purple-800 dark:focus:border-purple-600"
                                            />
                                        </div>

                                        <Alert className="bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800">
                                            <AlertCircle className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                            <AlertTitle className="text-purple-700 dark:text-purple-300">Accessibility Commitment</AlertTitle>
                                            <AlertDescription className="text-purple-600 dark:text-purple-400">
                                                We are committed to providing reasonable accommodations for qualified individuals with disabilities.
                                            </AlertDescription>
                                        </Alert>
                                    </div>
                                )}

                                {formStep === 3 && (
                                    <div className="space-y-6 animate-in fade-in-50 duration-300">
                                        <h3 className="text-lg font-medium text-purple-800 dark:text-purple-300">Experience & Documents</h3>
                                        
                                        <div className="space-y-2">
                                            <Label htmlFor="experience" className="text-purple-700 dark:text-purple-300">Relevant Experience *</Label>
                                            <Textarea 
                                                id="experience" 
                                                required
                                                placeholder="Briefly describe your relevant experience for this position"
                                                className="min-h-32 border-purple-200 focus:border-purple-400 dark:border-purple-800 dark:focus:border-purple-600"
                                            />
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <Label htmlFor="resume" className="text-purple-700 dark:text-purple-300">Upload Resume/CV *</Label>
                                            <div className="border-2 border-dashed border-purple-200 dark:border-purple-800 rounded-md p-6 text-center bg-purple-50/50 dark:bg-purple-950/10 hover:bg-purple-50 dark:hover:bg-purple-950/20 transition-colors cursor-pointer" onClick={() => document.getElementById("resume")?.click()}>
                                                <div className="flex flex-col items-center gap-2">
                                                    <Upload className="h-8 w-8 text-purple-500 dark:text-purple-400" />
                                                    <p className="text-sm font-medium text-purple-700 dark:text-purple-300">
                                                        {fileName ? fileName : "Click to upload or drag and drop"}
                                                    </p>
                                                    <p className="text-xs text-purple-600 dark:text-purple-400">
                                                        PDF, DOCX or TXT (max 5MB)
                                                    </p>
                                                    <Input 
                                                        id="resume" 
                                                        type="file" 
                                                        required
                                                        className="hidden" 
                                                        accept=".pdf,.docx,.doc,.txt" 
                                                        onChange={handleFileChange}
                                                    />
                                                    <Button 
                                                        type="button" 
                                                        variant="outline" 
                                                        size="sm"
                                                        className="border-purple-300 text-purple-700 hover:bg-purple-100 dark:border-purple-700 dark:text-purple-300 dark:hover:bg-purple-900/30"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            document.getElementById("resume")?.click();
                                                        }}
                                                    >
                                                        Select File
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="coverLetter" className="text-purple-700 dark:text-purple-300">Cover Letter</Label>
                                            <div className="border-2 border-dashed border-purple-200 dark:border-purple-800 rounded-md p-6 text-center bg-purple-50/50 dark:bg-purple-950/10 hover:bg-purple-50 dark:hover:bg-purple-950/20 transition-colors cursor-pointer" onClick={() => document.getElementById("coverLetter")?.click()}>
                                                <div className="flex flex-col items-center gap-2">
                                                    <Upload className="h-8 w-8 text-purple-500 dark:text-purple-400" />
                                                    <p className="text-sm font-medium text-purple-700 dark:text-purple-300">
                                                        Upload cover letter (optional)
                                                    </p>
                                                    <p className="text-xs text-purple-600 dark:text-purple-400">
                                                        PDF, DOCX or TXT (max 2MB)
                                                    </p>
                                                    <Input 
                                                        id="coverLetter" 
                                                        type="file" 
                                                        className="hidden" 
                                                        accept=".pdf,.docx,.doc,.txt" 
                                                    />
                                                    <Button 
                                                        type="button" 
                                                        variant="outline" 
                                                        size="sm"
                                                        className="border-purple-300 text-purple-700 hover:bg-purple-100 dark:border-purple-700 dark:text-purple-300 dark:hover:bg-purple-900/30"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            document.getElementById("coverLetter")?.click();
                                                        }}
                                                    >
                                                        Select File
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                            
                            <CardFooter className="flex flex-col sm:flex-row gap-3 justify-end border-t border-purple-100 dark:border-purple-800/30 p-6">
                                {formStep > 1 && (
                                    <Button 
                                        type="button" 
                                        variant="outline"
                                        className="border-purple-300 text-purple-700 hover:bg-purple-100 dark:border-purple-700 dark:text-purple-300 dark:hover:bg-purple-900/30"
                                        onClick={prevStep}
                                    >
                                        Previous
                                    </Button>
                                )}
                                
                                {formStep < 3 ? (
                                    <Button 
                                        type="button"
                                        className="bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-700 dark:hover:bg-purple-600 min-w-32"
                                        onClick={nextStep}
                                    >
                                        Next Step
                                    </Button>
                                ) : (
                                    <Button 
                                        type="submit" 
                                        className="bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-700 dark:hover:bg-purple-600 min-w-32"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Submitting...
                                            </>
                                        ) : (
                                            "Submit Application"
                                        )}
                                    </Button>
                                )}
                            </CardFooter>
                        </form>
                    </Card>
                )}
            </div>
        </main>
    )
}

export default JobApplicationForm