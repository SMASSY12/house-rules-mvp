import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}
import Nav from './components/Nav'
import Hero from './components/Hero'
import FeaturedVenues from './components/FeaturedVenues'
import HowItWorks from './components/HowItWorks'
import CTASection from './components/CTASection'
import WriteReview from './components/WriteReview'
import Footer from './components/Footer'
import VenueDetail from './components/VenueDetail'
import ReviewsPage from './components/ReviewsPage'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={
          <main>
            <Hero />
            <HowItWorks />
            <FeaturedVenues />
            <CTASection />
          </main>
        } />
        <Route path="/venue/:id" element={<VenueDetail />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/write" element={<WriteReview />} />
      </Routes>
      <Footer />
    </>
  )
}
