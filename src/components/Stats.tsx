export default function Stats() {
  const stats = [
    { value: '10,000+', label: 'Cleared Professionals' },
    { value: '500+', label: 'Verified Employers' },
    { value: '2,500+', label: 'Active Jobs' },
    { value: '95%', label: 'Match Success Rate' },
  ]

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}