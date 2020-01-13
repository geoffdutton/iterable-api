/**

  GET    - /catalogs
  POST   - /catalogs
  DELETE - /catalogs
  GET    - /catalogs/{catalogName}/fieldMappings
  PUT    - /catalogs/{catalogName}/fieldMappings
  GET    - /catalogs/{catalogName}/items
  GET    - /catalogs/{catalogName}/items/{itemId}
  PUT    - /catalogs/{catalogName}/items
  POST   - /catalogs/{catalogName}/items
  POST   - /catalogs/{catalogName}/items
  PATCH  - /catalogs/{catalogName}/items
  DELETE - /catalogs/{catalogName}/items/{itemId}
  DELETE - /catalogs/{catalogName}/items

*/
const BASE = '/catalogs'

const catalogsFactory = request => {
  return {
    fieldMappings: _catalogsFieldMappingsFactory(request),
    items: _catalogsItemsFactory(request),
    get ({ page, pageSize }) {
      return request.get(BASE, { page, pageSize })
    },

    create ({ catalogName }) {
      return request.post(`${BASE}/${catalogName}`)
    },

    delete ({ catalogName }) {
      return request.delete(`${BASE}/${catalogName}`)
    }
  }
}

const _catalogsFieldMappingsFactory = request => {
  return {
    get ({ catalogName }) {
      return request.get(`${BASE}/${catalogName}/fieldMappings`)
    },

    set ({ catalogName, mappings }) {
      return request.put(`${BASE}/${catalogName}/fieldMappings`, mappings)
    }
  }
}

const _catalogsItemsFactory = request => {
  return {
    get ({ catalogName, page, pageSize, orderBy, sortAscending }) {
      return request.get(`${BASE}/${catalogName}/items`, {
        page,
        pageSize,
        orderBy,
        sortAscending
      })
    },

    getById ({ catalogName, itemId }) {
      return request.get(`${BASE}/${catalogName}/items/${itemId}`)
    },

    createOrReplace ({ catalogName, itemId, value }) {
      return request.put(`${BASE}/${catalogName}/items/${itemId}`, value)
    },

    createOrUpdate ({ catalogName, itemId, update }) {
      return request.patch(`${BASE}/${catalogName}/items/${itemId}`, update)
    },

    bulkCreate ({ catalogName, data }) {
      return request.post(`${BASE}/${catalogName}/items`, data)
    },

    delete ({ catalogName, itemIds }) {
      return request.delete(`${BASE}/${catalogName}/items`, { itemIds })
    },

    deleteById ({ catalogName, itemId }) {
      return request.delete(`${BASE}/${catalogName}/items/${itemId}`)
    }
  }
}

module.exports = catalogsFactory
