import Image from 'next/image'
import Link from 'next/link'
import { ArrowLink, TradeCallout } from '@/components/editorial'

export default function Home() {
  return <>
    <section className="wrap hero">
      <div className="hero-copy">
        <p className="kicker"><i aria-hidden="true" /> Luxury vinyl flooring · Canada</p>
        <h1>Better floors<br />begin <em>here.</em></h1>
        <p className="lede">Vinyl flooring for distributors, contractors and building projects.</p>
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
        <div><p>Glue-down luxury vinyl flooring. Discuss colour, format and construction requirements for your range or project.</p><ArrowLink href="/products/dryback-lvt">Explore Dryback LVT</ArrowLink></div>
      </div>
    </section>
    <section className="wrap buyer-grid">
      <div><p className="kicker">Working with INNOK</p><h2>From selection<br />to specification.</h2></div>
      <dl>
        <div><dt>Colour and format</dt><dd>Discuss the look and the plank or tile dimensions your project calls for.</dd></div>
        <div><dt>Construction details</dt><dd>Confirm thickness, wear layer and installation requirements for the configuration you’re considering.</dd></div>
        <div><dt>Quantity and coverage</dt><dd>Share an estimated area so we can discuss carton coverage and the quantities you need.</dd></div>
      </dl>
    </section>
    <TradeCallout />
  </>
}
