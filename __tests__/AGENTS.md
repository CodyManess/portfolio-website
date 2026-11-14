# Unit Test Guidelines (`__tests__/`)

- **File Naming**: Mirror the component/utility filename using kebab-case with a `.test.ts` or `.test.tsx` suffix.
- **Queries & Matchers**: Prefer `screen.*` queries and `jest-dom` matchers (`toBeInTheDocument()`, `toBeEmptyDOMElement()`, etc.) — ESLint enforces `eslint-plugin-testing-library` (`flat/react`) and `eslint-plugin-jest-dom` (`flat/recommended`). Avoid direct DOM node access like `container.firstChild`.
- **Network Calls (`fetch`)**: `jest.setup.js` resets `global.fetch` in `beforeEach` to reject unmocked requests. Always mock `global.fetch` explicitly in tests that exercise data-fetching components (`Creds`, `ProjectList`, `Home`).
- **Type Safety**: `tsconfig.json` enables `noUncheckedIndexedAccess` and `eslint.config.mjs` runs `recommendedTypeChecked` (`unbound-method`, `no-base-to-string`, `no-unnecessary-type-assertion`). Narrow indexed array items (`const el = items[0]; expect(el).toBeInTheDocument(); if (!el) return`) and use `Object.getOwnPropertyDescriptor` + `Object.defineProperty` when stubbing `window` methods.
