
const Helpers = require('../lib/helpers')

const padEnd = String.prototype.padEnd
describe('helpers', () => {
  afterAll(() => {
    String.prototype.padEnd = padEnd // eslint-disable-line no-extend-native
  })

  test('padEnd()', () => {
    expect(Helpers.padEnd('GET', 'DELETE'.length)).toBe('GET   ')
    expect(Helpers.padEnd('DELETE', 'DELETE'.length)).toBe('DELETE')

    delete String.prototype.padEnd
    expect(Helpers.padEnd('GET', 'DELETE'.length)).toBe('GET   ')
  })
})
