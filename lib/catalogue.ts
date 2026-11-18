export const families = ['Wood', 'Concrete', 'Marble', 'Granite', 'Carpet', 'Fabric'] as const
export type Family = (typeof families)[number]

export type Layer = { name: string; thicknessMm?: number; colour?: string }
export type Configuration = {
  id: string
  thicknessMm: number
  wearMm: number
  widthMm: number
  lengthMm: number
  installation: string
  pieces: number
  coverageM2: number
  coverageFt2?: number
  boxesPerPallet?: number
  palletsPerContainer?: number
  boxesPerContainer?: number
  layers?: readonly [Layer, ...Layer[]]
  backing?: string
}

export type Pattern = {
  slug: string
  name: string
  code: string
  finish: string
  family: Family
  texture?: `/materials/${string}`
  format: 'Plank' | 'Tile'
  image: `/materials/${string}`
  configurationIds: readonly [string, ...string[]]
}

export const collection = { name: 'Dryback LVT', slug: 'dryback-lvt' } as const
export const patterns: readonly Pattern[] = []
export const drybackLayers = [
  { name: 'UV coating' },
  { name: 'Wear layer' },
  { name: 'Printed design layer' },
  { name: 'Vinyl core' },
] as const

type Packing = readonly [thicknessMm: number, wearMm: number, pieces: number, coverageM2: number, coverageFt2: number, boxesPerPallet: number, palletsPerContainer: number, boxesPerContainer: number]
const standards: readonly { label: string; widthMm: number; lengthMm: number; configs: readonly Packing[] }[] = [
  { label: "6\" × 36\"", widthMm: 152.4, lengthMm: 914.4, configs: [
    [2, 0.15, 24, 3.34, 36, 60, 20, 1200],
    [2, 0.2, 24, 3.34, 36, 60, 20, 1200],
    [2, 0.3, 24, 3.34, 36, 60, 20, 1200],
  ] },
  { label: "7\" × 48\"", widthMm: 177.8, lengthMm: 1219.2, configs: [
    [2, 0.2, 22, 4.77, 51.33, 50, 20, 1000],
    [2, 0.3, 22, 4.77, 51.33, 50, 20, 1000],
    [2.5, 0.5, 18, 3.9, 42, 50, 20, 1000],
    [3, 0.3, 15, 3.25, 35, 50, 20, 1000],
    [3, 0.5, 15, 3.25, 35, 50, 20, 1000],
    [3.5, 0.3, 12, 2.6, 28, 50, 20, 1000],
  ] },
  { label: "9\" × 48\"", widthMm: 228.6, lengthMm: 1219.2, configs: [
    [2, 0.2, 20, 5.57, 60, 52, 20, 1040],
    [2, 0.3, 20, 5.57, 60, 52, 20, 1040],
    [2.5, 0.5, 16, 4.46, 48, 52, 20, 1040],
    [3, 0.3, 13, 3.62, 39, 52, 20, 1040],
    [3, 0.5, 13, 3.62, 39, 52, 20, 1040],
    [3.5, 0.3, 11, 3.07, 33, 52, 20, 1040],
  ] },
  { label: "9\" × 60\"", widthMm: 228.6, lengthMm: 1524, configs: [
    [2.5, 0.5, 12, 4.18, 45, 51, 20, 1020],
    [3, 0.3, 11, 3.83, 41.25, 51, 20, 1020],
    [3, 0.5, 11, 3.83, 41.25, 51, 20, 1020],
    [3.5, 0.3, 10, 3.48, 37.5, 51, 20, 1020],
  ] },
  { label: "470 × 470 mm", widthMm: 470, lengthMm: 470, configs: [
    [2, 0.2, 22, 4.86, 52.31, 48, 20, 960],
    [2, 0.3, 22, 4.86, 52.31, 48, 20, 960],
    [3, 0.3, 15, 3.31, 35.67, 48, 20, 960],
    [3, 0.5, 15, 3.31, 35.67, 48, 20, 960],
    [3.5, 0.3, 13, 2.87, 30.91, 48, 20, 960],
  ] },
]

export const formats = standards.map(({ label, widthMm, lengthMm, configs }) => ({
  label, widthMm, lengthMm,
  configurations: configs.map(([thicknessMm, wearMm, pieces, coverageM2, coverageFt2, boxesPerPallet, palletsPerContainer, boxesPerContainer]): Configuration => {
    const acoustic = thicknessMm === 3.5
    return {
      id: [widthMm, lengthMm, thicknessMm, wearMm].join('-'),
      thicknessMm, wearMm, widthMm, lengthMm, pieces, coverageM2, coverageFt2, boxesPerPallet, palletsPerContainer, boxesPerContainer,
      installation: 'Glue-down',
      layers: acoustic ? [...drybackLayers, { name: 'PE sound pad', thicknessMm: 1 }] : drybackLayers,
      backing: acoustic ? '1.0 mm integrated PE sound pad' : undefined,
    }
  }),
}))

const configurations = formats.flatMap((format) => format.configurations)

export function optionsFor(pattern: Pattern) {
  return pattern.configurationIds.map((id) => {
    const configuration = configurations.find((entry) => entry.id === id)
    if (!configuration) throw new Error('Missing configuration for ' + pattern.slug)
    return configuration
  })
}

export const mil = (mm: number) => Number((mm / 0.0254).toFixed(1))
export const squareFeet = (m2: number) => Number((m2 / 0.09290304).toFixed(2))
