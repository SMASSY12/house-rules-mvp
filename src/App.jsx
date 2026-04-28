import Nav from './components/Nav'
import Hero from './components/Hero'
import ReviewsSection from './components/ReviewsSection'
import HowItWorks from './components/HowItWorks'
import CTASection from './components/CTASection'
import WriteReview from './components/WriteReview'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <ReviewsSection />
        <CTASection />
        <WriteReview />
      </main>
      <Footer />
    </>
  )
}
