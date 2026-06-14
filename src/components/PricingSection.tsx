import { useState, useEffect, useRef } from 'react'

interface PricingPlan {
  id: number
  name: string
  price: string
  period: string
  desc: string
  features: string[]
  isPopular: boolean
  cta: string
  save?: string
}

const pricingPlans: PricingPlan[] = [
  {
    id: 1,
    name: "Starter Pass",
    price: "₹500",
    period: "month",
    desc: "Perfect for beginners looking to start their fitness journey.",
    features: [
      "Access to standard training zones",
      "Standard locker room & shower access",
      "1x Fitness assessment session",
      "Standard gym hours access"
    ],
    isPopular: false,
    cta: "Join Starter",
    save: "Save 20%"
  },
  {
    id: 2,
    name: "Iron Pro Pass",
    price: "₹1000",
    period: "month",
    desc: "Our most popular plan for dedicated and active trainees.",
    features: [
      "24/7 Unlimited gym access",
      "Locker, towel service & sauna access",
      "Monthly performance tracking",
      "1x Personal trainer consultation/mo",
      "Access to group classes"
    ],
    isPopular: true,
    cta: "Join Iron Pro",
    save: "Save 50%"
  },
  {
    id: 3,
    name: "Elite Coach Pass",
    price: "₹1500",
    period: "month",
    desc: "For athletes looking for highly personalized coaching.",
    features: [
      "All Iron Pro features included",
      "Dedicated 1-on-1 personal coach",
      "Customized nutrition & macro plans",
      "1x Free weekly guest pass",
      "Priority equipment booking"
    ],
    isPopular: false,
    cta: "Join Elite",
    save: "Save 50%"
  }
]

interface PricingCardProps {
  plan: PricingPlan
  cardStyle?: React.CSSProperties
}

