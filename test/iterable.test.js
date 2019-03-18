
const Request = require('../lib/request')
const factory = require('../lib/iterable').create
jest.mock('../lib/request')

const API = require('../lib/api')

describe('Iterable', () => {
  let client
  let request

  beforeEach(() => {
    request = Request.__testMethods
    client = factory(process.env.ITERABLE_API_KEY)
  })

  it('mocks request', () => {
    expect(Request.__testMethods.get).toBeDefined()
    expect(Request.__testMethods.post).toBeDefined()
    expect(Request.__testMethods.delete).toBeDefined()
  })

  it('prints resources', () => {
    const origLog = console.log
    console.log = jest.fn()
    client.printResources()
    expect(console.log).toHaveBeenCalled()
    console.log = origLog
  })

  describe('API validator', () => {
    API.forEach(resource => {
      it(`generates ${resource.resource} from the API`, done => {
        expect(client[resource.resource]).toBeInstanceOf(Object)
        ;(resource.actions || []).forEach(action => {
          if (!client[resource.resource][action.name]) {
            return done(new Error(`${resource.resource} is missing ${action.name}`))
          }
          expect(client[resource.resource][action.name]).toBeInstanceOf(Function)
        })
        done()
      })
    })
  })

  it('calls applicable request', () => {
    client.lists.get()
    expect(request.get).toHaveBeenLastCalledWith('/lists')
  })

  it('pass string payload as the last url param', () => {
    client.users.get('some@email.com')
    expect(request.get).toHaveBeenLastCalledWith('/users/some@email.com')
  })

  it('calls applicable action request', () => {
    client.users.update({
      email: 'some@email.com',
      dataFields: {
        first_name: 'Bill',
        last_name: 'Richardson'
      }
    })
    expect(request.post).toHaveBeenLastCalledWith('/users/update', {
      email: 'some@email.com',
      dataFields: {
        first_name: 'Bill',
        last_name: 'Richardson'
      }
    })
  })

  it('handles resources with no actions', () => {
    client.messageTypes.get()
    expect(request.get).toHaveBeenLastCalledWith('/messageTypes')
  })
})
