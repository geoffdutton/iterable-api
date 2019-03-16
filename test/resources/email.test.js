
const helper = require('./helper')
const factory = require('../../lib/resources/email')

const BASE = '/email'
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
        name: 'viewInBrowser',
        method: 'get',
        expectedVal: {
          email,
          messageId: 1111
        }
      },
      {
        name: 'target',
        expectedVal: {
          campaignId: 20992,
          recipientEmail: email
        }
      }
    ],
    request,
    client
  })
})
