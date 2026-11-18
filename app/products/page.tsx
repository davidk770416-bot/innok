import { ArrowLink, PageIntro } from '@/components/editorial'
import { Catalogue } from '@/components/catalogue'
import { patterns } from '@/lib/catalogue'

export const metadata = { title: 'Flooring Products', description: 'Explore INNOK Dryback LVT and discuss current patterns and technical configurations.' }

export default function Products() {
  return <>
    <PageIntro title="Collections"><p>Dryback luxury vinyl flooring.</p></PageIntro>
    <section className="wrap content-section" aria-label="Flooring catalogue">
      <div className="collection-row"><div><p className="kicker">Glue-down luxury vinyl</p><h2>Dryback LVT</h2></div><ArrowLink href="/products/dryback-lvt">View collection</ArrowLink></div>
      <Catalogue entries={patterns} />
    </section>
  </>
}
