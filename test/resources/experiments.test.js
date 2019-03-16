
const BASE = '/experiments'
const factory = require('../../lib/resources' + BASE)

describe(BASE, () => {
  const request = {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn()
  }
  const client = factory(request)

  it(`GET ${BASE}/metrics`, () => {
    const obj = {
      campaignId: 33,
      experimentId: 4456,
    }
    client.metrics(obj)
    expect(request.get).toHaveBeenCalledWith(`${BASE}/metrics`, obj)
  })
})
