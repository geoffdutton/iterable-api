const client = require('../').create(process.env.ITERABLE_API_KEY)
async function main () {
  try {
    const catalogName = 'restuarants'
    const createRes = await client.catalogs.create({ catalogName })
    console.log('Create a Catalog >>', createRes)
    /*

      {
        msg: '',
        code: 'Success',
        params: {
          id: 2372,
          name: 'restuarants',
          url: '/api/catalogs/restuarants'
        }
      }

     */

    const getRes = await client.catalogs.get({})
    console.log('Get a list of Catalogs >>', JSON.stringify(getRes, null, 2))
    /*

      {
        "msg": "",
        "code": "Success",
        "params": {
          "catalogNames": [
            {
              "name": "restuarants"
            },
            {
              "name": "campsites"
            },
            {
              "name": "keyTest"
            }
          ],
          "totalCatalogsCount": 3
        }
      }

     */

    const mappings = {
      mappingsUpdates: [
        {
          fieldName: 'name',
          fieldType: 'string'
        }
      ]
    }
    const setFieldMappingRes = await client.catalogs.fieldMappings.set({ catalogName, mappings })
    console.log('Set a Catalog\'s fieldMappings >>', setFieldMappingRes)
    /*

      { msg: '', code: 'Success', params: null }

     */

    const getFieldMappingsRes = await client.catalogs.fieldMappings.get({ catalogName })
    console.log('Get a Catalog\'s fieldMappings >>', getFieldMappingsRes)
    /*

      {
        msg: '',
        code: 'Success',
        params: { definedMappings: { isSteakHouse: 'boolean' }, undefinedFields: [] }
      }

     */

    const value = {
      value: { name: 'The Duke', isVegetarianFriendly: false }
    }
    const createOrReplaceRes = await client.catalogs.items.createOrReplace({ catalogName, itemId: '1', value })
    console.log('Create or replace a Catalog item >>', createOrReplaceRes)
    /*

      {
        msg: '',
        code: 'Success',
        params: {
          catalogName: 'restuarants',
          itemId: '1',
          url: '/api/catalogs/restuarants/items/1'
        }
      }

    */
    const update = {
      update: { recentlyUpdated: true }
    }
    const createOrUpdateRes = await client.catalogs.items.createOrUpdate({
      catalogName,
      itemId: '1',
      update
    })
    console.log('Create or update a Catalog item >>', createOrUpdateRes)
    /*

      {
        msg: '',
        code: 'Success',
        params: {
          catalogName: 'restuarants',
          itemId: '1',
          url: '/api/catalogs/restuarants/items/1'
        }
      }

    */

    const data = {
      documents: {
        2: {
          name: 'Le Chateau Rockinbleau',
          isVegetarianFriendly: true
        },
        3: {
          name: 'Bronto King'
        }
      },
      replaceUploadedFieldsOnly: true
    }
    const bulkCreateRes = await client.catalogs.items.bulkCreate({ catalogName, data })
    console.log('Bulk create Catalog items >>', bulkCreateRes)
    /*

      {
        msg: 'Request to bulk-upload documents into restuarants processed successfully',
        code: 'Success',
        params: null
      }

    */

    const query = {
      catalogName,
      page: 1,
      pageSize: 5,
      orderBy: 'name',
      sortAscending: false
    }
    const getItemsRes = await client.catalogs.items.get(query)
    console.log('Get Catalog\'s items >>', JSON.stringify(getItemsRes, null, 2))
    /*

      {
        "msg": "",
        "code": "Success",
        "params": {
          "catalogItemsWithProperties": [
            {
              "catalogName": "restuarants",
              "itemId": "1",
              "size": 72,
              "lastModified": 1578605542000,
              "value": {
                "name": "The Duke",
                "isVegetarianFriendly": false,
                "recentlyUpdated": true
              }
            },
            {
              "catalogName": "restuarants",
              "itemId": "3",
              "size": 22,
              "lastModified": 1578605545000,
              "value": {
                "name": "Bronto King"
              }
            }
          ],
          "totalItemsCount": 2
        }
      }

     */

    const getByIdRes = await client.catalogs.items.getById({ catalogName, itemId: '1' })
    console.log('Get a Catalog item by Id >>', getByIdRes)
    /*

      {
        msg: '',
        code: 'Success',
        params: {
          catalogName: 'restuarants',
          itemId: '1',
          size: 72,
          lastModified: 1578604154000,
          value: {
            name: 'The Duke',
            isVegetarianFriendly: false,
            recentlyUpdated: true
          }
        }
      }

    */

    const deleteItemById = await client.catalogs.items.deleteById({ catalogName, itemId: '1' })
    console.log('Delete a Catalog item by id >>', deleteItemById)
    /*

      {
        msg: 'Received request to deleted item ID 3 from catalog restuarants',
        code: 'Success',
        params: null
      }

    */

    const deleteItemsRes = await client.catalogs.items.delete({ catalogName, itemIds: ['2', '3'] })
    console.log('Delete Catalog items >>', deleteItemsRes)
    /*

      {
        msg: 'Successfully received request to delete 2 items from catalog restuarants',
        code: 'Success',
        params: null
      }

    */

    const deleteRes = await client.catalogs.delete({ catalogName })
    console.log('Deleting a Catalog >>', deleteRes)
    /*

      {
        msg: 'Successfully deleted catalog restuarants',
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
