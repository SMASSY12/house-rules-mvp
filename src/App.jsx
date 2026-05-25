import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Hero from './components/Hero'
import ReviewsSection from './components/ReviewsSection'
import HowItWorks from './components/HowItWorks'
import CTASection from './components/CTASection'
import WriteReview from './components/WriteReview'
import Footer from './components/Footer'
import VenueDetail from './components/VenueDetail'
import ReviewsPage from './components/ReviewsPage'

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={
          <main>
            <Hero />
            <HowItWorks />
            <ReviewsSection />
            <CTASection />
            <WriteReview />
          </main>
        } />
        <Route path="/venue/:id" element={<VenueDetail />} />
        <Route path="/reviews" element={<ReviewsPage />} />
      </Routes>
      <Footer />
    </>
  )
}
