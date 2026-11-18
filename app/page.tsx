import Image from 'next/image'
import Link from 'next/link'
import { ArrowLink } from '@/components/editorial'

export default function Home() {
  return <>
    <section aria-labelledby="homepage-title">
      <div className="wrap landing-title">
        <h1 id="homepage-title">Luxury vinyl flooring.</h1>
        <div className="landing-intro">
          <p>For the Canadian building trade.</p>
          <Link href="/products" className="arrow-link">Explore Collections <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
      <figure className="landing-gallery">
        <div><Image src="/gallery-interior.png" alt="Daylight across a gallery floor with long wood planks" fill sizes="100vw" preload /></div>
        <figcaption className="wrap">Architectural concept</figcaption>
      </figure>
    </section>
    <section className="wrap landing-index" aria-labelledby="collections-title">
      <figure className="landing-grain">
        <div><Image src="/floor-grain-study.png" alt="Raking light across woodgrain and plank seams in an illustrative flooring study" fill sizes="(max-width: 760px) 90vw, 52vw" /></div>
        <figcaption>Illustrative surface study</figcaption>
      </figure>
      <div className="landing-list">
        <h2 id="collections-title">Dryback LVT</h2>
        <p>Glue-down planks and tiles.</p>
        <nav aria-label="Explore Dryback LVT">
          <Link href="/products/dryback-lvt#specifications">Specifications &amp; packaging <span aria-hidden="true">↗</span></Link>
          <Link href="/studio">View the material in 3D <span aria-hidden="true">↗</span></Link>
          <Link href="/quote?product=dryback-lvt&amp;samples=1">Request Samples <span aria-hidden="true">↗</span></Link>
        </nav>
        <ArrowLink href="/quote">Request a Quote</ArrowLink>
      </div>
    </section>
  </>
}
