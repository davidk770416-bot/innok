import { PageIntro } from '@/components/editorial'
import { InquiryForm } from '@/components/inquiry-form'
import { collection, patterns } from '@/lib/catalogue'

export const metadata = { title: 'Request a Quote', description: 'Send INNOK your flooring requirements for a trade or project quote.' }

export default async function Quote({ searchParams }: { searchParams: Promise<{ product?: string | string[] }> }) {
  const { product } = await searchParams
  const selected = typeof product === 'string' && (product === collection.slug || patterns.some((item) => item.slug === product)) ? product : undefined
  return <>
    <PageIntro label="Trade inquiries" title="Request a quote"><p>Tell us what you need, where the project is and how much flooring you expect to order.</p></PageIntro>
    <section className="wrap columns rule-section content-section" aria-label="Quote inquiry">
      <div className="prose-copy"><p className="kicker">Project requirements</p><p>Include the colour code or dimensions if known, along with any installation or documentation requirements.</p></div>
      <InquiryForm kind="quote" selected={selected} />
    </section>
  </>
}
