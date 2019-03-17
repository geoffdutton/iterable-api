
const helper = require('./helper')
const factory = require('../../lib/resources/events')

const BASE = '/events'
const email = 'some@email.com'
describe(BASE, () => {
  const request = {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn()
  }

  const client = factory(request)

  it(`GET ${BASE}/{email}`, () => {
    client.get(email)
    expect(request.get).toHaveBeenCalledWith(`${BASE}/${email}`)
  })

  helper.resourceTest({
    BASE,
    resources: [
      {
        name: 'track',
        expectedVal: {
          email,
          eventName: 'opened'
        }
      },
      {
        name: 'trackBulk',
        expectedVal: {
          events: [
            {
              email,
              eventName: 'opened'
            }
          ]
        }
      },
      {
        name: 'trackInAppOpen',
        expectedVal: { email }
      },
      {
        name: 'trackInAppClick',
        expectedVal: { email }
      },
      {
        name: 'trackWebPushClick',
        expectedVal: { email }
      },
      {
        name: 'trackPushOpen',
        expectedVal: { email }
      }
    ],
    request,
    client
  })
})
