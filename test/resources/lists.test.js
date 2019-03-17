
const helper = require('./helper')
const factory = require('../../lib/resources/lists')

const BASE = '/lists'
describe(BASE, () => {
  const req = {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn()
  }
  const client = factory(req)

  it(`GET ${BASE}/{listId}`, () => {
    client.get()
    expect(req.get).toHaveBeenCalledWith(BASE)
  })

  it(`POST ${BASE}`, () => {
    client.create({
      name: 'a Cool List'
    })
    expect(req.post).toHaveBeenCalledWith(BASE, {
      name: 'a Cool List'
    })
  })

  it(`DELETE ${BASE}/{listId}`, () => {
    client.delete({ listId: 'some-list-id' })
    expect(req.delete).toHaveBeenCalledWith(`${BASE}/some-list-id`)
  })

  const resources = [
    {
      name: 'getUsers',
      method: 'get',
      expectedVal: {
        listId: 'a-list-id'
      }
    },
    {
      name: 'subscribe',
      expectedVal: {
        listId: 444,
        subscribers: []
      }
    },
    {
      name: 'unsubscribe',
      expectedVal: {
        listId: 444,
        subscribers: [],
        channelUnsubscribe: true
      }
    }
  ]

  helper.resourceTest({
    BASE,
    resources,
    request: req,
    client
  })
})
