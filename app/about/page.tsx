import { ArrowLink, PageIntro, TradeCallout } from '@/components/editorial'
export const metadata = { title: 'About INNOK', description: 'INNOK is a Canadian luxury vinyl flooring brand serving the building trade.' }
export default function About() {
  return <>
    <PageIntro title="About INNOK"><p>INNOK is a Canadian luxury vinyl flooring brand serving distributors, wholesalers, contractors, builders, developers and commercial buyers.</p></PageIntro>
    <section className="wrap columns rule-section content-section">
      <p className="kicker">Our approach</p>
      <div className="prose-copy"><h2>Flooring for the building trade.</h2><p>We bring together flooring materials knowledge and connections in the South Korean flooring industry to serve Canadian buyers.</p><p>We work through the details with you, from selecting a colour and format to confirming construction, carton coverage and project quantities.</p><ArrowLink href="/products">Explore Flooring</ArrowLink></div>
    </section>
    <TradeCallout />
  </>
}
