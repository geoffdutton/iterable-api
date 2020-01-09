const client = require('../').create(process.env.ITERABLE_API_KEY)
async function main () {
  try {
    const catalogName = 'fancy-restaurants'
    const createRes = await client.catalogs.create({ catalogName })
    console.log('Creating a Catalog >>', createRes)
    /*

      {
        msg: '',
        code: 'Success',
        params: {
          id: 2372,
          name: 'fancy-restaurants',
          url: '/api/catalogs/fancy-restaurants'
        }
      }

     */

    const getRes = await client.catalogs.get({})
    console.log('Getting a list of Catalogs >>', getRes)
    /*

      {
        msg: '',
        code: 'Success',
        params: {
          catalogNames: [
            [Object], [Object],
            [Object], [Object],
            [Object], [Object],
            [Object], [Object],
            [Object], [Object]
          ],
          totalCatalogsCount: 21
        }
      }

     */

    const mappings = {
      mappingsUpdates: [
        {
          fieldName: 'isSteakHouse',
          fieldType: 'boolean'
        }
      ]
    }
    const setFieldMappingRes = await client.catalogs.fieldMappings.set({ catalogName, mappings })
    console.log('Setting a Catalog fieldMapping >>', setFieldMappingRes)
    /*

      { msg: '', code: 'Success', params: null }

     */

    const deleteRes = await client.catalogs.delete({ catalogName })
    console.log('Deleting a Catalog >>', deleteRes)
    /*

      {
        msg: 'Successfully deleted catalog fancy-restaurants',
        code: 'Success',
        params: null
      }

     */
  } catch (e) {
    const response = e.response
    console.log('fatality', response.status, response.data, response.config.url)
    process.exit(-1)
  }
}

main()
