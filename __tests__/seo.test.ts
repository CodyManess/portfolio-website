import robots from '@/app/robots'
import sitemap from '@/app/sitemap'
import { metadata as rootMetadata } from '@/app/layout'
import { metadata as extendedMetadata } from '@/app/extended/page'
import OgImage, {
  alt as ogAlt,
  size as ogSize,
  contentType as ogContentType,
} from '@/app/opengraph-image'
import Icon, {
  size as iconSize,
  contentType as iconContentType,
} from '@/app/icon'

jest.mock('next/font/local', () => () => ({
  className: 'mock-font',
  variable: '--mock-font',
}))

jest.mock('next/og', () => ({
  ImageResponse: class MockImageResponse {
    element: unknown
    options: unknown
    constructor(element: unknown, options: unknown) {
      this.element = element
      this.options = options
    }
  },
}))

describe('SEO Metadata Routes', () => {
  it('generates expected robots configuration', () => {
    const result = robots()

    expect(result.rules).toEqual({
      userAgent: '*',
      allow: '/',
    })
    expect(result.sitemap).toBe('https://codymaness.com/sitemap.xml')
    expect(result.host).toBe('https://codymaness.com')
  })

  it('generates sitemap entries for home and extended routes', () => {
    const entries = sitemap()

    expect(entries).toHaveLength(2)
    expect(entries[0]).toMatchObject({
      url: 'https://codymaness.com',
      priority: 1,
    })
    expect(entries[1]).toMatchObject({
      url: 'https://codymaness.com/extended',
      priority: 0.8,
    })
  })

  it('exports complete OpenGraph, Twitter, and icon metadata across routes', async () => {
    expect(ogAlt).toBe('Profile of Cody Maness')
    expect(ogSize).toEqual({ width: 1200, height: 630 })
    expect(ogContentType).toBe('image/png')

    const ogResponse = await OgImage()
    expect(ogResponse).toBeDefined()

    expect(iconSize).toEqual({ width: 32, height: 32 })
    expect(iconContentType).toBe('image/png')
    const iconResponse = Icon()
    expect(iconResponse).toBeDefined()

    expect(rootMetadata.openGraph).toMatchObject({
      siteName: 'Cody Maness | Full-Stack Developer',
      locale: 'en_US',
      type: 'website',
      url: 'https://codymaness.com',
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: 'Profile of Cody Maness',
        },
      ],
    })

    expect(extendedMetadata.openGraph).toMatchObject({
      siteName: 'Cody Maness | Full-Stack Developer',
      locale: 'en_US',
      type: 'website',
      url: 'https://codymaness.com/extended',
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: 'Profile of Cody Maness',
        },
      ],
    })
  })
})
