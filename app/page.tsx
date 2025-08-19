import EnhancedHero from '@/components/EnhancedHero'
import TargetAudienceCards from '@/components/TargetAudienceCards'
import Stats from '@/components/Stats'
import Features from '@/components/Features'
import JobsPreview from '@/components/JobsPreview'
import CTA from '@/components/CTA'

export default function Home() {
  return (
    <>
      <EnhancedHero />
      <TargetAudienceCards />
      <Stats />
      <Features />
      <JobsPreview />
      <CTA />
    </>
  )
}