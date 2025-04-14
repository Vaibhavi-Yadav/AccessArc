import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, BookOpen } from "lucide-react"
import Link from "next/link"

// Mock data for government schemes
const schemes = [
  {
    id: 1,
    title: "Assistance to Disabled Persons for Purchase/Fitting of Aids and Appliances (ADIP)",
    description: "Financial assistance for purchasing assistive devices for persons with disabilities.",
    eligibility: "Persons with 40% disability and below poverty line",
    category: "assistive-devices",
    authority: "Ministry of Social Justice and Empowerment",
    lastUpdated: "2023-12-15",
  },
  {
    id: 2,
    title: "Deendayal Disabled Rehabilitation Scheme (DDRS)",
    description:
      "Financial assistance to NGOs for providing education, vocational training and rehabilitation of persons with disabilities.",
    eligibility: "NGOs working with persons with disabilities",
    category: "rehabilitation",
    authority: "Ministry of Social Justice and Empowerment",
    lastUpdated: "2023-11-20",
  },
  {
    id: 3,
    title: "Scholarship for Students with Disabilities",
    description: "Financial assistance for students with disabilities to pursue higher education.",
    eligibility: "Students with disabilities pursuing higher education",
    category: "education",
    authority: "Ministry of Education",
    lastUpdated: "2024-01-10",
  },
  {
    id: 4,
    title: "Accessible India Campaign (Sugamya Bharat Abhiyan)",
    description:
      "Creating universal accessibility for persons with disabilities in built environment, transportation and information & communication technology ecosystem.",
    eligibility: "All persons with disabilities",
    category: "accessibility",
    authority: "Department of Empowerment of Persons with Disabilities",
    lastUpdated: "2023-09-05",
  },
  {
    id: 5,
    title: "Unique Disability ID (UDID) Project",
    description:
      "Creating a national database for PwDs, and to issue a Unique Disability Identity Card to each person with disabilities.",
    eligibility: "All persons with disabilities",
    category: "identification",
    authority: "Department of Empowerment of Persons with Disabilities",
    lastUpdated: "2024-02-28",
  },
]

export default function SchemesPage() {
  return (
    <main className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Government Schemes</h1>
            <p className="text-muted-foreground">
              Discover government schemes and programs for persons with disabilities
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search schemes..." className="pl-10" aria-label="Search for schemes" />
            </div>

            <Select>
              <SelectTrigger className="w-full sm:w-40" aria-label="Filter by category">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Category" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="employment">Employment</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="assistive-devices">Assistive Devices</SelectItem>
                <SelectItem value="accessibility">Accessibility</SelectItem>
                <SelectItem value="rehabilitation">Rehabilitation</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes.map((scheme) => (
            <Card key={scheme.id} className="flex flex-col h-full border-2 hover:border-purple-300 transition-all">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{scheme.title}</CardTitle>
                  <Badge variant="outline" className="ml-2 shrink-0">
                    {scheme.category.replace("-", " ")}
                  </Badge>
                </div>
                <CardDescription>{scheme.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium">Eligibility:</p>
                    <p className="text-sm text-muted-foreground">{scheme.eligibility}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Authority:</p>
                    <p className="text-sm text-muted-foreground">{scheme.authority}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Last Updated:</p>
                    <p className="text-sm text-muted-foreground">{scheme.lastUpdated}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/schemes/${scheme.id}`} className="w-full">
                  <Button variant="outline" className="w-full flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
