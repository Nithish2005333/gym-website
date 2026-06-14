export default function AboutSection() {
  const pillars = [
    {
      title: 'Science-Backed Coaching',
      desc: 'Custom metrics-driven tracking and diagnostic body assessments designed to yield measurable progress.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      )
    },
    {
      title: 'High-Performance Space',
      desc: 'Curated zones equipped with top-tier athletic machinery and custom rigs to maximize training output.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      )
    },
    {
      title: 'Elite Dedicated Community',
      desc: 'Surround yourself with motivated individuals focused on continuous self-improvement and strength.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    }
  ]

  return (
    <section
      id="about"
      className="relative min-h-[80vh] flex flex-col justify-center bg-white border-y border-celeste/20 py-10 lg:py-12 lg:overflow-hidden"
      aria-label="About Us"
    >
      <div
        className="absolute right-0 top-0 w-80 h-80 rounded-full opacity-10 pointer-events-none filter blur-[80px]"
        style={{ background: 'radial-gradient(circle, #BCFF00 0%, transparent 70%)' }}
      />
      <div
        className="absolute left-0 bottom-0 w-80 h-80 rounded-full opacity-10 pointer-events-none filter blur-[80px]"
        style={{ background: 'radial-gradient(circle, #BCFF00 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto w-full px-6 lg:px-10 relative z-10">

        <div className="mb-8 text-left">
          <div className="flex items-center gap-2 mb-5 select-none">
            <span className="w-5 h-[2px] bg-rich-black rounded-full shrink-0" />
            <span className="font-titillum text-[0.75rem] tracking-[0.18em] uppercase text-rich-black" style={{ fontWeight: 600 }}>
              OUR PHILOSOPHY
            </span>
          </div>

          <h2
            className="leading-[1.0] text-rich-black mb-6 uppercase tracking-[-0.01em]"
            style={{ fontFamily: '"Titillium Web", sans-serif', fontWeight: 900, fontSize: 'clamp(2.2rem,4vw,3.5rem)' }}
          >
            We Forge <span className="text-pear">Elite</span> BODIES &amp; MINDSETS
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          <div className="relative group">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-pear to-celeste opacity-20 group-hover:opacity-30 blur-sm transition duration-300" />
            <div className="relative rounded-2xl overflow-hidden border border-celeste bg-ceiling-white">
              <img
                src="/about-gym.png"
                alt="State-of-the-art training facility at IronCore"
                className="w-full h-[260px] sm:h-[360px] lg:h-[430px] object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div
                className="
                  absolute bottom-4 right-4 sm:bottom-6 sm:right-6
                  bg-white/85 backdrop-blur-md border border-celeste/30
                  px-4 py-3 sm:px-5 sm:py-4 rounded-2xl shadow-lg
                  hover:scale-[1.02] transition-transform duration-300
                  text-center select-none
                "
              >
                <p
                  className="text-[1.8rem] text-rich-black leading-none tracking-tight uppercase"
                  style={{ fontFamily: '"Titillium Web", sans-serif', fontWeight: 900 }}
                >
                  Est. 2018
                </p>
                <p className="text-[0.62rem] text-laurel font-bold leading-none uppercase tracking-widest mt-1.5 font-body">8+ Years Excellence</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">

            <div className="space-y-4 mb-8 text-[0.92rem] text-rich-black/75 font-body leading-relaxed max-w-xl">
              <p>
                At IronCore, we believe fitness is not just about physical strength; it is a test of resilience, character, and mental fortitude. We provide a space where athletes and driven individuals can push beyond their limits under science-backed performance programs.
              </p>
              <p>
                Whether you are training for elite competition or aiming to reclaim your vital health, our state-of-the-art facilities and elite coaching staff are engineered to unlock your peak performance.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {pillars.map((p, idx) => (
                <div key={idx} className="flex gap-4 items-start group">
                  <div className="w-10 h-10 rounded-xl bg-rich-black text-pear flex items-center justify-center shrink-0 shadow-md group-hover:scale-[1.05] transition-transform duration-300">
                    {p.icon}
                  </div>
                  <div>
                    <h3 className="font-titillum text-[1.05rem] text-rich-black uppercase tracking-wide leading-snug mb-1" style={{ fontWeight: 800 }}>{p.title}</h3>
                    <p className="text-[0.825rem] text-laurel font-medium font-body leading-normal">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
