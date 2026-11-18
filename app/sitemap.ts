import type { MetadataRoute } from 'next'
import { origin } from '@/lib/brand'
import { patterns } from '@/lib/catalogue'
export default function sitemap(): MetadataRoute.Sitemap {
  if (!origin) return []
  return ['/', '/products', '/products/dryback-lvt', '/about', '/resources', '/quote', '/contact', ...patterns.map((pattern) => '/products/patterns/' + pattern.slug)].map((path) => ({ url: new URL(path, origin).href }))
}
