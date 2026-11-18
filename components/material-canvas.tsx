'use client'

import { useEffect, useRef, useState } from 'react'
import {
  AmbientLight, BoxGeometry, Color, DirectionalLight, Group, Mesh,
  MeshStandardMaterial, PerspectiveCamera, RepeatWrapping, Scene,
  SRGBColorSpace, TextureLoader, WebGLRenderer,
} from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

type Mode = 'surface' | 'construction' | 'room'
export type ViewerOptions = {
  mode: Mode
  texture: string
  ratio: number
  layers: readonly { name: string; thicknessMm?: number; colour?: string }[]
  room: 'Gallery' | 'Workspace'
  tone: 'Natural' | 'Smoked'
}
type Actions = { orbit: (radians: number) => void; zoom: (factor: number) => void; reset: () => void }

export default function MaterialCanvas({ mode, texture, ratio, layers, room, tone }: ViewerOptions) {
  const stage = useRef<HTMLDivElement>(null)
  const actions = useRef<Actions>(null)
  const [unavailable, setUnavailable] = useState(false)
  const [textureError, setTextureError] = useState(false)

  useEffect(() => {
    const root = stage.current
    if (!root) return
    let renderer: WebGLRenderer
    try {
      renderer = new WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'low-power' })
    } catch {
      queueMicrotask(() => setUnavailable(true))
      return
    }
    let disposed = false
    const scene = new Scene()
    const roomMode = mode === 'room'
    scene.background = new Color(roomMode ? '#dad6ca' : '#e9e3d8')
    const camera = new PerspectiveCamera(40, 1, 0.1, 80)
    camera.position.set(...(roomMode ? [6.5, 5, 8] : [4.2, 2.7, 4.2]) as [number, number, number])
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.65))
    renderer.domElement.setAttribute('aria-hidden', 'true')
    root.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enablePan = false
    controls.enableZoom = false
    controls.minPolarAngle = 0.18
    controls.maxPolarAngle = roomMode ? 1.46 : Math.PI * 0.87
    if (roomMode) controls.target.set(0, .5, 0)
    controls.update()
    controls.saveState()
    const draw = () => { if (!disposed) renderer.render(scene, camera) }
    controls.addEventListener('change', draw)

    const ambient = new AmbientLight('#fff8ed', 1.15)
    const sunlight = new DirectionalLight('#fff1d6', 1.65)
    sunlight.position.set(3, 7, 5)
    scene.add(ambient, sunlight)
    const group = new Group()
    scene.add(group)
    const surf = new MeshStandardMaterial({ color: tone === 'Smoked' ? '#88684e' : '#ffffff', roughness: .76 })
    const materials = new Set([surf])
    const geometry = new Set<BoxGeometry>()
    const solid = (colour: string) => {
      const material = new MeshStandardMaterial({ color: colour, roughness: .85 })
      materials.add(material)
      return material
    }
    const plankEdge = solid('#52473c')
    const box = (width: number, height: number, depth: number, material: MeshStandardMaterial | MeshStandardMaterial[], x = 0, y = 0, z = 0) => {
      const shape = new BoxGeometry(width, height, depth)
      geometry.add(shape)
      const mesh = new Mesh(shape, material)
      mesh.position.set(x, y, z)
      group.add(mesh)
    }
    const top = (edge: MeshStandardMaterial) => [edge, edge, surf, edge, edge, edge]
    if (roomMode) {
      const wall = solid(room === 'Gallery' ? '#e1d8c6' : '#a7a68f')
      const millwork = solid(room === 'Gallery' ? '#b9a88f' : '#4d493c')
      const base = solid('#5d5347')
      const floorWidth = 6.8
      const length = 1.7
      const courseWidth = Math.max(.19, Math.min(.8, length / ratio))
      const rows = Math.ceil(5.4 / courseWidth)
      const roomDepth = rows * courseWidth
      box(floorWidth, .16, roomDepth, base, 0, -.1)
      for (let row = 0; row < rows; row++) {
        const phase = ratio < 1.2 || row % 2 === 0 ? 0 : length / 2
        for (let x = -floorWidth / 2 - phase; x < floorWidth / 2; x += length) {
          const start = Math.max(x, -floorWidth / 2)
          const end = Math.min(x + length, floorWidth / 2)
          if (end <= start) continue
          box(end - start - .01, .033, courseWidth - .009, top(plankEdge), (start + end) / 2, -.009, -roomDepth / 2 + (row + .5) * courseWidth)
        }
      }
      box(floorWidth, 2.7, .12, wall, 0, 1.35, -roomDepth / 2)
      box(.12, 2.7, roomDepth, wall, -floorWidth / 2, 1.35)
      if (room === 'Gallery') {
        box(2.3, .38, .76, millwork, -.7, .19, -1.05)
      } else {
        box(2.55, .09, 1.05, millwork, -.8, .78, -.85)
        box(.1, .75, .82, millwork, -1.88, .375, -.85)
        box(.1, .75, .82, millwork, .28, .375, -.85)
      }
    } else if (mode === 'construction') {
      layers.forEach((layer, index) => {
        const tint = solid(layer.colour ?? (index % 2 ? '#a89681' : '#bfb2a1'))
        box(3.8, .07, 3.8 / ratio, index === 0 ? top(tint) : tint, 0, ((layers.length - 1) / 2 - index) * Math.min(.32, 1.45 / layers.length))
      })
    } else {
      box(3.8, .095, 3.8 / ratio, top(plankEdge))
    }

    const grain = new TextureLoader().load(texture, () => {
      if (disposed) return
      draw()
      root.dataset.ready = 'true'
    }, undefined, () => {
      if (!disposed) setTextureError(true)
    })
    grain.colorSpace = SRGBColorSpace
    grain.wrapS = grain.wrapT = RepeatWrapping
    grain.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 4)
    surf.map = grain
    surf.needsUpdate = true

    const resize = new ResizeObserver(() => {
      const { clientWidth, clientHeight } = root
      if (!clientWidth || !clientHeight) return
      camera.aspect = clientWidth / clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(clientWidth, clientHeight)
      draw()
    })
    resize.observe(root)
    const contextLost = (event: Event) => {
      event.preventDefault()
      setUnavailable(true)
    }
    renderer.domElement.addEventListener('webglcontextlost', contextLost)

    actions.current = {
      orbit(radians) {
        const offset = camera.position.clone().sub(controls.target)
        const x = offset.x * Math.cos(radians) + offset.z * Math.sin(radians)
        const z = offset.z * Math.cos(radians) - offset.x * Math.sin(radians)
        camera.position.set(x, offset.y, z).add(controls.target)
        controls.update()
      },
      zoom(factor) {
        const offset = camera.position.clone().sub(controls.target)
        offset.setLength(Math.max(roomMode ? 5.5 : 2.4, Math.min(roomMode ? 17 : 11, offset.length() * factor)))
        camera.position.copy(controls.target).add(offset)
        controls.update()
      },
      reset: () => controls.reset(),
    }

    return () => {
      disposed = true
      delete root.dataset.ready
      actions.current = null
      resize.disconnect()
      renderer.domElement.removeEventListener('webglcontextlost', contextLost)
      controls.dispose()
      geometry.forEach((shape) => shape.dispose())
      materials.forEach((material) => material.dispose())
      grain.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [mode, texture, ratio, layers, room, tone])

  return <>
    <div className="material-stage" ref={stage} hidden={unavailable || textureError} />
    {unavailable || textureError ? <p className="empty" role="status">3D preview is unavailable on this device.</p> :
      <div className="viewer-tools" aria-label="3D camera controls">
        <button type="button" onClick={() => actions.current?.orbit(-.24)} aria-label="Rotate left">↶</button>
        <button type="button" onClick={() => actions.current?.orbit(.24)} aria-label="Rotate right">↷</button>
        <button type="button" onClick={() => actions.current?.zoom(.83)} aria-label="Zoom in">+</button>
        <button type="button" onClick={() => actions.current?.zoom(1.2)} aria-label="Zoom out">−</button>
        <button type="button" onClick={() => actions.current?.reset()}>Reset</button>
      </div>}
  </>
}
