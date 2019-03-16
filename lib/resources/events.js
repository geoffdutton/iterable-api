/**

 GET    - /events/{email}
 POST   - /events/track
 POST   - /events/trackBulk
 POST   - /events/trackInAppOpen
 POST   - /events/trackInAppClick
 POST   - /events/trackWebPushClick
 POST   - /events/trackPushOpen

*/

const factory = request => {
  const BASE = '/events'

  return {
    /**
     * @param {string} email - user email of events to look up
     */
    get (email) {
      return request.get(`${BASE}/${email}`)
    },

    track ({
      email,
      eventName,
      id,
      createdAt,
      dataFields,
      userId,
      campaignId,
      templateId
    }) {
      return request.post(`${BASE}/track`, {
        email,
        eventName,
        id,
        createdAt,
        dataFields,
        userId,
        campaignId,
        templateId
      })
    },

    trackBulk ({ events }) {
      return request.post(`${BASE}/trackBulk`, { events })
    },

    trackInAppOpen (data) {
      return request.post(`${BASE}/trackInAppOpen`, data)
    },

    trackInAppClick (data) {
      return request.post(`${BASE}/trackInAppClick`, data)
    },

    trackWebPushClick (data) {
      return request.post(`${BASE}/trackWebPushClick`, data)
    },

    trackPushOpen (data) {
      return request.post(`${BASE}/trackPushOpen`, data)
    },
  }
}

module.exports = factory
