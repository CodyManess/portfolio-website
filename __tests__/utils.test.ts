import { getSafeExternalUrl } from '@/lib/utils'

describe('getSafeExternalUrl', () => {
  it('accepts valid http and https URLs', () => {
    expect(getSafeExternalUrl('https://codymaness.com')).toBe(
      'https://codymaness.com'
    )
    expect(getSafeExternalUrl('https://www.mtsu.edu')).toBe(
      'https://www.mtsu.edu'
    )
    expect(getSafeExternalUrl('  http://example.com/path?a=1  ')).toBe(
      'http://example.com/path?a=1'
    )
  })

  it('rejects unsafe or malformed URLs', () => {
    expect(getSafeExternalUrl(undefined)).toBeUndefined()
    expect(getSafeExternalUrl('')).toBeUndefined()
    expect(getSafeExternalUrl('javascript:alert(1)')).toBeUndefined()
    expect(
      getSafeExternalUrl('data:text/html,<script>alert(1)</script>')
    ).toBeUndefined()
    expect(getSafeExternalUrl('mailto:cody.maness@outlook.com')).toBeUndefined()
    expect(getSafeExternalUrl('/relative/path')).toBeUndefined()
  })
})
