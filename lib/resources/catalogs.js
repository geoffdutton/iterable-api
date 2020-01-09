/**

 GET    - /catalogs
 POST   - /catalogs
 DELETE - /catalogs

*/

const catalogsFactory = request => {
  const BASE = '/catalogs'

  return {
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

module.exports = catalogsFactory
