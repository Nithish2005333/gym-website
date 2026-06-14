import { useEffect, useRef, useState } from 'react'
import { Users, Dumbbell } from 'lucide-react'

function useCountUp(target: number, duration = 1800) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    if (!ref.current) return
    let startTime: number | null = null
    const step = (ts: number) => {
      if (!startTime) startTime = ts
      const p = Math.min((ts - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      if (ref.current) ref.current.textContent = Math.floor(eased * target).toString()
      if (p < 1) requestAnimationFrame(step)
    }
    const delay = setTimeout(() => requestAnimationFrame(step), 600)
    return () => clearTimeout(delay)
  }, [target, duration])
  return ref
}

function StatVal({ value }: { value: number }) {
  const ref = useCountUp(value)
  return <span ref={ref}>0</span>
}

const typingWords = ['YOU', 'ATHLETES', 'CHAMPIONS', 'WARRIORS', 'DREAMERS']

function TypingWord() {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [speed, setSpeed] = useState(150)

  useEffect(() => {
    let timer: number
    const currentWord = typingWords[wordIndex]

    const handle = () => {
      if (!isDeleting) {
        setText(currentWord.substring(0, text.length + 1))
        setSpeed(130)
        if (text === currentWord) {
          setSpeed(2200)
          setIsDeleting(true)
        }
      } else {
        setText(currentWord.substring(0, text.length - 1))
        setSpeed(65)
        if (text === '') {
          setIsDeleting(false)
          setWordIndex((prev) => (prev + 1) % typingWords.length)
          setSpeed(400)
        }
      }
    }

    timer = window.setTimeout(handle, speed)
    return () => clearTimeout(timer)
  }, [text, isDeleting, wordIndex, speed])

  return (
    <span
      className="text-pear bg-rich-black/60 border-r-[2px] border-pear animate-[blink-cursor_0.75s_step-end_infinite] rounded-sm px-1"
      style={{ display: 'inline-block', minWidth: '1ch', minHeight: '1em' }}
    >
      {text}
    </span>
  )
}

