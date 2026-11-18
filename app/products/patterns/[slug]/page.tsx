import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageIntro } from '@/components/editorial'
import { MaterialViewer } from '@/components/material-viewer'
import { mil, optionsFor, patterns, squareFeet } from '@/lib/catalogue'

type Props = { params: Promise<{ slug: string }> }
export function generateStaticParams() { return patterns.map(({ slug }) => ({ slug })) }
export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const pattern = patterns.find((entry) => entry.slug === slug)
  return pattern ? { title: pattern.name + ' | Dryback LVT', description: 'Configurations for INNOK Dryback LVT colour ' + pattern.code + '.' } : {}
}

function SpecTable({ title, rows }: { title: string; rows: [string, string | number | undefined][] }) {
  return <table className="spec">
    <caption>{title}</caption>
    <tbody>{rows.filter(([, value]) => value !== undefined).map(([label, value]) => <tr key={label}><th scope="row">{label}</th><td>{value}</td></tr>)}</tbody>
  </table>
}

export default async function PatternDetail({ params }: Props) {
  const { slug } = await params
  const pattern = patterns.find((entry) => entry.slug === slug)
  if (!pattern) notFound()
  const options = optionsFor(pattern)
  const choices = patterns.filter((item) => item.family === pattern.family)
  const inquiry = '/quote?product=' + encodeURIComponent(pattern.slug)
  return <>
    <PageIntro label={'Dryback LVT / ' + pattern.family} title={pattern.name}><p>{pattern.code} · {pattern.format} · {pattern.finish}</p></PageIntro>
    <section className="wrap product-lead content-section">
      <div className="swatch"><Image src={pattern.image} alt={pattern.name + ' flooring pattern'} fill sizes="(max-width: 760px) 100vw, 50vw" /></div>
      <div>
        <h2 className="text-5xl">Colours</h2>
        <ul className="colour-selector">{choices.map((item) => <li key={item.slug}><Link aria-current={item.slug === pattern.slug ? 'page' : undefined} href={'/products/patterns/' + item.slug}>
          <div className="swatch"><Image src={item.image} alt="" fill sizes="105px" /></div>
          <span>{item.code}</span>
        </Link></li>)}</ul>
        <div className="actions"><Link href={inquiry} className="button">Request a Quote ↗</Link><Link href={inquiry + '&samples=1'} className="arrow-link">Request Samples ↗</Link></div>
      </div>
    </section>
    <section className="wrap content-section" aria-label="Product configurations">
      {options.map((option) => <section key={option.id} className="configuration">
        <h2 className="text-5xl">{option.id}</h2>
        <div className="configuration-tables">
          <SpecTable title="Technical specifications" rows={[
            ['Overall thickness', option.thicknessMm + ' mm'],
            ['Wear layer', option.wearMm + ' mm / ' + mil(option.wearMm) + ' mil'],
            ['Dimensions', option.widthMm + ' × ' + option.lengthMm + ' mm'],
            ['Installation', option.installation],
            ['Backing', option.backing],
          ]} />
          <SpecTable title="Packaging & logistics" rows={[
            ['Pieces per box', option.pieces],
            ['Coverage per box', option.coverageM2.toFixed(2) + ' m² / ' + (option.coverageFt2 ?? squareFeet(option.coverageM2)).toFixed(2) + ' sq. ft.'],
            ['Boxes per pallet', option.boxesPerPallet],
            ['Pallets per 20 ft container', option.palletsPerContainer],
            ['Boxes per 20 ft container', option.boxesPerContainer],
          ]} />
        </div>
        {pattern.texture && <MaterialViewer texture={pattern.texture} ratio={option.lengthMm / option.widthMm} layers={option.layers} />}
      </section>)}
    </section>
  </>
}
