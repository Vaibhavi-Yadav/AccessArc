import JobMatchingChatbot from "@/components/job-matching-chatbot"

export default function JobMatchingPage() {
  return (
    <main className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Job Matching Assistant</h1>
          <p className="text-muted-foreground mb-8">
            Our AI-powered assistant will help you find jobs that match your profile and accessibility needs.
          </p>

          <div className="bg-muted p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">How It Works</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Answer a few questions about your profile and needs</li>
              <li>The assistant will find jobs that match your requirements</li>
              <li>Click "Apply Now" on any job you're interested in</li>
            </ol>
          </div>

          <div className="bg-muted p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Accessibility Features</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Dark/light mode toggle for visual comfort</li>
              <li>Simple, clear interface with minimal distractions</li>
              <li>Keyboard-navigable chat interface</li>
              <li>Screen reader compatible with proper ARIA labels</li>
              <li>High contrast text for better readability</li>
            </ul>
          </div>

          {/* Directly embed the chatbot interface here */}
          <div className="mt-8 border-2 border-purple-300 rounded-lg p-6 bg-background" style={{ overflow: "hidden" }}>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="bg-purple-100 dark:bg-purple-900 p-1 rounded">💬</span>
              Job Matching Assistant
            </h2>
            <JobMatchingChatbot initiallyOpen={true} />
          </div>
        </div>
      </div>
    </main>
  )
}
