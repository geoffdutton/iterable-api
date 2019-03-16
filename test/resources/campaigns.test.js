
const factory = require('../../lib/resources/campaigns')

const BASE = '/campaigns'
describe(BASE, () => {
  const request = {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn()
  }
  const client = factory(request)

  it(`GET ${BASE}/create`, () => {
    const obj = {
      name: 'Cool camp',
      listIds: [33, 44],
      templateId: 3,
    }
    client.create(obj)
    expect(request.post).toHaveBeenCalledWith(`${BASE}/create`, obj)
  })
})
