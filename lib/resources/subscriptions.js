/**

  PUT    - /subscriptions/{subscriptionGroup}/{subscriptionGroupId}?action={action}
  PATCH  - /subscriptions/{subscriptionGroup}/{subscriptionGroupId}/user/{userEmail}
  DELETE - /subscriptions/{subscriptionGroup}/{subscriptionGroupId}/user/{userEmail}

*/
const BASE = '/subscriptions'

const subscriptionsFactory = request => {
  return {
    user: _subscriptionsUserFactory(request),

    bulkSubscribe ({ subscriptionGroup, subscriptionGroupId, data }) {
      return request.put(`${BASE}/${subscriptionGroup}/${subscriptionGroupId}?action=subscribe`, data)
    },

    bulkUnsubscribe ({ subscriptionGroup, subscriptionGroupId, data }) {
      return request.put(`${BASE}/${subscriptionGroup}/${subscriptionGroupId}?action=unsubscribe`, data)
    }
  }
}

const _subscriptionsUserFactory = request => {
  return {
    subscribe ({ subscriptionGroup, subscriptionGroupId, userEmail }) {
      return request.patch(`${BASE}/${subscriptionGroup}/${subscriptionGroupId}/user/${userEmail}`)
    },

    unsubscribe ({ subscriptionGroup, subscriptionGroupId, userEmail }) {
      return request.delete(`${BASE}/${subscriptionGroup}/${subscriptionGroupId}/user/${userEmail}`)
    }
  }
}

module.exports = subscriptionsFactory
