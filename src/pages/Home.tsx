import { Announcement } from '../components/Announcement'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { TrustStrip } from '../components/TrustStrip'
import { Values } from '../components/Values'
import { Story } from '../components/Story'
import { FragranceJourney } from '../components/FragranceJourney'
import { Notes } from '../components/Notes'
import { FragranceQuiz } from '../components/FragranceQuiz'
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
        <section className="section pt-0">
          <div className="wrap">
            <TrustStrip />
          </div>
        </section>
        <Values />
        <Story />
        <FragranceJourney />
        <Notes />
        <FragranceQuiz />
        <Collection />
        <Gifting />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}
