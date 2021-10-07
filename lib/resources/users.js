/**

 GET    - /users
 DELETE - /users
 POST   - /users/update
 POST   - /users/updateEmail
 POST   - /users/bulkUpdate
 POST   - /users/registerDeviceToken
 POST   - /users/updateSubscriptions
 POST   - /users/bulkUpdateSubscriptions
 POST   - /users/registerBrowserToken
 GET    - /users/byUserId
 DELETE - /users/byUserId
 GET    - /users/getFields
 GET    - /users/getSentMessages
 POST   - /users/disableDevice

*/

const usersFactory = request => {
  const BASE = '/users'

  const baseRequest = ({ userId, email, method }) => {
    const url = [BASE]
    if (email) {
      url.push(email)
    } else {
      url.push('byUserId', userId)
    }
    return request[method](url.join('/'))
  }

  return {
    /**
     * @param {object|string} data
     * @returns {*}
     */
    get (data) {
      let email
      let userId
      if (typeof data === 'string') {
        email = data
      } else {
        email = data.email
        userId = data.userId
      }
      return baseRequest({ userId, email, method: 'get' })
    },

    /**
     * @param {object|string} data
     * @returns {*}
     */
    delete (data) {
      let email
      let userId
      if (typeof data === 'string') {
        email = data
      } else {
        email = data.email
        userId = data.userId
      }
      return baseRequest({ userId, email, method: 'delete' })
    },

    update ({ email, dataFields, userId, preferUserId, mergeNestedObjects }) {
      return request.post(`${BASE}/update`, {
        email,
        dataFields,
        userId,
        preferUserId,
        mergeNestedObjects
      })
    },

    updateEmail ({ currentEmail, currentUserId, newEmail }) {
      return request.post(`${BASE}/updateEmail`, {
        currentEmail,
        currentUserId,
        newEmail
      })
    },

    bulkUpdate (data) {
      return request.post(`${BASE}/bulkUpdate`, data)
    },

    registerDeviceToken (data) {
      return request.post(`${BASE}/registerDeviceToken`, data)
    },

    updateSubscriptions (data) {
      return request.post(`${BASE}/updateSubscriptions`, data)
    },

    bulkUpdateSubscriptions (data) {
      return request.post(`${BASE}/bulkUpdateSubscriptions`, data)
    },

    registerBrowserToken ({ browserToken, email, userId }) {
      return request.post(`${BASE}/registerBrowserToken`, { browserToken, email, userId })
    },

    getFields () {
      return request.get(`${BASE}/getFields`)
    },

    getSentMessages (params) {
      return request.get(`${BASE}/getSentMessages`, params)
    },

    disableDevice ({ token, email, userId }) {
      return request.post(`${BASE}/disableDevice`, { token, email, userId })
    }
  }
}

module.exports = usersFactory
