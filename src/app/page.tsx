import { Hero } from '@/components/home/Hero'
import { About } from '@/components/home/About'
import { Disciplines } from '@/components/home/Disciplines'
import { Pricing } from '@/components/home/Pricing'
import { Instructors } from '@/components/home/Instructors'
import { Location } from '@/components/home/Location'
import { CTA } from '@/components/home/CTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Disciplines />
      <Pricing />
      <Instructors />
      <Location />
      <CTA />
    </>
  )
}
