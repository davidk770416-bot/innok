import { PageIntro } from '@/components/editorial'
import { InquiryForm } from '@/components/inquiry-form'
import { collection, patterns } from '@/lib/catalogue'

export const metadata = { title: 'Request a Quote', description: 'Send INNOK your flooring requirements for a trade or project quote.' }

export default async function Quote({ searchParams }: { searchParams: Promise<{ product?: string | string[], samples?: string | string[] }> }) {
  const { product, samples } = await searchParams
  const selected = typeof product === 'string' && (product === collection.slug || patterns.some((item) => item.slug === product)) ? product : undefined
  const sampleRequest = samples === '1'
  return <>
    <PageIntro label="Trade inquiries" title={sampleRequest ? 'Request samples' : 'Request a quote'}><p>{sampleRequest ? 'Choose a product and tell us which samples you need.' : 'Share your product, quantity and project details.'}</p></PageIntro>
    <section className="wrap columns rule-section content-section" aria-label="Quote inquiry">
      <div className="prose-copy"><p className="kicker">Project requirements</p><p>Include the colour code or dimensions if known, along with any installation or documentation requirements.</p></div>
      <InquiryForm kind={sampleRequest ? 'samples' : 'quote'} selected={selected} />
    </section>
  </>
}
