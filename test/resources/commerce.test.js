
const helper = require('./helper')
const factory = require('../../lib/resources/commerce')

const BASE = '/commerce'
const email = 'some@email.com'
describe(BASE, () => {
  const request = {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn()
  }

  const client = factory(request)

  helper.resourceTest({
    BASE,
    resources: [
      {
        name: 'trackPurchase',
        expectedVal: {
          user: {
            email
          },
          items: [
            { id: 'blah' }
          ],
          total: 9.99,
          id: 'transaction-id'
        }
      },
      {
        name: 'updateCart',
        expectedVal: {
          user: {
            userId: 'jaiofjoiwe'
          },
          items: [
            { id: 'blah' }
          ]
        }
      }
    ],
    request,
    client
  })
})
