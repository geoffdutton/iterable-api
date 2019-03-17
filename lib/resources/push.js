/**

 POST    - /push/target

*/

const factory = request => {
  const BASE = '/push'

  return {
    target ({
      campaignId,
      recipientEmail,
      dataFields,
      sendAt,
      allowRepeatMarketingSends,
      metadata
    }) {
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
