/**

 GET    - /email/viewInBrowser
 POST   - /email/target

 */

const factory = request => {
  const BASE = '/email'

  return {
    viewInBrowser ({ email, messageId }) {
      return request.get(`${BASE}/viewInBrowser`, {
        email,
        messageId
      })
    },

    target ({ campaignId, recipientEmail, dataFields, sendAt, allowRepeatMarketingSends, metadata }) {
      return request.post(`${BASE}/target`, {
        campaignId,
        recipientEmail,
        dataFields,
        sendAt,
        allowRepeatMarketingSends,
        metadata
      })
    }
  }
}

module.exports = factory
