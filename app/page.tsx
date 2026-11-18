import Image from 'next/image'
import Link from 'next/link'
import { ArrowLink } from '@/components/editorial'

export default function Home() {
  return <>
    <section className="landing-hero" aria-labelledby="homepage-title">
      <figure className="landing-gallery">
        <Image src="/gallery-interior.png" alt="Gallery with long wood planks and sunlight across the floor" fill sizes="100vw" preload />
        <figcaption>Architectural concept</figcaption>
      </figure>
      <div className="landing-title">
        <h1 id="homepage-title">Better floors<br />begin <em>here.</em></h1>
        <p>Luxury vinyl flooring for the Canadian trade.</p>
        <div className="actions">
          <Link className="button" href="/products">Explore Collections <span aria-hidden="true">↗</span></Link>
          <ArrowLink href="/quote">Request a Quote</ArrowLink>
        </div>
      </div>
    </section>
    <section className="wrap landing-index" aria-labelledby="collections-title">
      <div className="landing-list">
        <p className="kicker">Collections</p>
        <h2 id="collections-title">Dryback LVT</h2>
        <p>Glue-down luxury vinyl for the building trade.</p>
        <nav aria-label="Explore Dryback LVT">
          <Link href="/products/dryback-lvt">Collection &amp; specifications <span aria-hidden="true">↗</span></Link>
          <Link href="/studio">3D Material Studio <span aria-hidden="true">↗</span></Link>
          <Link href="/quote?product=dryback-lvt&amp;samples=1">Request Samples <span aria-hidden="true">↗</span></Link>
        </nav>
      </div>
      <figure className="landing-grain">
        <div><Image src="/oak-material-study.png" alt="Close view of an illustrative oak grain" fill sizes="(max-width: 760px) 92vw, 49vw" /></div>
        <figcaption>Woodgrain study</figcaption>
      </figure>
    </section>
  </>
}
