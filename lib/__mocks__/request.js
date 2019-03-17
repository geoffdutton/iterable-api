
const reqMethods = {
  get: jest.fn().mockResolvedValue({}),
  post: jest.fn().mockResolvedValue({}),
  delete: jest.fn().mockResolvedValue({})
}

function Request () {}

Object.keys(reqMethods).forEach(method => {
  Request.prototype[method] = reqMethods[method]
})

Request.__testMethods = reqMethods

module.exports = Request
