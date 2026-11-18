'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import type { ViewerOptions } from './material-canvas'
import { drybackLayers, type Layer } from '@/lib/catalogue'

const Canvas = dynamic(() => import('./material-canvas'), {
  ssr: false,
  loading: () => <div className="material-stage grid place-items-center" role="status">Loading 3D preview…</div>,
})
const studyTexture = '/oak-material-study.png'
const emptyLayers: readonly Layer[] = []
const modes = [['surface', '3D surface'], ['construction', 'Exploded view'], ['room', 'Room visualizer']] as const

export function MaterialViewer({ texture, ratio = 4.2, layers = emptyLayers }: { texture?: string; ratio?: number; layers?: readonly Layer[] }) {
  const demo = !texture
  const [active, setActive] = useState(false)
  const [view, setView] = useState<ViewerOptions['mode']>('surface')
  const [room, setRoom] = useState<ViewerOptions['room']>('Gallery')
  const [tone, setTone] = useState<ViewerOptions['tone']>('Natural')
  const construction: readonly Layer[] = demo ? drybackLayers : layers
  return <section className="viewer" aria-label="Material preview">
    <div className="viewer-heading">
      <h2 className="text-5xl">Material preview</h2>
      {demo && <p className="kicker">Illustrative study</p>}
    </div>
    <div className="viewer-tabs" aria-label="Preview type">
      {modes.filter(([mode]) => mode !== 'construction' || construction.length > 0).map(([mode, label]) =>
        <button key={mode} type="button" aria-pressed={active && view === mode} onClick={() => { setView(mode); setActive(true) }}>{label}</button>,
      )}
    </div>
    {active ? <>
      {view === 'room' && <div className="viewer-options">
        <label>Interior <select value={room} onChange={(event) => setRoom(event.target.value as ViewerOptions['room'])}><option>Gallery</option><option>Workspace</option></select></label>
        {demo && <label>Wood tone <select value={tone} onChange={(event) => setTone(event.target.value as ViewerOptions['tone'])}><option>Natural</option><option>Smoked</option></select></label>}
      </div>}
      <Canvas key={view + ':' + room + ':' + tone + ':' + texture} mode={view} texture={texture ?? studyTexture} ratio={ratio} layers={construction} room={room} tone={view === 'room' ? tone : 'Natural'} />
      {view === 'construction' && <ol className="layer-list">{construction.map((layer, index) => <li key={index}>{layer.name}{layer.thicknessMm !== undefined && ' · ' + layer.thicknessMm + ' mm'}</li>)}</ol>}
    </> : <button className="viewer-cover" type="button" onClick={() => setActive(true)} style={{ backgroundImage: 'url(' + (texture ?? studyTexture) + ')' }}><span className="button">Open 3D preview <span aria-hidden="true">↗</span></span></button>}
    <p className="viewer-note">{demo ? 'Illustrative wood tone. Layers are shown out of scale.' : 'Digital preview. Confirm colour and finish with a physical sample.'}</p>
  </section>
}
