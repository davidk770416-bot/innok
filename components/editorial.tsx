import Link from 'next/link'

export function ArrowLink({ href, children }: { href: string, children: React.ReactNode }) {
  return <Link href={href} className="arrow-link">{children}<span aria-hidden="true">↗</span></Link>
}

export function PageIntro({ label, title, children }: { label?: string, title: string, children: React.ReactNode }) {
  return <header className="wrap page-intro">{label && <p className="kicker">{label}</p>}<h1>{title}</h1><div className="intro-copy">{children}</div></header>
}

export function TradeCallout() {
  return <section className="trade"><div className="wrap trade-grid">
    <div><p className="kicker">Trade inquiries</p><h2>Tell us what<br />you’re working on.</h2></div>
    <div><p>Share your flooring requirements, estimated quantity and project location. We’ll follow up to discuss suitable options.</p><Link className="button button-light" href="/quote">Request a Quote <span aria-hidden="true">↗</span></Link></div>
  </div></section>
}