function PricingCard({ plan, cardStyle }: PricingCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: 300, height: 450 })

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    setSize({
      width: el.offsetWidth,
      height: el.offsetHeight
    })

    const observer = new ResizeObserver(() => {
      setSize({
        width: el.offsetWidth,
        height: el.offsetHeight
      })
    })

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const { width: W, height: H } = size
  const N = 95 // notch width
  const D = 38 // notch depth
  
  const pathData = `
    M 0,20
    A 20,20 0 0,1 20,0
    L ${Math.max(20, W - N - 14)},0
    A 14,14 0 0,1 ${Math.max(20, W - N)},14
    L ${Math.max(20, W - N)},${D - 14}
    A 14,14 0 0,0 ${Math.max(20, W - N + 14)},${D}
    L ${Math.max(20, W - 20)},${D}
    A 20,20 0 0,1 ${W},${D + 20}
    L ${W},${H - 20}
    A 20,20 0 0,1 ${W - 20},${H}
    L 20,${H}
    A 20,20 0 0,1 0,${H - 20}
    Z
  `.trim().replace(/\s+/g, ' ')

  return (
    <div 
      ref={containerRef}
      style={cardStyle}
      className={`
        relative flex flex-col justify-between p-6 pt-11 min-h-[420px] select-none backdrop-blur-md
        ${plan.isPopular 
          ? 'text-white md:scale-[1.03] drop-shadow-[0_12px_25px_rgba(188,255,0,0.06)]' 
          : 'text-rich-black drop-shadow-[0_8px_20px_rgba(6,20,20,0.04)]'}
      `}
    >
      {/* Dynamic Background SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10 overflow-visible" viewBox={`0 0 ${W} ${H}`} width={W} height={H}>
        {/* Full card boundary with notch glass color */}
        <rect 
          x="0" 
          y="0" 
          width={W} 
          height={H} 
          rx="20" 
          ry="20" 
          fill={plan.isPopular ? "rgba(0, 0, 0, 0.45)" : "rgba(6, 20, 20, 0.06)"} 
          stroke={plan.isPopular ? "rgba(188, 255, 0, 0.2)" : "rgba(6, 20, 20, 0.08)"} 
          strokeWidth="1.5"
        />
        {/* Main card body path */}
        <path 
          d={pathData} 
          fill={plan.isPopular ? "rgba(6, 20, 20, 0.88)" : "rgba(255, 255, 255, 0.78)"} 
          stroke={plan.isPopular ? "#BCFF00" : "rgba(6, 20, 20, 0.12)"} 
          strokeWidth={plan.isPopular ? "2" : "1.5"}
        />
      </svg>
      
      {/* Save Badge */}
      {plan.save && (
        <div className="absolute top-0 right-0 w-[95px] h-[38px] flex items-center justify-center">
          <span className={`
            text-[0.72rem] font-body font-semibold
            ${plan.isPopular ? 'text-pear/90' : 'text-rich-black/75'}
          `}>
            {plan.save}
          </span>
        </div>
      )}

      {/* Plan Name in Tab */}
      <div className={`absolute top-[10px] left-6 font-titillum font-black text-[0.7rem] uppercase tracking-wider ${plan.isPopular ? 'text-white' : 'text-rich-black/75'}`}>
        {plan.name}
      </div>

      {/* Card Content */}
      <div className="flex flex-col justify-between h-full flex-grow">
        <div>
          {/* Price Display */}
          <div className="flex items-baseline gap-1 mt-2.5 mb-1">
            <div className="flex items-start font-titillum tracking-tight leading-none">
              <span className="text-[1.4rem] font-black mt-0.5">₹</span>
              <span className="text-[3rem] font-black">{plan.price.replace('₹', '')}</span>
            </div>
            <span className={`text-[0.75rem] uppercase tracking-wider font-semibold ${plan.isPopular ? 'text-pear' : 'text-laurel'}`}>
              / {plan.period}
            </span>
          </div>

          {/* Popular / Recommended Badge */}
          {plan.isPopular && (
            <div className="inline-block bg-pear text-rich-black font-body text-[0.62rem] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow-sm mb-3">
              Recommended
            </div>
          )}

          {/* Description */}
          <p className={`text-[0.78rem] mb-3 leading-relaxed ${plan.isPopular ? 'text-laurel/90' : 'text-laurel'}`}>
            {plan.desc}
          </p>

          {/* Features Title */}
          <div className="font-titillum font-bold text-[0.72rem] tracking-[0.1em] text-laurel uppercase mb-2 mt-3">
            WHAT'S INCLUDED
          </div>

          {/* Features List */}
          <ul className="space-y-1.5 mb-5">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2 text-[0.78rem] font-body">
                <span className="flex-shrink-0 w-4 h-4 rounded-full bg-pear text-rich-black flex items-center justify-center shadow-sm">
                  <svg className="w-2.5 h-2.5 stroke-current" fill="none" strokeWidth="4" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span className={plan.isPopular ? 'text-white/95' : 'text-rich-black/90'}>
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <div className="mt-auto">
          <a
            href="#pricing"
            className={`
              group rounded-full flex items-center justify-between pl-5 pr-1.5 py-1.5 w-full text-[0.78rem] font-semibold font-body tracking-tight active:scale-[0.98] transition-all duration-300 h-[44px]
              ${plan.isPopular 
                ? 'bg-white text-rich-black hover:bg-white/90 shadow-md' 
                : 'border-2 border-rich-black/20 text-rich-black bg-transparent hover:bg-rich-black hover:text-white hover:border-rich-black'}
            `}
          >
            <span>{plan.cta}</span>
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-pear text-rich-black flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              <svg className="w-3.5 h-3.5 stroke-current" fill="none" strokeWidth="2.5" viewBox="0 0 24 24">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Animation starts when section top enters at 90% of viewport height
      // Animation completes when section top reaches 15% from top
      const start = windowHeight * 0.9
      const end = windowHeight * 0.15

      const rawProgress = (start - rect.top) / (start - end)
      const p = Math.max(0, Math.min(1, rawProgress))
      setProgress(p)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getCardStyle = (index: number): React.CSSProperties => {
    const p = 1 - progress // p=1: fully stacked, p=0: fully spread

    const eased = p * p * (3 - 2 * p) // smoothstep easing

    // Card 0 (left): stacks over card 1 (center) — moves RIGHT when stacked
    if (index === 0) {
      return {
        transform: `translateX(calc(${eased * 100}% + ${eased * 2}rem)) rotate(${eased * -14}deg) translateY(${eased * 14}px)`,
        zIndex: 1,
        transition: 'transform 0.15s ease-out',
        transformOrigin: 'center bottom',
        willChange: 'transform',
      }
    }
    // Card 1 (center): slight back tilt when stacked
    if (index === 1) {
      return {
        transform: `rotate(${eased * -4}deg) translateY(${eased * 5}px)`,
        zIndex: 2,
        transition: 'transform 0.15s ease-out',
        transformOrigin: 'center bottom',
        willChange: 'transform',
      }
    }
    // Card 2 (right): stacks over card 1 (center) — moves LEFT when stacked, on top
    return {
      transform: `translateX(calc(${-eased * 100}% - ${eased * 2}rem)) rotate(${eased * 13}deg) translateY(${eased * 14}px)`,
      zIndex: 3,
      transition: 'transform 0.15s ease-out',
      transformOrigin: 'center bottom',
      willChange: 'transform',
    }
  }

  return (
    <section 
      ref={sectionRef}
      id="pricing" 
      className="bg-ceiling-white border-b border-celeste/20 lg:min-h-screen flex flex-col justify-start pt-10 pb-12 lg:pt-12 lg:pb-14 relative overflow-hidden"
      aria-label="Membership Pricing"
    >
      {/* Background decorative glows */}
      <div 
        className="absolute right-[-10%] top-[-10%] w-96 h-96 rounded-full opacity-5 pointer-events-none filter blur-[90px]"
        style={{ background: 'radial-gradient(circle, #BCFF00 0%, transparent 70%)' }}
      />
      <div 
        className="absolute left-[-10%] bottom-[-10%] w-96 h-96 rounded-full opacity-5 pointer-events-none filter blur-[90px]"
        style={{ background: 'radial-gradient(circle, #BCFF00 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto w-full px-6 lg:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="mb-5 text-center">
          <div className="flex items-center gap-2 mb-4 select-none justify-center">
            <span className="w-5 h-[2px] bg-rich-black rounded-full shrink-0" />
            <span className="font-titillum text-[0.75rem] tracking-[0.18em] uppercase text-rich-black" style={{ fontWeight: 600 }}>
              MEMBERSHIP PLANS
            </span>
          </div>

          <h2 
            className="leading-[1.0] text-rich-black mb-6 uppercase tracking-[-0.01em]"
            style={{ fontFamily: '"Titillium Web", sans-serif', fontWeight: 900, fontSize: 'clamp(2.2rem,4vw,3.5rem)' }}
          >
            CHOOSE YOUR <span className="text-pear">PASS</span>
          </h2>
          
          <div className="w-16 h-[4px] bg-pear rounded-full mx-auto" />
        </div>

        {/* Pricing Cards Grid — overflow visible so stacked cards show above siblings */}
        <div
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch"
          style={{ overflow: 'visible' }}
        >
          {pricingPlans.map((plan, index) => (
            <PricingCard key={plan.id} plan={plan} cardStyle={getCardStyle(index)} />
          ))}
        </div>

      </div>
    </section>
  )
}
