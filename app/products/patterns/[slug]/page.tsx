import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowLink, PageIntro } from '@/components/editorial'
import { mil, optionsFor, patterns, squareFeet } from '@/lib/catalogue'

type Props = { params: Promise<{ slug: string }> }
export function generateStaticParams() { return patterns.map(({ slug }) => ({ slug })) }
export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const pattern = patterns.find((entry) => entry.slug === slug)
  return pattern ? { title: pattern.name + ' | Dryback LVT', description: 'Configurations for INNOK Dryback LVT colour ' + pattern.code + '.' } : {}
}

export default async function PatternDetail({ params }: Props) {
  const { slug } = await params
  const pattern = patterns.find((entry) => entry.slug === slug)
  if (!pattern) notFound()
  return <>
    <PageIntro label="Dryback LVT" title={pattern.name}><p>Colour code {pattern.code} · {pattern.format} · {pattern.finish}</p></PageIntro>
    <section className="wrap columns content-section">
      <div className="swatch"><Image src={pattern.image} alt={pattern.name + ' flooring pattern'} fill sizes="(max-width: 760px) 100vw, 36vw" /></div>
      <div>
        <h2 className="text-5xl">Configurations</h2>
        {optionsFor(pattern).map((option) => <table className="spec" key={option.id}>
          <caption>{option.id}</caption>
          <tbody>{[
            ['Overall thickness', option.thicknessMm + ' mm'],
            ['Wear layer', option.wearMm + ' mm / ' + mil(option.wearMm) + ' mil'],
            ['Dimensions', option.widthMm + ' × ' + option.lengthMm + ' mm'],
            ['Installation', option.installation],
            ['Pieces per box', option.pieces],
            ['Coverage per box', option.coverageM2 + ' m² / ' + squareFeet(option.coverageM2) + ' sq. ft.'],
          ].map(([label, value]) => <tr key={label}><th scope="row">{label}</th><td>{value}</td></tr>)}</tbody>
        </table>)}
        <ArrowLink href={'/quote?product=' + encodeURIComponent(pattern.slug)}>Request a Quote</ArrowLink>
      </div>
    </section>
  </>
}
