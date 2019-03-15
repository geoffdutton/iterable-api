
const Iterable = require('../lib/iterable')
const API = require('../lib/api')

describe('Iterable', () => {
  let client

  beforeEach(() => {
    client = new Iterable(process.env.ITERABLE_API_KEY)
  })

  it('prints resources', () => {
    const origLog = console.log
    console.log = jest.fn()
    client.printResources()
    expect(console.log).toHaveBeenCalled()
    console.log = origLog
  })

  API.forEach(resource => {
    it(`generates ${resource.resource} from the API`, () => {
      expect(client[resource.resource]).toBeInstanceOf(Function)
      ;(resource.actions || []).forEach(action => {
        expect(client[resource.resource]()[action.name]).toBeInstanceOf(Function)
      })
    })
  })

  it('calls applicable request', () => {
    client.request.get = jest.fn()
    client.lists().get()
    expect(client.request.get).toHaveBeenLastCalledWith({
      url: '/lists',
      data: {}
    })
  })

  it('pass string payload as the last url param', () => {
    client.request.get = jest.fn()
    client.users().get('some@email.com')
    expect(client.request.get).toHaveBeenLastCalledWith({
      url: '/users/some@email.com',
      data: {}
    })
  })

  it('pass string payload as the last url param to actions', () => {
    client.request.get = jest.fn()
    client.users().getByEmail('some@email.com')
    expect(client.request.get).toHaveBeenLastCalledWith({
      url: '/users/getByEmail/some@email.com',
      data: {}
    })
  })

  it('calls applicable action request', () => {
    client.request.post = jest.fn()
    client.users().update({
      email: 'some@email.com',
      dataFields: {
        first_name: 'Bill',
        last_name: 'Richardson'
      }
    })
    expect(client.request.post).toHaveBeenLastCalledWith({
      url: '/users/update',
      data: {
        email: 'some@email.com',
        dataFields: {
          first_name: 'Bill',
          last_name: 'Richardson'
        }
      }
    })
  })

  it('handles resources with no actions', () => {
    client.request.get = jest.fn()
    client.messageTypes().get()
    expect(client.request.get).toHaveBeenLastCalledWith({
      url: '/messageTypes',
      data: {}
    })
  })
})
