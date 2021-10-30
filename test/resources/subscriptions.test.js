const factory = require('../../lib/resources/subscriptions')

const BASE = '/subscriptions'
const USER_BASE = '/subscriptions/{subscriptionGroup}/{subscriptionGroupId}/user'

const request = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  patch: jest.fn(),
  delete: jest.fn()
}
const client = factory(request)
const subscriptionGroup = 'messageChannel'
const subscriptionGroupId = '1234'
const data = {
  users: [
    'some@email.com'
  ]
}

describe(BASE, () => {
  it(`PUT ${BASE}/${subscriptionGroup}/${subscriptionGroupId}?action=subscribe`, () => {
    client.bulkSubscribe({ subscriptionGroup, subscriptionGroupId, data })
    expect(request.put).toHaveBeenCalledWith(`${BASE}/${subscriptionGroup}/${subscriptionGroupId}?action=subscribe`, data)
  })

  it(`PUT ${BASE}/${subscriptionGroup}/${subscriptionGroupId}?action=unsubscribe`, () => {
    client.bulkUnsubscribe({ subscriptionGroup, subscriptionGroupId, data })
    expect(request.put).toHaveBeenCalledWith(`${BASE}/${subscriptionGroup}/${subscriptionGroupId}?action=unsubscribe`, data)
  })
})

describe(USER_BASE, () => {
  it(`PATCH ${USER_BASE}/{userEmail}`, () => {
    const userEmail = 'some@email.com'
    client.user.subscribe({ subscriptionGroup, subscriptionGroupId, userEmail })
    expect(request.patch).toHaveBeenCalledWith(`${BASE}/${subscriptionGroup}/${subscriptionGroupId}/user/${userEmail}`)
  })

  it(`PATCH ${USER_BASE}/byUserId/{userId}`, () => {
    const userId = 'some-id'
    client.user.subscribe({ subscriptionGroup, subscriptionGroupId, userId })
    expect(request.patch).toHaveBeenCalledWith(`${BASE}/${subscriptionGroup}/${subscriptionGroupId}/byUserId/${userId}`)
  })

  it(`PATCH ${USER_BASE}/{userEmail} - userEmail takes precedence`, () => {
    const userEmail = 'some@email.com'
    const userId = 'some-id'
    client.user.subscribe({ subscriptionGroup, subscriptionGroupId, userEmail, userId })
    expect(request.patch).toHaveBeenCalledWith(`${BASE}/${subscriptionGroup}/${subscriptionGroupId}/user/${userEmail}`)
  })

  it(`DELETE ${USER_BASE}/{userEmail}`, () => {
    const userEmail = 'some@email.com'
    client.user.unsubscribe({ subscriptionGroup, subscriptionGroupId, userEmail })
    expect(request.delete).toHaveBeenCalledWith(`${BASE}/${subscriptionGroup}/${subscriptionGroupId}/user/${userEmail}`)
  })

  it(`DELETE ${USER_BASE}/byUserId/{userId}`, () => {
    const userId = 'some-id'
    client.user.unsubscribe({ subscriptionGroup, subscriptionGroupId, userId })
    expect(request.delete).toHaveBeenCalledWith(`${BASE}/${subscriptionGroup}/${subscriptionGroupId}/byUserId/${userId}`)
  })

  it(`DELETE ${USER_BASE}/{userEmail} - userEmail takes precedence`, () => {
    const userEmail = 'some@email.com'
    const userId = 'some-id'
    client.user.unsubscribe({ subscriptionGroup, subscriptionGroupId, userEmail, userId })
    expect(request.delete).toHaveBeenCalledWith(`${BASE}/${subscriptionGroup}/${subscriptionGroupId}/user/${userEmail}`)
  })
})
