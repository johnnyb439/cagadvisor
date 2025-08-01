export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-ops-charcoal">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Test Page Working!</h1>
        <p className="text-xl mb-8">If you can see this, the deployment is working.</p>
        <div className="space-y-4">
          <a href="/" className="block text-blue-500 hover:underline">Go to Homepage</a>
          <a href="/login" className="block text-blue-500 hover:underline">Go to Login</a>
          <a href="/api/test-auth" className="block text-blue-500 hover:underline">Check API Status</a>
        </div>
      </div>
    </div>
  )
}