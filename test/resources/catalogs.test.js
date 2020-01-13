const factory = require('../../lib/resources/catalogs')

const BASE = '/catalogs'
const FIELD_MAPPINGS_BASE = '/catalogs/{catalogName}/fieldMappings'
const ITEMS_BASE = '/catalogs/{catalogName}/items'

const request = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn()
}
const client = factory(request)
const catalogName = 'fancy-restaurants'

describe(BASE, () => {
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
})

describe(FIELD_MAPPINGS_BASE, () => {
  it(`GET ${FIELD_MAPPINGS_BASE}`, () => {
    client.fieldMappings.get({ catalogName })
    expect(request.get).toHaveBeenCalledWith(`${BASE}/${catalogName}/fieldMappings`)
  })

  it(`PUT ${FIELD_MAPPINGS_BASE}`, () => {
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

describe(ITEMS_BASE, () => {
  it(`GET ${ITEMS_BASE}`, () => {
    const query = {
      page: 1,
      pageSize: 10,
      orderBy: 'name',
      sortAscending: false
    }
    client.items.get({ catalogName, ...query })
    expect(request.get).toHaveBeenCalledWith(`${BASE}/${catalogName}/items`, query)
  })

  it(`GET ${ITEMS_BASE}/{itemId}`, () => {
    const itemId = '1'
    client.items.getById({ catalogName, itemId })
    expect(request.get).toHaveBeenCalledWith(`${BASE}/${catalogName}/items/${itemId}`)
  })

  it(`PUT ${ITEMS_BASE}`, () => {
    const itemId = '1'
    const value = {
      value: { name: 'The Duke', isVegetarianFriendly: false }
    }
    client.items.createOrReplace({ catalogName, itemId, value })
    expect(request.put).toHaveBeenCalledWith(`${BASE}/${catalogName}/items/${itemId}`, value)
  })

  it(`PATCH ${ITEMS_BASE}`, () => {
    const itemId = '1'
    const update = {
      update: { recentlyUpdated: true }
    }
    client.items.createOrUpdate({ catalogName, itemId, update })
    expect(request.patch).toHaveBeenCalledWith(`${BASE}/${catalogName}/items/${itemId}`, update)
  })

  it(`POST ${ITEMS_BASE}`, () => {
    const data = {
      documents: {
        1: {
          name: 'The Duke',
          isVegetarianFriendly: false
        },
        2: {
          name: 'Le Chateau Rockinbleau',
          isVegetarianFriendly: true
        }
      },
      replaceUploadedFieldsOnly: true
    }
    client.items.bulkCreate({ catalogName, data })
    expect(request.post).toHaveBeenCalledWith(`${BASE}/${catalogName}/items`, data)
  })

  it(`DELETE ${ITEMS_BASE}`, () => {
    const itemIds = ['1', '2', '3']
    client.items.delete({ catalogName, itemIds })
    expect(request.delete).toHaveBeenCalledWith(`${BASE}/${catalogName}/items`, { itemIds })
  })

  it(`DELETE ${ITEMS_BASE}/{itemId}`, () => {
    const itemId = '1'
    client.items.deleteById({ catalogName, itemId })
    expect(request.delete).toHaveBeenCalledWith(`${BASE}/${catalogName}/items/${itemId}`)
  })
})
