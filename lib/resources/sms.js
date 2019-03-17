/**

 POST   - /sms/target

 */

const factory = request => {
  const BASE = '/sms'

  return {
    target ({
      campaignId,
      recipientEmail,
      dataFields,
      sendAt,
      allowRepeatMarketingSends
    }) {
      return request.post(`${BASE}/target`, {
        campaignId,
        recipientEmail,
        dataFields,
        sendAt,
        allowRepeatMarketingSends
      })
    }
  }
}

module.exports = factory
