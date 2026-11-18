import Image from 'next/image'
import Link from 'next/link'
import { ArrowLink, TradeCallout } from '@/components/editorial'

export default function Home() {
  return <>
    <section className="wrap hero">
      <div className="hero-copy">
        <p className="kicker"><i aria-hidden="true" /> Flooring for the trade · Canada</p>
        <h1>Better floors<br />begin <em>here.</em></h1>
        <p className="lede">Luxury vinyl flooring for the Canadian trade.</p>
        <div className="actions">
          <Link className="button" href="/products">Explore Collections <span aria-hidden="true">↗</span></Link>
          <ArrowLink href="/quote">Request a Quote</ArrowLink>
        </div>
      </div>
      <figure className="hero-figure">
        <div className="hero-image"><Image src="/interior-study.png" alt="Concept interior with warm wood tones, a stone bench and daylight across the floor" fill sizes="(max-width: 760px) 100vw, 62vw" preload /></div>
        <figcaption>Architectural concept image</figcaption>
      </figure>
    </section>
    <section className="collection-band">
      <div className="wrap collection-grid">
        <div><p className="kicker">Collection</p><h2>Dryback LVT</h2></div>
        <div><p>Glue-down luxury vinyl.</p><ArrowLink href="/products/dryback-lvt">Explore Dryback LVT</ArrowLink></div>
      </div>
    </section>
    <section className="wrap material-feature">
      <p className="kicker">Material studio</p>
      <div><h2>See the surface.</h2><ArrowLink href="/studio">Open Material Studio</ArrowLink></div>
    </section>
    <TradeCallout />
  </>
}
