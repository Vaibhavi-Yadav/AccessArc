"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Briefcase, MapPin, Calendar } from "lucide-react"
import Link from "next/link"
import Head from "next/head"

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  suitableFor: string[];
  postedDate: string;
  logo: string;
}

// Mock data for job listings
const jobs: Job[] = [
  {
    id: "1",
    title: "Accessibility Tester",
    company: "TechAccess Solutions",
    location: "Remote",
    type: "Full-time",
    description: "Test websites and applications for accessibility compliance and provide detailed reports.",
    suitableFor: ["Visual Impairment", "Mobility Disability"],
    postedDate: "2024-03-15",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    title: "Customer Support Specialist",
    company: "Inclusive Services Inc.",
    location: "Delhi",
    type: "Full-time",
    description: "Provide customer support via phone and email. Training provided.",
    suitableFor: ["Hearing Impairment", "Physical Disability"],
    postedDate: "2024-03-20",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    title: "Data Entry Operator",
    company: "DataFirst Solutions",
    location: "Mumbai",
    type: "Part-time",
    description: "Input and process information into company databases with high accuracy.",
    suitableFor: ["Physical Disability", "Hearing Impairment"],
    postedDate: "2024-03-25",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    title: "Content Writer",
    company: "Creative Minds Publishing",
    location: "Remote",
    type: "Contract",
    description: "Create engaging content for websites, blogs, and social media platforms.",
    suitableFor: ["Visual Impairment", "Physical Disability"],
    postedDate: "2024-03-18",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    title: "Accounting Assistant",
    company: "Financial Partners Ltd.",
    location: "Bangalore",
    type: "Full-time",
    description: "Assist with bookkeeping, financial records, and basic accounting tasks.",
    suitableFor: ["Mobility Disability", "Hearing Impairment"],
    postedDate: "2024-03-22",
    logo: "/placeholder.svg?height=40&width=40",
  },
]

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [jobTypeFilter, setJobTypeFilter] = useState("all")

  // Filter jobs based on search query and job type
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = searchQuery === "" || 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesType = jobTypeFilter === "all" || 
        job.type.toLowerCase() === jobTypeFilter.toLowerCase() ||
        (jobTypeFilter === "remote" && job.location.toLowerCase() === "remote")

      return matchesSearch && matchesType
    })
  }, [searchQuery, jobTypeFilter])

  return (
    <>
      <Head>
        <title>Job Opportunities | Inclusive Jobs Portal</title>
        <meta name="description" content="Find employment opportunities suited to your abilities" />
      </Head>
      <main className="min-h-screen py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Job Opportunities</h1>
              <p className="text-muted-foreground">Find employment opportunities suited to your abilities</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search jobs..." 
                  className="pl-10" 
                  aria-label="Search for jobs"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
                <SelectTrigger className="w-full sm:w-40" aria-label="Filter by job type">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <SelectValue placeholder="Job Type" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results counter */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {filteredJobs.length} of {jobs.length} jobs
              {searchQuery && ` for "${searchQuery}"`}
              {jobTypeFilter !== "all" && ` in ${jobTypeFilter} category`}
            </p>
          </div>

          {/* No results message */}
          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <Briefcase className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No jobs found</h3>
                <p>Try adjusting your search criteria or filters</p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("")
                  setJobTypeFilter("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}

          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="border-2 hover:border-purple-300 transition-all">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-md bg-purple-100 flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        <Badge variant="outline" className="w-fit">
                          {job.type}
                        </Badge>
                      </div>
                      <CardDescription className="mt-1">
                        <span className="font-medium">{job.company}</span>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{job.description}</p>

                  <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Posted on {job.postedDate}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Suitable for:</p>
                    <div className="flex flex-wrap gap-2">
                      {job.suitableFor.map((disability, index) => (
                        <Badge key={index} variant="secondary">
                          {disability}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/apply/${job.id}`} className="w-full">
                    <Button className="w-full">Apply Now</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}