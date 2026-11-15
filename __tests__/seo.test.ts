import robots from '@/app/robots'
import sitemap from '@/app/sitemap'

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
})
