import { useState } from 'react'

function BeforeAfterCard({ before, after, name, duration, metrics }: { 
  before: string
  after: string
  name: string
  duration: string
  metrics: string
}) {
  const [sliderPosition, setSliderPosition] = useState(50)

  return (
    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 hover:border-pear bg-rich-black shadow-lg group transition-all duration-300 hover:shadow-[0_0_20px_rgba(188,255,0,0.15)]">
      
      {/* After Image (Clipped Right) */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none"
        style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
      >
        <img 
          src={after} 
          alt={`${name} After`} 
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        />
      </div>

      {/* Before Image (Clipped Left) */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img 
          src={before} 
          alt={`${name} Before`} 
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        />
      </div>

      {/* Slider Line & Handle */}
      <div 
        className="absolute top-0 bottom-0 w-[2px] bg-white group-hover:bg-pear z-20 pointer-events-none transition-colors duration-300"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white border-2 border-rich-black/25 flex items-center justify-center shadow-lg group-hover:bg-pear group-hover:scale-110 transition-all duration-300">
          <img 
            src="/tranformation/gym.png" 
            alt="Gym handle icon" 
            className="w-8 h-8 object-contain select-none pointer-events-none"
          />
        </div>
      </div>

      {/* BEFORE / AFTER Labels */}
      <div className="absolute top-4 left-4 bg-rich-black/60 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[0.62rem] font-bold text-white uppercase tracking-wider select-none pointer-events-none z-10">
        Before
      </div>
      <div className="absolute top-4 right-4 bg-pear/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[0.62rem] font-bold text-rich-black uppercase tracking-wider select-none pointer-events-none z-10">
        After
      </div>

      {/* Card Info Overlay (at the bottom, visible on top of images) */}
      <div className="absolute bottom-0 left-0 right-0 pb-6 pt-16 px-5 bg-gradient-to-t from-rich-black via-rich-black/85 to-transparent text-center flex flex-col items-center pointer-events-none z-10">
        <h3 
          className="text-[1.25rem] sm:text-[1.35rem] text-white uppercase tracking-wider mb-1.5"
          style={{ 
            fontFamily: '"Titillium Web", sans-serif',
            fontWeight: 700,
            textShadow: '0 2px 6px rgba(0,0,0,0.9), -1px 0 0 rgba(0, 229, 255, 0.5), 1px 0 0 rgba(255, 0, 85, 0.5)'
          }}
        >
          {name}
        </h3>
        <p 
          className="text-[0.65rem] text-laurel font-bold uppercase tracking-widest leading-none mb-1.5 font-body"
          style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
        >
          Timeline: {duration}
        </p>
        <p 
          className="text-[0.78rem] text-pear font-semibold uppercase tracking-wider leading-none font-body"
          style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
        >
          {metrics}
        </p>
      </div>

      {/* Invisible Slider Input Range Overlay */}
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={sliderPosition} 
        onChange={(e) => setSliderPosition(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 select-none"
        aria-label="Before and after comparison slider"
      />

    </div>
  )
}

interface Transformation {
  id: number
  name: string
  duration: string
  metrics: string
  before: string
  after: string
}

const transformationsData: Transformation[] = [
  {
    id: 1,
    name: "John Miller",
    duration: "12 Weeks",
    metrics: "Lost 14kg & Built Muscle",
    before: "/tranformation/before-1.png",
    after: "/tranformation/after-1.png",
  },
  {
    id: 2,
    name: "David Carter",
    duration: "16 Weeks",
    metrics: "Body Recomposition Champion",
    before: "/tranformation/before-2.png", 
    after: "/tranformation/after-2.png",
  },
  {
    id: 3,
    name: "Robert Evans",
    duration: "8 Weeks",
    metrics: "Elite Conditioning Program",
    before: "/tranformation/before-3.png",
    after: "/tranformation/after-3.png",
  }
]

export default function TransformationsSection() {
  return (
    <section 
      id="transformations" 
      className="bg-white border-b border-celeste/20 lg:h-screen flex flex-col justify-center pt-10 pb-10 lg:pt-12 lg:pb-12 relative overflow-hidden"
      aria-label="Transformations"
    >
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="mb-6 text-center">
          <div className="flex items-center gap-2 mb-4 select-none justify-center">
            <span className="w-5 h-[2px] bg-rich-black rounded-full shrink-0" />
            <span className="font-titillum text-[0.75rem] tracking-[0.18em] uppercase text-rich-black" style={{ fontWeight: 600 }}>
              REAL RESULTS
            </span>
          </div>

          <h2 
            className="leading-[1.0] text-rich-black mb-6 uppercase tracking-[-0.01em]"
            style={{ fontFamily: '"Titillium Web", sans-serif', fontWeight: 900, fontSize: 'clamp(2.2rem,4vw,3.5rem)' }}
          >
            FITNESS <span className="text-pear">TRANSFORMATIONS</span>
          </h2>
          
          <div className="w-16 h-[4px] bg-pear rounded-full mx-auto" />
        </div>

        {/* Transformations Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[960px] mx-auto">
          {transformationsData.map((item) => (
            <BeforeAfterCard 
              key={item.id}
              before={item.before}
              after={item.after}
              name={item.name}
              duration={item.duration}
              metrics={item.metrics}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
