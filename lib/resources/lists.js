/**

 GET    - /lists
 POST   - /lists
 DELETE - /lists
 GET    - /lists/getUsers
 POST   - /lists/subscribe
 POST   - /lists/unsubscribe

*/

const listsFactory = request => {
  const BASE = '/lists'

  return {
    create ({ name }) {
      return request.post(BASE, { name })
    },

    get () {
      return request.get(BASE)
    },

    delete ({ listId }) {
      return request.delete(`${BASE}/${listId}`)
    },

    getUsers (data) {
      return request.get(`${BASE}/getUsers`, data)
    },

    subscribe ({ listId, subscribers }) {
      return request.post(`${BASE}/subscribe`, { listId, subscribers })
    },

    unsubscribe ({ listId, subscribers, campaignId, channelUnsubscribe }) {
      return request.post(`${BASE}/unsubscribe`, { listId, subscribers, campaignId, channelUnsubscribe })
    }
  }
}

module.exports = listsFactory
