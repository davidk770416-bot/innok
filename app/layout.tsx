import type { Metadata } from 'next'
import { DM_Sans, Instrument_Serif } from 'next/font/google'
import Link from 'next/link'
import { description, email, links, origin } from '@/lib/brand'
import './globals.css'

const sans = DM_Sans({ subsets: ['latin'], variable: '--type-sans' })
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--type-serif' })

export const metadata: Metadata = {
  title: { default: 'INNOK | Luxury Vinyl Flooring Canada', template: '%s | INNOK' },
  description,
  metadataBase: origin,
  openGraph: { siteName: 'INNOK', locale: 'en_CA', type: 'website', description },
}

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organization = { '@context': 'https://schema.org', '@type': 'Organization', name: 'INNOK', email, areaServed: { '@type': 'Country', name: 'Canada' }, url: origin?.href }
  return (
    <html lang="en-CA" className={sans.variable + ' ' + serif.variable}>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <header className="header">
          <div className="wrap masthead">
            <Link href="/" className="wordmark" aria-label="INNOK home">INNOK<span>.</span></Link>
            <nav className="desktop-nav" aria-label="Main navigation">
              {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
            </nav>
            <Link className="button header-quote" href="/quote">Request a Quote <span aria-hidden="true">↗</span></Link>
            <details className="mobile-nav">
              <summary>Menu</summary>
              <nav aria-label="Mobile navigation">
                {[...links, ['Request a Quote', '/quote']].map(([label, href]) => <a key={href} href={href}>{label}</a>)}
              </nav>
            </details>
          </div>
        </header>
        <main id="main">{children}</main>
        <footer className="footer">
          <div className="wrap footer-grid">
            <div><Link href="/" className="wordmark" aria-label="INNOK home">INNOK<span>.</span></Link><p>Luxury vinyl flooring for Canadian trade and projects.</p></div>
            <nav aria-label="Footer navigation">{links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav>
            <div><p className="kicker">Trade inquiries</p><a href={'mailto:' + email}>{email}</a></div>
          </div>
          <div className="wrap footer-bottom"><span>© {new Date().getFullYear()} INNOK</span><span>Canada</span></div>
        </footer>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, '\\u003c') }} />
      </body>
    </html>
  )
}
