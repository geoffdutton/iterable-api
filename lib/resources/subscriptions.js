/**

  PUT    - /subscriptions/{subscriptionGroup}/{subscriptionGroupId}?action={action}
  PATCH  - /subscriptions/{subscriptionGroup}/{subscriptionGroupId}/user/{userEmail}
  PATCH  - /subscriptions/{subscriptionGroup}/{subscriptionGroupId}/byUserId/{userId}
  DELETE - /subscriptions/{subscriptionGroup}/{subscriptionGroupId}/user/{userEmail}
  DELETE - /subscriptions/{subscriptionGroup}/{subscriptionGroupId}/byUserId/{userId}

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
  const getBaseUrl = ({ subscriptionGroup, subscriptionGroupId, userEmail, userId }) => {
    let urlPath = `${BASE}/${subscriptionGroup}/${subscriptionGroupId}`
    if (userEmail) {
      urlPath += `/user/${userEmail}`
    } else {
      urlPath += `/byUserId/${userId}`
    }
    return urlPath
  }

  return {
    subscribe (data) {
      return request.patch(getBaseUrl(data))
    },

    unsubscribe (data) {
      return request.delete(getBaseUrl(data))
    }
  }
}

module.exports = subscriptionsFactory