export default function HeroSection() {
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const els = [textRef.current, imageRef.current]
    els.forEach((el, i) => {
      if (!el) return
      el.style.opacity = '0'
      el.style.transform = i === 0 ? 'translateY(24px)' : 'translateX(24px)'
      setTimeout(() => {
        if (!el) return
        el.style.transition = 'opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1)'
        el.style.opacity = '1'
        el.style.transform = 'none'
      }, 80 + i * 150)
    })
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col lg:overflow-hidden bg-ceiling-white lg:bg-[url('/hero-bg.png')] bg-center bg-no-repeat lg:bg-[length:90%]"
      aria-label="Hero"
    >
      <div
        className="absolute right-[4%] top-[10%] w-[38vw] h-[38vw] rounded-full -z-10 overflow-hidden hidden lg:block"
        style={{
          background: 'radial-gradient(circle, rgba(188,255,0,0.22) 0%, rgba(188,255,0,0.04) 65%, transparent 100%)',
          border: '1px solid rgba(188,255,0,0.12)'
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(-45deg, #BCFF00, #BCFF00 10px, transparent 10px, transparent 20px)'
          }}
        />
      </div>

      <div
        className="absolute left-[3%] top-[18%] w-[400px] h-[400px] rounded-full -z-10 pointer-events-none opacity-60 filter blur-[90px]"
        style={{
          background: 'radial-gradient(circle, rgba(188,255,0,0.16) 0%, transparent 70%)'
        }}
      />

      <div className="relative z-10 flex-1 flex items-center max-w-7xl mx-auto w-full px-6 lg:px-10 pt-[70px]">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-0 w-full items-center min-h-[calc(100vh-70px)]">

          <div ref={textRef} className="flex flex-col justify-center pt-2 pb-16 lg:py-0 lg:pr-8 order-2 lg:order-1 relative">

            <div className="flex items-center gap-2 mb-5 mt-8 select-none">
              <span className="w-5 h-[2px] bg-rich-black rounded-full shrink-0" />
              <span className="font-titillum text-[0.75rem] tracking-[0.18em] uppercase text-rich-black" style={{ fontWeight: 600 }}>
                FOR A STRONGER, FITTER <TypingWord />
              </span>
            </div>

            <h1
              className="leading-[1.0] text-rich-black mb-5 tracking-[-0.01em] uppercase"
              style={{ fontFamily: '"Titillium Web", sans-serif', fontWeight: 900, fontSize: 'clamp(3rem,6vw,5.2rem)' }}
            >
              <span className="block">PUSH <span className="text-pear">YOURSELF</span></span>
              <span className="block">HARDER TO</span>
              <span className="block">BECOME BETTER</span>
            </h1>

            <div className="w-16 h-[4px] bg-pear rounded-full mb-6" />

            <p className="text-[0.92rem] text-rich-black/75 font-body leading-relaxed max-w-lg mb-6" style={{ fontWeight: 400 }}>
              Welcome to the place where health and fitness is a way of life!
              Improve your quality of life, get ready to change your life and step
              into the amazing world of fitness!
            </p>

            <div className="flex flex-wrap items-center gap-5 mb-8">
              <a
                id="hero-cta-primary"
                href="#pricing"
                className="cursor-pointer relative bg-pear py-2 rounded-2xl min-w-[11.5rem] min-h-[3rem] group max-w-full flex items-center justify-start hover:bg-rich-black transition-all duration-[0.8s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)] shadow-[inset_1px_2px_4px_rgba(0,0,0,0.12)]"
              >
                <div className="absolute flex px-1 py-0.5 justify-start items-center inset-0">
                  <div className="w-[0%] group-hover:w-full transition-all duration-[1s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)]"></div>
                  <div className="rounded-2xl shrink-0 flex justify-center items-center shadow-[inset_1px_-1px_3px_0_rgba(0,0,0,0.3)] h-full aspect-square bg-rich-black transition-all duration-[1s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)] group-hover:bg-pear">
                    <div className="w-[0.8rem] h-[0.8rem] text-white group-hover:text-rich-black group-hover:-rotate-45 transition-all duration-[1s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)]">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" height="100%" width="100%">
                        <path d="M12.175 9H0V7H12.175L6.575 1.4L8 0L16 8L8 16L6.575 14.6L12.175 9Z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="pl-[3.8rem] pr-[1.2rem] group-hover:pl-[1.2rem] group-hover:pr-[3.8rem] transition-all duration-[1s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)] group-hover:text-white text-rich-black font-body text-[0.825rem] tracking-[0.12em] uppercase" style={{ fontWeight: 500 }}>
                  Start now
                </div>
              </a>

              <a
                id="hero-cta-secondary"
                href="#about"
                className="
                  group inline-flex items-center justify-center gap-2.5
                  min-w-[11.5rem] min-h-[3rem] rounded-2xl
                  border-2 border-rich-black text-rich-black bg-transparent
                  text-[0.825rem] font-body tracking-[0.12em] uppercase
                  transition-all duration-300
                  hover:bg-rich-black hover:text-white
                  active:scale-[0.97]
                "
                style={{ fontWeight: 500 }}
              >
                Explore More
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>

            <div className="flex lg:hidden items-center justify-around w-full max-w-md mt-6 py-4 px-4 bg-white/45 backdrop-blur-md border border-white/25 rounded-2xl shadow-sm gap-2 select-none">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rich-black flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-pear" strokeWidth={2} />
                </div>
                <div>
                  <div className="flex items-baseline gap-0.5 leading-none">
                    <span className="font-titillum text-[1.25rem] text-rich-black" style={{ fontWeight: 900 }}><StatVal value={12} /></span>
                    <span className="font-titillum text-[0.85rem] text-pear" style={{ fontWeight: 900 }}>K+</span>
                  </div>
                  <p className="text-[0.6rem] font-bold text-laurel font-body uppercase tracking-wider mt-0.5">Members</p>
                </div>
              </div>

              <div className="w-px h-10 bg-rich-black/15" />

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rich-black flex items-center justify-center shrink-0">
                  <Dumbbell className="w-5 h-5 text-pear" strokeWidth={2} />
                </div>
                <div>
                  <div className="flex items-baseline gap-0.5 leading-none">
                    <span className="font-titillum text-[1.25rem] text-rich-black" style={{ fontWeight: 900 }}><StatVal value={50} /></span>
                    <span className="font-titillum text-[0.85rem] text-pear" style={{ fontWeight: 900 }}>+</span>
                  </div>
                  <p className="text-[0.6rem] font-bold text-laurel font-body uppercase tracking-wider mt-0.5">Trainers</p>
                </div>
              </div>
            </div>

          </div>

          <div
            ref={imageRef}
            className="hidden lg:flex relative items-end justify-end order-1 lg:order-2 lg:h-[calc(100vh-70px)] lg:translate-x-[-10%]"
          >
            <img
              src="/hero.png"
              alt="Elite athlete training at IronCore Fitness"
              className="relative z-10 h-full max-h-full w-auto object-contain object-bottom select-none pointer-events-none"
              draggable={false}
            />

            <div className="hidden lg:flex absolute top-[6%] right-[-50px] flex-col items-center gap-0 z-20 w-[110px] select-none">

              <div className="flex flex-col items-center justify-center py-4 px-3 w-full text-center">
                <div className="w-10 h-10 rounded-xl bg-rich-black flex items-center justify-center mb-2">
                  <Users className="w-5 h-5 text-pear" strokeWidth={2} />
                </div>
                <div className="flex items-baseline gap-0.5 leading-none">
                  <span className="font-titillum text-[1.4rem] text-rich-black" style={{ fontWeight: 900 }}><StatVal value={12} /></span>
                  <span className="font-titillum text-[0.9rem] text-pear" style={{ fontWeight: 900 }}>K+</span>
                </div>
                <p className="text-[0.6rem] font-bold text-laurel font-body uppercase tracking-wider mt-1">Members</p>
              </div>

              <div className="w-[75%] h-px bg-rich-black/15 my-1" />

              <div className="flex flex-col items-center justify-center py-4 px-3 w-full text-center">
                <div className="w-10 h-10 rounded-xl bg-rich-black flex items-center justify-center mb-2">
                  <Dumbbell className="w-5 h-5 text-pear" strokeWidth={2} />
                </div>
                <div className="flex items-baseline gap-0.5 leading-none">
                  <span className="font-titillum text-[1.4rem] text-rich-black" style={{ fontWeight: 900 }}><StatVal value={50} /></span>
                  <span className="font-titillum text-[0.9rem] text-pear" style={{ fontWeight: 900 }}>+</span>
                </div>
                <p className="text-[0.6rem] font-bold text-laurel font-body uppercase tracking-wider mt-1">Trainers</p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
