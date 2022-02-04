
const factory = require('../../lib/resources/channels')

const BASE = '/channels'
describe(BASE, () => {
  const req = {
    get: jest.fn()
  }
  const client = factory(req)

  it(`GET ${BASE}`, () => {
    client.get()
    expect(req.get).toHaveBeenCalledWith(BASE)
  })
})
