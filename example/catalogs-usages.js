const client = require('../').create(process.env.ITERABLE_API_KEY)

async function main () {
  try {
    // Creating a Catalog
    const createRes = await client.catalogs.create({ catalogName: 'fancy-restaurants' })
    console.log(createRes)
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

    // Getting a list of Catalogs
    const getRes = await client.catalogs.get({})
    console.log(getRes)
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

    // Deleting a Catalog
    const deleteRes = await client.catalogs.delete({ catalogName: 'fancy-restaurants' })
    console.log(deleteRes)
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
