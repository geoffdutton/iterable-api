
const helper = require('./helper')
const factory = require('../../lib/resources/users')

const BASE = '/users'
describe(BASE, () => {
  const request = {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn()
  }

  const client = factory(request)

  it(`GET ${BASE}/{email}`, () => {
    client.get({ email: 'some@email.com' })
    expect(request.get).toHaveBeenCalledWith('/users/some@email.com')
  })

  it(`GET ${BASE}/byUserId/{userId}`, () => {
    client.get({ userId: 'some-id' })
    expect(request.get).toHaveBeenCalledWith('/users/byUserId/some-id')
  })

  it(`DELETE ${BASE}/{email}`, () => {
    client.delete({ email: 'some@email.com' })
    expect(request.delete).toHaveBeenCalledWith('/users/some@email.com')
    client.delete('some@email.com')
    expect(request.delete).toHaveBeenCalledWith('/users/some@email.com')
  })

  it(`DELETE ${BASE}/byUserId/{userId}`, () => {
    client.delete({ userId: 'some-id' })
    expect(request.delete).toHaveBeenCalledWith('/users/byUserId/some-id')
  })

  const resources = [
    {
      name: 'update',
      expectedVal: {
        email: 'some@email.com',
        dataFields: {},
        userId: 'some-id'
      }
    },
    {
      name: 'updateEmail',
      expectedVal: {
        currentEmail: 'some@email.com',
        newEmail: 'new@email.com'
      }
    },
    {
      name: 'bulkUpdate',
      expectedVal: {
        users: [
          { update: 'objects' }
        ]
      }
    },
    {
      name: 'registerDeviceToken',
      expectedVal: {
        email: 'string',
        device: {
          token: 'ioio4jo3nfi3o9090j0re9',
          platform: 'APNS',
          applicationName: 'My App',
          dataFields: {}
        }
      }
    },
    {
      name: 'updateSubscriptions',
      expectedVal: {
        userId: 'some-user-id',
        emailListIds: [
          0
        ],
        unsubscribedChannelIds: [
          0
        ],
        unsubscribedMessageTypeIds: [
          0
        ],
        campaignId: 0,
        templateId: 0
      }
    },
    {
      name: 'bulkUpdateSubscriptions',
      expectedVal: {
        updateSubscriptionsRequests: [
          {
            userId: 'some-user-id',
            emailListIds: [
              0
            ],
            unsubscribedChannelIds: [
              0
            ],
            unsubscribedMessageTypeIds: [
              0
            ],
            campaignId: 0,
            templateId: 0
          }
        ]
      }
    },
    {
      name: 'registerBrowserToken',
      expectedVal: {
        email: 'some@email.com',
        browserToken: 'some-token-id'
      }
    },
    {
      name: 'getFields',
      expectedVal: undefined,
      method: 'get'
    },
    {
      name: 'getSentMessages',
      expectedVal: {
        email: 'some@email.com',
        campaignId: 223
      },
      method: 'get'
    },
    {
      name: 'disableDevice',
      expectedVal: {
        email: 'some@email.com',
        token: 'some-token-id'
      }
    }
  ]

  helper.resourceTest({
    BASE,
    request,
    resources,
    client
  })
})
