import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, BookOpen, Video, Download, LinkIcon } from "lucide-react"
import Link from "next/link"

export default function ResourcesPage() {
  return (
    <main className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Resources</h1>
          <p className="text-muted-foreground mb-8">
            Helpful resources for persons with disabilities, employers, and government authorities
          </p>

          <Tabs defaultValue="guides" className="mb-12">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="guides">Guides & Documents</TabsTrigger>
              <TabsTrigger value="videos">Video Resources</TabsTrigger>
              <TabsTrigger value="tools">Accessibility Tools</TabsTrigger>
              <TabsTrigger value="laws">Laws & Regulations</TabsTrigger>
            </TabsList>

            <TabsContent value="guides" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResourceCard
                  icon={<FileText className="h-8 w-8 text-purple-600" />}
                  title="Disability Rights Guide"
                  description="A comprehensive guide to understanding your rights as a person with disability"
                  link="#"
                />
                <ResourceCard
                  icon={<FileText className="h-8 w-8 text-purple-600" />}
                  title="Employer's Handbook"
                  description="Best practices for hiring and supporting employees with disabilities"
                  link="#"
                />
                <ResourceCard
                  icon={<FileText className="h-8 w-8 text-purple-600" />}
                  title="Accessibility Checklist"
                  description="Ensure your workplace or service is accessible to all"
                  link="#"
                />
                <ResourceCard
                  icon={<FileText className="h-8 w-8 text-purple-600" />}
                  title="Government Schemes Overview"
                  description="Summary of all available government schemes for persons with disabilities"
                  link="#"
                />
              </div>
            </TabsContent>

            <TabsContent value="videos" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResourceCard
                  icon={<Video className="h-8 w-8 text-purple-600" />}
                  title="Sign Language Basics"
                  description="Learn the fundamentals of sign language communication"
                  link="#"
                />
                <ResourceCard
                  icon={<Video className="h-8 w-8 text-purple-600" />}
                  title="Workplace Accommodations"
                  description="Video series on implementing effective workplace accommodations"
                  link="#"
                />
                <ResourceCard
                  icon={<Video className="h-8 w-8 text-purple-600" />}
                  title="Assistive Technology Tutorials"
                  description="How to use various assistive technologies effectively"
                  link="#"
                />
                <ResourceCard
                  icon={<Video className="h-8 w-8 text-purple-600" />}
                  title="Success Stories"
                  description="Inspiring stories of persons with disabilities in the workplace"
                  link="#"
                />
              </div>
            </TabsContent>

            <TabsContent value="tools" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResourceCard
                  icon={<Download className="h-8 w-8 text-purple-600" />}
                  title="Screen Reader Compatibility Guide"
                  description="Make your digital content accessible to screen readers"
                  link="#"
                />
                <ResourceCard
                  icon={<Download className="h-8 w-8 text-purple-600" />}
                  title="Accessible Forms Template"
                  description="Templates for creating accessible forms for your organization"
                  link="#"
                />
                <ResourceCard
                  icon={<LinkIcon className="h-8 w-8 text-purple-600" />}
                  title="Color Contrast Analyzer"
                  description="Tool to check if your website colors meet accessibility standards"
                  link="#"
                />
                <ResourceCard
                  icon={<LinkIcon className="h-8 w-8 text-purple-600" />}
                  title="Text-to-Speech Tools"
                  description="Collection of free and premium text-to-speech solutions"
                  link="#"
                />
              </div>
            </TabsContent>

            <TabsContent value="laws" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResourceCard
                  icon={<BookOpen className="h-8 w-8 text-purple-600" />}
                  title="Rights of Persons with Disabilities Act, 2016"
                  description="Complete text and explanation of the RPwD Act"
                  link="#"
                />
                <ResourceCard
                  icon={<BookOpen className="h-8 w-8 text-purple-600" />}
                  title="Accessible India Campaign Guidelines"
                  description="Official guidelines for the Accessible India Campaign"
                  link="#"
                />
                <ResourceCard
                  icon={<BookOpen className="h-8 w-8 text-purple-600" />}
                  title="Employment Quota Regulations"
                  description="Information about employment quotas for persons with disabilities"
                  link="#"
                />
                <ResourceCard
                  icon={<BookOpen className="h-8 w-8 text-purple-600" />}
                  title="International Disability Rights"
                  description="Overview of international conventions and treaties on disability rights"
                  link="#"
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="bg-purple-50 dark:bg-purple-950/30 p-6 rounded-lg mb-12">
            <h2 className="text-xl font-bold mb-4">Need Personalized Assistance?</h2>
            <p className="mb-4">
              Our team is available to help you navigate resources, understand your rights, or find the right government
              schemes for your specific situation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
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
                  className="text-purple-600"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>Helpline: 1800-XXX-XXXX</span>
              </div>
              <div className="flex items-center gap-2">
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
                  className="text-purple-600"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span>Email: support@accessarc.org</span>
              </div>
            </div>
          </div>

          <div className="bg-muted p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Community Resources</h2>
            <p className="mb-4">
              Connect with local disability support groups and communities in your area for peer support and shared
              experiences.
            </p>
            <Link
              href="/community"
              className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium"
            >
              Find local support groups →
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

function ResourceCard({
  icon,
  title,
  description,
  link,
}: {
  icon: React.ReactNode
  title: string
  description: string
  link: string
}) {
  return (
    <Card className="border-2 hover:border-purple-300 transition-all">
      <CardHeader className="pb-2">
        <div className="flex items-start gap-3">
          {icon}
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Link
          href={link}
          className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium text-sm flex items-center gap-1"
        >
          Access Resource
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
          </svg>
        </Link>
      </CardContent>
    </Card>
  )
}
