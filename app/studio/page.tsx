import { MaterialViewer } from '@/components/material-viewer'

export const metadata = { title: 'Material Studio', description: 'Explore an illustrative flooring surface, exploded view and room visualizer.' }

export default function Studio() {
  return <section className="wrap studio-page content-section">
    <div className="studio-heading">
      <h1>Material Studio</h1>
      <p>Dryback LVT · Illustrative study</p>
    </div>
    <MaterialViewer startOpen showHeading={false} />
  </section>
}
