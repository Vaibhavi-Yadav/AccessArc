import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="text-purple-700 dark:text-purple-400">Access</span>Arc
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl">
          Connecting persons with disabilities to government schemes and employment opportunities
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/schemes">
            <Button size="lg" className="text-lg px-8">
              Explore Schemes
            </Button>
          </Link>
          <Link href="/jobs">
            <Button size="lg" variant="outline" className="text-lg px-8">
              Find Jobs
            </Button>
          </Link>
        </div>

        
      </div>
    </div>
  )
}
