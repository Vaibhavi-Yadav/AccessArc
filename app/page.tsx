import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { ArrowRight, BookOpen, Building, Users } from "lucide-react"
import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import VoiceNavigation from "@/components/voice-navigation"
import FeedbackForm from "@/components/feedback-form"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* <VoiceNavigation /> */}
      <HeroSection />

      <div className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">How AccessArc Works</h2>
        <FeaturesSection />

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Get Started</h2>
          <Tabs defaultValue="individuals" className="max-w-3xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="individuals">Individuals</TabsTrigger>
              <TabsTrigger value="companies">Companies</TabsTrigger>
              <TabsTrigger value="authorities">Authorities</TabsTrigger>
            </TabsList>

            <TabsContent value="individuals" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    For Individuals with Disabilities
                  </CardTitle>
                  <CardDescription>
                    Access government schemes and find employment opportunities tailored to your abilities.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Discover government schemes you're eligible for</li>
                    <li>Apply for jobs that match your skills</li>
                    <li>Connect with supportive employers</li>
                    <li>Access resources to enhance your skills</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/register?type=individual" className="w-full">
                    <Button className="w-full">
                      Register as an Individual
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="companies" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    For Companies
                  </CardTitle>
                  <CardDescription>
                    Post job opportunities and connect with qualified candidates with disabilities.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Post job openings specifically for persons with disabilities</li>
                    <li>Access a diverse talent pool</li>
                    <li>Fulfill corporate social responsibility goals</li>
                    <li>Get accessibility testing for your products</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/register?type=company" className="w-full">
                    <Button className="w-full">
                      Register as a Company
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="authorities" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    For Government Authorities
                  </CardTitle>
                  <CardDescription>Publish and manage schemes for persons with disabilities.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Publish new schemes and initiatives</li>
                    <li>Track applications and beneficiaries</li>
                    <li>Generate reports on scheme utilization</li>
                    <li>Communicate directly with beneficiaries</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/register?type=authority" className="w-full">
                    <Button className="w-full">
                      Register as an Authority
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Your Feedback Matters</h2>
          <FeedbackForm />
        </div>
      </div>
    </main>
  )
}
