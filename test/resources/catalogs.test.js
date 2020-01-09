const factory = require('../../lib/resources/catalogs')

const BASE = '/catalogs'
const catalogName = 'fancy-restaurants'

describe(BASE, () => {
  const request = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn()
  }

  const client = factory(request)

  it(`GET ${BASE}`, () => {
    client.get({ page: 1, pageSize: 5 })
    expect(request.get).toHaveBeenCalledWith(BASE, { page: 1, pageSize: 5 })
  })

  it(`POST ${BASE}/{catalogName}`, () => {
    client.create({ catalogName })
    expect(request.post).toHaveBeenCalledWith(`${BASE}/${catalogName}`)
  })

  it(`DELETE ${BASE}`, () => {
    client.delete({ catalogName })
    expect(request.delete).toHaveBeenCalledWith(`${BASE}/${catalogName}`)
  })

  it(`GET ${BASE}/{catalogName}/fieldMappings`, () => {
    client.fieldMappings.get({ catalogName })
    expect(request.get).toHaveBeenCalledWith(`${BASE}/${catalogName}/fieldMappings`)
  })

  it(`PUT ${BASE}/{catalogName}/fieldMappings`, () => {
    const mappings = {
      mappingsUpdates: [
        {
          fieldName: 'isSteakHouse',
          fieldType: 'boolean'
        }
      ]
    }
    client.fieldMappings.set({ catalogName, mappings })
    expect(request.put).toHaveBeenCalledWith(`${BASE}/${catalogName}/fieldMappings`, mappings)
  })
})
