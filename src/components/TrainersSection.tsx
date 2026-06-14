import { useState, useRef, useEffect } from 'react'
import { Mail } from 'lucide-react'

function InstagramIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  )
}

function WhatsappIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
      <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
    </svg>
  )
}

interface Trainer {
  id: number
  name: string
  tagline: string
  image: string
  instagram: string
  mail: string
  whatsapp: string
}

const trainers: Trainer[] = [
  {
    id: 1,
    name: "Ronnie Coleman",
    tagline: "Strength & Conditioning",
    image: "/trainer-1.png",
    instagram: "https://instagram.com",
    mail: "mailto:ronnie@ironcore.com",
    whatsapp: "https://wa.me/1234567890"
  },
  {
    id: 2,
    name: "Arnold Schwarzenegger",
    tagline: "Golden Era Hypertrophy",
    image: "/trainer-2.png",
    instagram: "https://instagram.com",
    mail: "mailto:arnold@ironcore.com",
    whatsapp: "https://wa.me/1234567890"
  },
  {
    id: 3,
    name: "Jay Cutler",
    tagline: "Mass Building & Power",
    image: "/trainer-3.png",
    instagram: "https://instagram.com",
    mail: "mailto:jay@ironcore.com",
    whatsapp: "https://wa.me/1234567890"
  },
  {
    id: 4,
    name: "Andrea Shaw",
    tagline: "Ms. Olympia Strength Coach",
    image: "/trainer-4.png",
    instagram: "https://instagram.com",
    mail: "mailto:andrea@ironcore.com",
    whatsapp: "https://wa.me/1234567890"
  },
  {
    id: 5,
    name: "Phil Heath",
    tagline: "Muscle Density & Prep",
    image: "/trainer-5.png",
    instagram: "https://instagram.com",
    mail: "mailto:phil@ironcore.com",
    whatsapp: "https://wa.me/1234567890"
  },
  {
    id: 6,
    name: "Cory Everson",
    tagline: "HIIT & Athletic Conditioning",
    image: "/trainer-6.png",
    instagram: "https://instagram.com",
    mail: "mailto:cory@ironcore.com",
    whatsapp: "https://wa.me/1234567890"
  },
  {
    id: 7,
    name: "Chris Bumstead",
    tagline: "Classic Physique & Aesthetics",
    image: "/trainer-7.png",
    instagram: "https://instagram.com",
    mail: "mailto:cbum@ironcore.com",
    whatsapp: "https://wa.me/1234567890"
  }
]

