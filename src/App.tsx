import { useState, useEffect } from 'react'
import './index.css'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import TrainersSection from './components/TrainersSection'
import TransformationsSection from './components/TransformationsSection'
import PricingSection from './components/PricingSection'
import Footer from './components/Footer'

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const checkScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = document.documentElement.clientHeight
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      
      // Show when user is close to the bottom (within 120px of total scrollable height)
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 120
      setShowScrollTop(isAtBottom)
    }

    window.addEventListener('scroll', checkScroll, { passive: true })
    checkScroll()
    return () => window.removeEventListener('scroll', checkScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <div className="min-h-screen bg-ceiling-white relative">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <TrainersSection />
        <TransformationsSection />
        <PricingSection />
      </main>
      <Footer />

      {/* Floating Scroll to Top Arrow Button */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top of page"
        className={`
          fixed bottom-20 right-6 lg:bottom-24 lg:right-8 z-50
          w-11 h-11 rounded-full cursor-pointer group
          transition-all duration-300 ease-out active:scale-95
          ${showScrollTop 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-90 translate-y-4 pointer-events-none'}
        `}
      >
        {/* Outer glow ring */}
        <span className="absolute inset-0 rounded-full bg-pear/20 animate-ping" />
        {/* Inner button */}
        <span className="relative flex items-center justify-center w-full h-full rounded-full bg-pear shadow-[0_0_18px_rgba(188,255,0,0.45)] group-hover:shadow-[0_0_28px_rgba(188,255,0,0.7)] transition-shadow duration-300">
          <svg 
            className="w-4 h-4 stroke-rich-black transform group-hover:-translate-y-0.5 transition-transform duration-300" 
            fill="none" 
            strokeWidth="3" 
            viewBox="0 0 24 24"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </span>
      </button>
    </div>
  )
}

export default App
