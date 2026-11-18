export type Configuration = {
  id: string
  thicknessMm: number
  wearMm: number
  widthMm: number
  lengthMm: number
  installation: string
  pieces: number
  coverageM2: number
}

export type Pattern = {
  slug: string
  name: string
  code: string
  finish: string
  format: 'Plank' | 'Tile'
  image: `/materials/${string}`
  configurationIds: readonly [string, ...string[]]
}

export const collection = { name: 'Dryback LVT', slug: 'dryback-lvt' } as const
export const patterns: readonly Pattern[] = []
const configurations: readonly Configuration[] = []

export function optionsFor(pattern: Pattern) {
  return pattern.configurationIds.map((id) => {
    const configuration = configurations.find((entry) => entry.id === id)
    if (!configuration) throw new Error('Missing configuration for ' + pattern.slug)
    return configuration
  })
}

export const mil = (mm: number) => Number((mm / 0.0254).toFixed(1))
export const squareFeet = (m2: number) => Number((m2 / 0.09290304).toFixed(2))
