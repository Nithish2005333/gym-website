import { useState, useEffect, useRef } from 'react'

const navLinks = [
  { label: 'Home',            href: '#home' },
  { label: 'About',           href: '#about' },
  { label: 'Trainers',        href: '#trainers' },
  { label: 'Transformations', href: '#transformations' },
  { label: 'Pricing',         href: '#pricing' },
]

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)
  const [activeLink, setActiveLink] = useState('#home')

  const containerRef = useRef<HTMLDivElement>(null)
  const [activeRect, setActiveRect] = useState<{ left: number; width: number } | null>(null)

  useEffect(() => {
    const updateRect = () => {
      if (!containerRef.current) return
      const activeEl = containerRef.current.querySelector(`a[href="${activeLink}"]`) as HTMLElement
      if (activeEl) {
        setActiveRect({
          left: activeEl.offsetLeft,
          width: activeEl.clientWidth,
        })
      }
    }
    updateRect()
    const t = setTimeout(updateRect, 50)
    window.addEventListener('resize', updateRect)
    return () => {
      window.removeEventListener('resize', updateRect)
      clearTimeout(t)
    }
  }, [activeLink])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)

      // Calculate scroll position trigger point (e.g., 33% down the viewport)
      const scrollPosition = window.scrollY + window.innerHeight / 3

      // Fallback for reaching the absolute bottom of the page
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100
      if (isAtBottom) {
        setActiveLink('#pricing')
        return
      }

      for (const link of navLinks) {
        const el = document.querySelector(link.href) as HTMLElement
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveLink(link.href)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // Initial run to set active link
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = (href: string) => {
    setActiveLink(href)
    setMenuOpen(false)
  }

  return (
    <>
      <header
        id="navbar"
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
          ${scrolled
            ? 'shadow-[0_2px_20px_rgba(6,20,20,0.06)] border-b border-celeste bg-ceiling-white/95 backdrop-blur-md'
            : 'bg-ceiling-white/80 backdrop-blur-sm'}
        `}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-[75px]">

          {/* Logo */}
          <a
            href="#home"
            onClick={() => handleNavClick('#home')}
            className="flex items-center gap-2 group shrink-0"
            aria-label="IronCore Fitness Home"
          >
            <img
              src="/ironcore-logo.png"
              alt="IronCore Logo"
              className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              style={{ filter: 'invert(1) hue-rotate(180deg)' }}
            />
          </a>

          {/* Desktop nav links */}
          <nav 
            ref={containerRef}
            className="hidden lg:flex items-center gap-1.5 font-body font-bold relative bg-rich-black/[0.04] p-1 rounded-full border border-celeste/20" 
            aria-label="Primary navigation"
          >
            {/* Sliding background pill */}
            {activeRect && (
              <div
                className="absolute top-1 bottom-1 bg-rich-black rounded-full transition-all duration-300 ease-out z-0"
                style={{
                  left: activeRect.left,
                  width: activeRect.width,
                }}
              />
            )}

            {navLinks.map(({ label, href }) => {
              const isActive = activeLink === href
              return (
                <a
                  key={href}
                  href={href}
                  onClick={() => handleNavClick(href)}
                  className={`
                    relative z-10 flex items-center
                    py-2 px-[18px] text-[0.8rem] font-bold font-body tracking-wider uppercase
                    cursor-pointer transition-all duration-300 active:scale-[0.96] hover:-translate-y-[0.5px] active:translate-y-0
                    rounded-full
                    ${isActive
                      ? 'text-white'
                      : 'text-laurel hover:text-rich-black'}
                  `}
                >
                  {label}
                </a>
              )
            })}
          </nav>

          {/* CTA — Uiverse.io Animated Join Now Button */}
          <a
            href="#pricing"
            onClick={() => handleNavClick('#pricing')}
            className="hidden lg:flex cursor-pointer relative bg-pear py-1.5 rounded-full min-w-[7.5rem] min-h-[2.5rem] group max-w-full items-center justify-start hover:bg-rich-black transition-all duration-[0.8s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)] shadow-[inset_1px_2px_4px_rgba(0,0,0,0.12)] shrink-0"
          >
            <div className="absolute flex px-0.5 py-0.5 justify-start items-center inset-0">
              <div className="w-[0%] group-hover:w-full transition-all duration-[1s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)]"></div>
              <div className="rounded-full shrink-0 flex justify-center items-center shadow-[inset_1px_-1px_3px_0_rgba(0,0,0,0.3)] h-full aspect-square bg-rich-black transition-all duration-[1s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)] group-hover:bg-pear">
                <div className="w-[0.7rem] h-[0.7rem] text-white group-hover:text-rich-black group-hover:-rotate-45 transition-all duration-[1s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" height="100%" width="100%">
                    <path d="M12.175 9H0V7H12.175L6.575 1.4L8 0L16 8L8 16L6.575 14.6L12.175 9Z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="pl-[3rem] pr-[0.9rem] group-hover:pl-[0.9rem] group-hover:pr-[3rem] transition-all duration-[1s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)] group-hover:text-white text-rich-black font-bold font-body text-[0.775rem] tracking-wider uppercase">
              Join Now
            </div>
          </a>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-btn"
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(v => !v)}
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
          >
            <span className={`block w-5 h-[2px] bg-rich-black rounded-full origin-center transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-5 h-[2px] bg-rich-black rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-5 h-[2px] bg-rich-black rounded-full origin-center transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        aria-hidden={!menuOpen}
        onClick={() => setMenuOpen(false)}
        className={`
          fixed inset-0 z-40 bg-black/20 backdrop-blur-sm
          transition-opacity duration-300
          ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      />

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        className={`
          fixed top-0 right-0 z-50 h-full w-[min(300px,85vw)]
          border-l border-celeste
          flex flex-col pt-[70px] pb-10 px-8
          transition-transform duration-300 ease-in-out
          ${menuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        style={{ backgroundColor: '#E9EBE6' }}
      >
        <div className="absolute top-0 left-0 w-full h-[3px] bg-pear" />

        <nav className="flex flex-col gap-0 mt-6" aria-label="Mobile navigation">
          {navLinks.map(({ label, href }, i) => (
            <a
              key={href}
              href={href}
              onClick={() => handleNavClick(href)}
              style={{ transitionDelay: menuOpen ? `${i * 40}ms` : '0ms' }}
              className={`
                group flex items-center gap-2.5
                py-3 px-1 text-base font-medium font-body
                border-b border-celeste
                transition-all duration-300
                ${menuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
                ${activeLink === href ? 'text-pear font-bold' : 'text-rich-black/70 hover:text-rich-black'}
              `}
            >
              <span
                className={`w-4 h-4 transition-colors duration-200 shrink-0 ${
                  activeLink === href ? 'bg-pear' : 'bg-rich-black/40 group-hover:bg-rich-black'
                }`}
                style={{
                  maskImage: 'url(/trainer.svg)',
                  WebkitMaskImage: 'url(/trainer.svg)',
                  maskSize: 'contain',
                  WebkitMaskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskPosition: 'center'
                }}
              />
              {label}
            </a>
          ))}
        </nav>

        <a
          href="#pricing"
          onClick={() => handleNavClick('#pricing')}
          className="
            mt-8 w-full text-center
            px-6 py-3 rounded-full
            bg-pear text-rich-black
            text-base font-semibold font-body
            transition-all duration-200 hover:brightness-110
          "
        >
          Join Now
        </a>
      </div>
    </>
  )
}
