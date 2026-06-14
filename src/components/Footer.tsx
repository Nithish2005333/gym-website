interface SocialLink {
  name: string
  href: string
  icon: React.ReactNode
}

const socialLinks: SocialLink[] = [
  {
    name: 'Facebook',
    href: '#',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
      </svg>
    )
  },
  {
    name: 'Instagram',
    href: '#',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    )
  },
  {
    name: 'X',
    href: '#',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    )
  }
]

export default function Footer() {
  return (
    <footer
      id="footer"
      className="bg-rich-black text-white pt-6 pb-3 lg:pt-8 lg:pb-3 relative overflow-hidden border-t border-white/5 lg:h-[88vh] flex flex-col justify-between"
      aria-label="Site Footer"
    >
      <div
        className="absolute right-[-10%] bottom-[-10%] w-96 h-96 rounded-full opacity-[0.03] pointer-events-none filter blur-[90px]"
        style={{ background: 'radial-gradient(circle, #BCFF00 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto w-full px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">

        <div className="md:col-span-2 lg:col-span-2 flex flex-col items-start gap-6">
          <a href="#home" className="flex items-center gap-2 group shrink-0 mt-1.5" aria-label="IronCore Fitness Home">
            <img
              src="/ironcore-logo.png"
              alt="IronCore Logo"
              className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          <p className="text-[0.85rem] text-laurel max-w-[20rem] leading-relaxed font-body">
            Empowering your physical journey through expert-led training program designs, advanced metrics, and elite-level gym coaching facilities.
          </p>

          <div className="flex items-center gap-3 mt-2">
            {socialLinks.map(({ name, href, icon }) => (
              <a
                key={name}
                href={href}
                aria-label={`Follow us on ${name}`}
                className="group relative w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:bg-pear hover:text-rich-black hover:border-pear text-white flex items-center justify-center transition-all duration-300 active:scale-95 hover:-translate-y-0.5"
              >
                {icon}
                <span className="absolute bottom-full mb-2.5 scale-0 group-hover:scale-100 transition-all duration-200 rounded-md bg-rich-black border border-white/15 px-2.5 py-1 text-[0.65rem] font-bold font-body tracking-wider uppercase text-pear pointer-events-none whitespace-nowrap shadow-lg z-20 origin-bottom">
                  {name}
                  <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-rich-black" />
                </span>
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="w-5 h-[2px] bg-pear rounded-full" />
            <h4 className="font-titillum font-black text-[0.75rem] tracking-[0.18em] uppercase text-white">
              Quick Links
            </h4>
          </div>
          <ul className="space-y-2.5 text-[0.875rem] font-body">
            {[
              { label: 'Home', href: '#home' },
              { label: 'About', href: '#about' },
              { label: 'Trainers', href: '#trainers' },
              { label: 'Transformations', href: '#transformations' },
              { label: 'Pricing', href: '#pricing' },
            ].map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="group flex items-center text-laurel hover:text-pear transition-colors duration-300"
                >
                  <span className="w-0 h-[2px] bg-pear transition-all duration-300 group-hover:w-3.5 group-hover:mr-2 rounded-full shrink-0" />
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                    {label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="w-5 h-[2px] bg-pear rounded-full" />
            <h4 className="font-titillum font-black text-[0.75rem] tracking-[0.18em] uppercase text-white">
              Contact
            </h4>
          </div>
          <ul className="space-y-4 text-[0.875rem] font-body">
            <li>
              <a
                href="mailto:contact@ironcore.com"
                className="group flex items-start gap-2.5 text-laurel hover:text-pear transition-colors duration-200"
              >
                <svg className="w-4 h-4 shrink-0 mt-0.5 stroke-current fill-none" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                contact@ironcore.com
              </a>
            </li>
            <li>
              <a
                href="tel:+919876543210"
                className="group flex items-start gap-2.5 text-laurel hover:text-pear transition-colors duration-200"
              >
                <svg className="w-4 h-4 shrink-0 mt-0.5 stroke-current fill-none" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.86 9.8a19.79 19.79 0 01-3.07-8.64A2 2 0 012.77 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.74a16 16 0 006.35 6.35l1.1-1.1a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                +91 98765 43210
              </a>
            </li>
            <li className="flex items-start gap-2.5 text-laurel leading-relaxed">
              <svg className="w-4 h-4 shrink-0 mt-0.5 stroke-current fill-none" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              No. 12, Sengunthapuram Main Road, Karur, Tamil Nadu - 639002
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto w-full px-6 lg:px-10 mt-auto relative z-10 flex flex-col items-center">
        <div className="w-full h-px bg-white/5 mt-4 mb-6" />

        <div className="w-full text-center select-none pointer-events-none mb-3 overflow-hidden">
          <span
            className="block text-[12vw] md:text-[16vw] font-titillum font-black text-white/[0.03] uppercase tracking-[0.08em] leading-none whitespace-nowrap"
            style={{ textShadow: '0 0 40px rgba(188,255,0,0.01)' }}
          >
            IRONCORE
          </span>
        </div>

        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 text-[0.75rem] md:text-[0.8rem] font-body text-laurel/60 pb-7 md:pb-3 mt-4 md:mt-1 text-center md:text-left">
          <p className="w-full md:w-auto text-center md:text-left">© 2026 IronCore Fitness. All Rights Reserved.</p>
          <div className="flex items-center justify-center md:justify-end gap-6 w-full md:w-auto">
            <a href="#privacy" className="hover:text-pear transition-colors duration-200">Privacy Policy</a>
            <a href="#terms" className="hover:text-pear transition-colors duration-200">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
