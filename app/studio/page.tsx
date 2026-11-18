import { PageIntro } from '@/components/editorial'
import { MaterialViewer } from '@/components/material-viewer'

export const metadata = { title: 'Material Studio', description: 'Explore an illustrative flooring surface, exploded view and room visualizer.' }
export default function Studio() {
  return <>
    <PageIntro title="Material studio"><p>Explore a surface, its construction and the room around it.</p></PageIntro>
    <div className="wrap content-section"><MaterialViewer /></div>
  </>
}
