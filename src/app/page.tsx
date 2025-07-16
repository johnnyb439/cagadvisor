import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Stats from '@/components/Stats'
import JobsPreview from '@/components/JobsPreview'
import CTA from '@/components/CTA'

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <JobsPreview />
      <CTA />
    </>
  )
}