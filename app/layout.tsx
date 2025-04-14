import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import AccessibilityToolbar from "@/components/accessibility-toolbar"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AccessArc - Government Schemes for Persons with Disabilities",
  description: "Access government schemes and employment opportunities for persons with disabilities",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="pt-16 flex-grow">{children}</div>
            <Footer />
          </div>
          <AccessibilityToolbar />
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'