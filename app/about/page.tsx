import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accessibility, Building, FileText, Globe, HeartHandshake, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">About AccessArc</h1>

          <div className="prose prose-purple dark:prose-invert max-w-none mb-12">
            <p className="text-xl mb-6">
              AccessArc is a dedicated platform connecting persons with disabilities to government schemes and
              employment opportunities, with accessibility at its core.
            </p>

            <p className="mb-6">
              Our mission is to bridge the gap between government initiatives, employers, and individuals with
              disabilities by creating an inclusive digital environment where everyone can access the resources they
              need to thrive.
            </p>

            <p className="mb-6">
              Founded in 2023, AccessArc works closely with government departments, NGOs, and private companies to
              ensure that persons with disabilities have equal access to opportunities and support systems.
            </p>
          </div>

          <h2 className="text-2xl font-bold mb-6">Our Core Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Accessibility className="h-5 w-5 text-purple-600" />
                  Accessibility First
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  We design with accessibility as our primary consideration, ensuring our platform is usable by everyone
                  regardless of their abilities.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <HeartHandshake className="h-5 w-5 text-purple-600" />
                  Inclusive Opportunity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  We believe that everyone deserves equal access to employment and government support, regardless of
                  disability.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-purple-600" />
                  Universal Design
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Our platform is built using universal design principles, making it intuitive and easy to use for all
                  users.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  Empowerment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  We empower persons with disabilities by providing them with the tools and resources they need to live
                  independently.
                </p>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-bold mb-6">What We Offer</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-purple-600" />
                  Government Schemes
                </CardTitle>
                <CardDescription>Access to government support programs</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  We provide a comprehensive database of government schemes and programs specifically designed for
                  persons with disabilities.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-purple-600" />
                  Job Opportunities
                </CardTitle>
                <CardDescription>Employment matching for all abilities</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Our platform connects job seekers with disabilities to employers who value diversity and inclusion in
                  their workforce.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Accessibility className="h-5 w-5 text-purple-600" />
                  Accessibility Tools
                </CardTitle>
                <CardDescription>Features that make navigation easier</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  We offer voice navigation, language translation, and customizable interface options to ensure everyone
                  can use our platform effectively.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-purple-50 dark:bg-purple-950/30 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Our Impact</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-4xl font-bold text-purple-600 dark:text-purple-400">5,000+</p>
                <p className="text-sm text-muted-foreground">Persons with disabilities supported</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-purple-600 dark:text-purple-400">200+</p>
                <p className="text-sm text-muted-foreground">Partner companies</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-purple-600 dark:text-purple-400">150+</p>
                <p className="text-sm text-muted-foreground">Government schemes indexed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
