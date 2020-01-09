/**

 GET    - /catalogs
 POST   - /catalogs
 DELETE - /catalogs
 GET    - /catalogs/{catalogName}/fieldMappings
 PUT    - /catalogs/{catalogName}/fieldMappings

*/
const BASE = '/catalogs'

const catalogsFactory = request => {
  return {
    fieldMappings: _catalogsFieldMappingsFactory(request),
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

module.exports = catalogsFactory