export default function TrainersSection() {
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeftStart, setScrollLeftStart] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollPosRef = useRef(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    scrollPosRef.current = container.scrollLeft

    let animationFrameId: number
    let lastTime = performance.now()

    const scroll = (time: number) => {
      if (isHovered || isDragging) {
        lastTime = time
        if (container) {
          scrollPosRef.current = container.scrollLeft
        }
        animationFrameId = requestAnimationFrame(scroll)
        return
      }

      const elapsed = time - lastTime
      lastTime = time

      const speed = 0.05
      scrollPosRef.current += speed * elapsed

      const halfWidth = container.scrollWidth / 2
      if (scrollPosRef.current >= halfWidth) {
        scrollPosRef.current -= halfWidth
      }

      container.scrollLeft = scrollPosRef.current
      animationFrameId = requestAnimationFrame(scroll)
    }

    animationFrameId = requestAnimationFrame(scroll)
    return () => cancelAnimationFrame(animationFrameId)
  }, [isHovered, isDragging])

  const handleMouseDown = (e: React.MouseEvent) => {
    const container = containerRef.current
    if (!container) return

    setIsDragging(true)
    setStartX(e.pageX - container.offsetLeft)
    setScrollLeftStart(container.scrollLeft)
    scrollPosRef.current = container.scrollLeft
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
    setIsHovered(false)
    if (containerRef.current) {
      scrollPosRef.current = containerRef.current.scrollLeft
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    if (containerRef.current) {
      scrollPosRef.current = containerRef.current.scrollLeft
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()

    const container = containerRef.current
    if (!container) return

    const x = e.pageX - container.offsetLeft
    const walk = (x - startX) * 1.5
    container.scrollLeft = scrollLeftStart - walk
    scrollPosRef.current = container.scrollLeft
  }

  const trainerCard = (trainer: Trainer, keyPrefix: string) => (
    <div
      key={`${keyPrefix}-${trainer.id}`}
      className="relative w-[240px] sm:w-[280px] aspect-[3/4] rounded-2xl overflow-hidden group border border-white/10 hover:border-pear bg-rich-black shadow-lg cursor-pointer transition-all duration-300 hover:shadow-[0_0_20px_rgba(188,255,0,0.15)] shrink-0"
    >
      <img
        src={trainer.image}
        alt={trainer.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 select-none pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-rich-black via-rich-black/85 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end pb-8 pt-24 px-6 text-center items-center">
        <h3
          className="text-[1.3rem] sm:text-[1.4rem] text-white uppercase tracking-wider mb-1.5 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out"
          style={{
            fontFamily: '"Titillium Web", sans-serif',
            fontWeight: 700,
            textShadow: '0 2px 6px rgba(0,0,0,0.9), -1px 0 0 rgba(0, 229, 255, 0.5), 1px 0 0 rgba(255, 0, 85, 0.5)'
          }}
        >
          {trainer.name}
        </h3>
        <p
          className="text-[0.82rem] text-pear font-semibold font-body tracking-wider uppercase mb-5 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out delay-75"
          style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
        >
          {trainer.tagline}
        </p>
        <div className="flex items-center gap-6 mt-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out delay-150">
          <a
            href={trainer.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-pear hover:scale-115 transform transition-all duration-300 flex items-center justify-center"
            aria-label={`${trainer.name} Instagram`}
          >
            <InstagramIcon className="w-7 h-7" />
          </a>
          <a
            href={trainer.mail}
            className="text-white/80 hover:text-pear hover:scale-115 transform transition-all duration-300 flex items-center justify-center"
            aria-label={`Email ${trainer.name}`}
          >
            <Mail className="w-7 h-7" />
          </a>
          <a
            href={trainer.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-pear hover:scale-115 transform transition-all duration-300 flex items-center justify-center"
            aria-label={`${trainer.name} WhatsApp`}
          >
            <WhatsappIcon className="w-8 h-8" />
          </a>
        </div>
      </div>
    </div>
  )

  return (
    <section
      id="trainers"
      className="bg-ceiling-white border-b border-celeste/20 lg:h-screen flex flex-col justify-center pt-16 pb-12 lg:pt-8 lg:pb-12 relative overflow-hidden"
      aria-label="Our Trainers"
    >
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-10 relative z-10">

        <div className="mb-5 text-center">
          <div className="flex items-center gap-2 mb-2.5 select-none justify-center">
            <span className="w-5 h-[2px] bg-rich-black rounded-full shrink-0" />
            <span className="font-titillum text-[0.75rem] tracking-[0.18em] uppercase text-rich-black" style={{ fontWeight: 600 }}>
              MEET THE TEAM
            </span>
          </div>

          <h2
            className="leading-[1.0] text-rich-black mb-4.5 uppercase tracking-[-0.01em]"
            style={{ fontFamily: '"Titillium Web", sans-serif', fontWeight: 900, fontSize: 'clamp(2.2rem,4vw,3.5rem)' }}
          >
            OUR EXPERT <span className="text-pear">COACHES</span>
          </h2>

          <div className="w-16 h-[4px] bg-pear rounded-full mx-auto" />
        </div>

        <div className="relative w-full mt-7 overflow-hidden">
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setIsHovered(true)}
            className="flex overflow-x-auto no-scrollbar py-4 select-none cursor-grab active:cursor-grabbing"
          >
            <div className="flex gap-6 shrink-0 pr-6">
              {trainers.map((trainer) => trainerCard(trainer, 'set1'))}
            </div>

            <div className="flex gap-6 shrink-0 pr-6" aria-hidden="true">
              {trainers.map((trainer) => trainerCard(trainer, 'set2'))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
