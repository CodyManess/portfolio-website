// jest.setup.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

beforeEach(() => {
  global.fetch = jest.fn((input) => {
    const url =
      typeof input === 'string'
        ? input
        : input instanceof URL
          ? input.href
          : input.url
    return Promise.reject(
      new Error(`Unexpected unmocked fetch call in test: ${url}`)
    )
  })
})
