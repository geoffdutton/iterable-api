const factory = require('../../lib/resources/catalogs')

const BASE = '/catalogs'

describe(BASE, () => {
  const request = {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn()
  }

  const client = factory(request)

  it(`GET ${BASE}`, () => {
    client.get({ page: 1, pageSize: 5 })
    expect(request.get).toHaveBeenCalledWith(BASE, { page: 1, pageSize: 5 })
  })
})
