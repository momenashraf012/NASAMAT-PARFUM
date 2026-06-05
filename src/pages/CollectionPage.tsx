import { Announcement } from '../components/Announcement'
import { Header } from '../components/Header'
import { Collection } from '../components/Collection'
import { Footer } from '../components/Footer'

export function CollectionPage() {
  return (
    <>
      <Announcement />
      <Header />
      <main id="top">
        <Collection />
      </main>
      <Footer />
    </>
  )
}
