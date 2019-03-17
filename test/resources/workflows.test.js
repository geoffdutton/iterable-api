
const BASE = '/workflows'
const factory = require('../../lib/resources' + BASE)

describe(BASE, () => {
  const request = {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn()
  }
  const client = factory(request)

  it(`POST ${BASE}/triggerWorkflow`, () => {
    const obj = {
      workflowId: 393,
      email: 'some@email.com'
    }
    client.triggerWorkflow(obj)
    expect(request.post).toHaveBeenCalledWith(`${BASE}/triggerWorkflow`, obj)
  })
})
