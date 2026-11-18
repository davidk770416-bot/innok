import Link from 'next/link'
import { PageIntro } from '@/components/editorial'
import { ConfigurationGuide } from '@/components/configuration-guide'
import { Catalogue } from '@/components/catalogue'
import { patterns } from '@/lib/catalogue'

export const metadata = { title: 'Dryback LVT', description: 'INNOK glue-down luxury vinyl flooring. Compare sizes, wear layers and packaging.' }

export default function Dryback() {
  return <>
    <PageIntro label="Collections" title="Dryback LVT"><p>Glue-down luxury vinyl planks and tiles.</p></PageIntro>
    <div className="product-jumps">
      <nav className="wrap" aria-label="On this page">
        <a href="#specifications">Specifications &amp; packaging</a>
        <a href="#patterns">Patterns</a>
        <Link href="/studio">3D Studio</Link>
        <Link href="/quote?product=dryback-lvt&amp;samples=1">Request Samples</Link>
      </nav>
    </div>
    <ConfigurationGuide />
    <section className="wrap content-section" id="patterns" aria-labelledby="pattern-heading">
      <div className="rule-section guide-heading"><h2 id="pattern-heading" className="text-6xl">Patterns</h2></div>
      <Catalogue entries={patterns} />
    </section>
  </>
}
