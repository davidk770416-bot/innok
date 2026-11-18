import { ArrowLink, PageIntro } from '@/components/editorial'
import { Catalogue } from '@/components/catalogue'
import { patterns } from '@/lib/catalogue'

export const metadata = { title: 'Dryback LVT', description: 'Dryback luxury vinyl flooring for glue-down installation. Ask INNOK about current patterns and configurations.' }

export default function Dryback() {
  return <>
    <PageIntro label="Collections / Luxury vinyl" title="Dryback LVT"><p>A glue-down flooring collection for distributors, contractors and building projects.</p></PageIntro>
    <section className="wrap columns content-section rule-section">
      <div><p className="kicker">Installation method</p><p className="mt-2 mb-4">Glue-down</p><ArrowLink href="/resources">Technical Resources</ArrowLink></div>
      <div><h2 className="text-5xl mb-4">Patterns</h2><Catalogue entries={patterns} /></div>
    </section>
  </>
}
