/**

 GET    - /catalogs

*/

const catalogsFactory = request => {
  const BASE = '/catalogs'

  return {
    get ({ page, pageSize }) {
      return request.get(BASE, { page, pageSize })
    }
  }
}

module.exports = catalogsFactory
