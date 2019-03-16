/**

 POST   - /webPush/target

 */

const factory = request => {
  const BASE = '/webPush'

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
