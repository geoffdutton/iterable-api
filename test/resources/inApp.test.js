
const factory = require('../../lib/resources/inApp')

const BASE = '/inApp'
describe(BASE, () => {
  const request = {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn()
  }
  const client = factory(request)

  it(`GET ${BASE}/getMessages`, () => {
    client.getMessages({ email: 'blah@email.com' })
    expect(request.get).toHaveBeenCalledWith(`${BASE}/getMessages`, { email: 'blah@email.com' })
  })
})
