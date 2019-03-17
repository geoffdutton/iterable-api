
const factory = require('../../lib/resources/push')

const BASE = '/push'
describe(BASE, () => {
  const request = {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn()
  }
  const client = factory(request)

  it(`POST ${BASE}/target`, () => {
    const obj = {
      campaignId: 33,
      recipientEmail: 'blah@email.com'
    }
    client.target(obj)
    expect(request.post).toHaveBeenCalledWith(`${BASE}/target`, obj)
  })
})
