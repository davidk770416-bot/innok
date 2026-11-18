import { ArrowLink, PageIntro } from '@/components/editorial'
import { InquiryForm } from '@/components/inquiry-form'
import { email } from '@/lib/brand'

export const metadata = { title: 'Contact', description: 'Contact INNOK about luxury vinyl flooring, specifications and trade inquiries.' }

export default function Contact() {
  return <>
    <PageIntro title="Contact INNOK"><p>Get in touch about the Dryback LVT collection, technical documents or working with INNOK.</p></PageIntro>
    <section className="wrap columns rule-section content-section" aria-label="Contact INNOK">
      <div className="prose-copy"><p className="kicker">Email</p><a className="underline" href={'mailto:' + email}>{email}</a><ArrowLink href="/quote">Request a Quote</ArrowLink></div>
      <InquiryForm kind="contact" />
    </section>
  </>
}
