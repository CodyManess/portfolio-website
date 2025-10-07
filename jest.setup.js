// jest.setup.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ degrees: [], certs: [] }),
  })
)