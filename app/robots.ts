import type { MetadataRoute } from 'next'
import { origin } from '@/lib/brand'
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/', disallow: '/api/' }, sitemap: origin ? new URL('/sitemap.xml', origin).href : undefined }
}
