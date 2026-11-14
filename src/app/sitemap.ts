import type { MetadataRoute } from 'next'

const SITE_LAST_MODIFIED = new Date('2026-11-14')

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://codymaness.com',
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://codymaness.com/extended',
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
