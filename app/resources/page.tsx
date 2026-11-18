import { ArrowLink, PageIntro } from '@/components/editorial'
export const metadata = { title: 'Technical Resources', description: 'Request INNOK flooring specifications and project documentation.' }
export default function Resources() {
  return <>
    <PageIntro title="Technical resources"><p>Request INNOK documentation for your flooring selection or project review.</p></PageIntro>
    <section className="wrap columns rule-section content-section">
      <p className="kicker">Dryback LVT</p>
      <div className="prose-copy"><h2>Product specifications</h2><p>Share the colour code or configuration you’re assessing and tell us which documentation your project requires.</p><ArrowLink href="/contact">Ask about documentation</ArrowLink></div>
    </section>
  </>
}
