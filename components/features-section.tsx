import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accessibility, Building2, FileSearch, Headphones, Globe } from "lucide-react"

export default function FeaturesSection() {
  const features = [
    {
      icon: <FileSearch className="h-10 w-10 text-purple-600" />,
      title: "Scheme Discovery",
      description: "Find government schemes tailored to your specific needs and eligibility criteria.",
    },
    {
      icon: <Building2 className="h-10 w-10 text-purple-600" />,
      title: "Job Opportunities",
      description: "Connect with inclusive employers offering positions suited to your abilities.",
    },
    {
      icon: <Accessibility className="h-10 w-10 text-purple-600" />,
      title: "Accessibility First",
      description: "Designed with accessibility as the priority, ensuring everyone can use the platform.",
    },
   
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <Card key={index} className="border-2 hover:border-purple-300 transition-all">
          <CardHeader>
            <div className="mb-2">{feature.icon}</div>
            <CardTitle>{feature.title}</CardTitle>
            <CardDescription>{feature.description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}
