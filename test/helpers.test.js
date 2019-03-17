
const Helpers = require('../lib/helpers')

test('padEnd()', () => {
  expect(Helpers.padEnd('GET', 'DELETE'.length)).toBe('GET   ')
  expect(Helpers.padEnd('DELETE', 'DELETE'.length)).toBe('DELETE')
})
