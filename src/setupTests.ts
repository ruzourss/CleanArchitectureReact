// @testing-library/react renders your components to document.body,
// this will ensure they're removed after each test.
import '@testing-library/react/cleanup-after-each'
// this adds jest-dom's custom assertions
import 'jest-dom/extend-expect'

/* eslint-disable no-console */
const originalError = console.error
beforeAll(() => {
  console.error = (...args: any[]) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})

/* eslint-enable no-console */
