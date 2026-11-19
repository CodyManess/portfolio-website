import { getActiveSectionId } from '@/lib/navigation'

const restoreWindowProperty = (
  key: string,
  descriptor: PropertyDescriptor | undefined
) => {
  if (descriptor) {
    Object.defineProperty(window, key, descriptor)
  } else {
    Reflect.deleteProperty(window, key)
  }
}

describe('getActiveSectionId', () => {
  const originalInnerHeight = Object.getOwnPropertyDescriptor(
    window,
    'innerHeight'
  )
  const originalScrollY = Object.getOwnPropertyDescriptor(window, 'scrollY')
  const originalScrollHeight = Object.getOwnPropertyDescriptor(
    document.documentElement,
    'scrollHeight'
  )

  beforeEach(() => {
    Object.defineProperty(window, 'innerHeight', {
      value: 800,
      configurable: true,
    })
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      configurable: true,
    })
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 2400,
      configurable: true,
    })
  })

  afterEach(() => {
    restoreWindowProperty('innerHeight', originalInnerHeight)
    restoreWindowProperty('scrollY', originalScrollY)
    if (originalScrollHeight) {
      Object.defineProperty(
        document.documentElement,
        'scrollHeight',
        originalScrollHeight
      )
    } else {
      Reflect.deleteProperty(document.documentElement, 'scrollHeight')
    }
  })

  it('activates the last present section when scrolled to the bottom of the page', () => {
    const home = document.createElement('section')
    home.id = 'home'
    home.getBoundingClientRect = () => ({ top: -1500 }) as DOMRect

    const credentials = document.createElement('section')
    credentials.id = 'credentials'
    credentials.getBoundingClientRect = () => ({ top: 100 }) as DOMRect

    const projects = document.createElement('section')
    projects.id = 'projects'
    projects.getBoundingClientRect = () => ({ top: 500 }) as DOMRect

    document.body.append(home, credentials, projects)

    try {
      expect(getActiveSectionId()).toBe('credentials')

      Object.defineProperty(window, 'scrollY', {
        value: 1600,
        configurable: true,
      })
      expect(getActiveSectionId()).toBe('projects')
    } finally {
      home.remove()
      credentials.remove()
      projects.remove()
    }
  })
})
