import { Announcement } from '../components/Announcement'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { Values } from '../components/Values'
import { Story } from '../components/Story'
import { Notes } from '../components/Notes'
import { Collection } from '../components/Collection'
import { Gifting } from '../components/Gifting'
import { Testimonials } from '../components/Testimonials'
import { Newsletter } from '../components/Newsletter'
import { Footer } from '../components/Footer'

export default function Home() {
  return (
    <>
      <Announcement />
      <Header />
      <main id="top">
        <Hero />
        <Values />
        <Story />
        <Notes />
        <Collection />
        <Gifting />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}
