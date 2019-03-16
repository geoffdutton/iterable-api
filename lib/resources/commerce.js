/**

 POST   - /commerce/trackPurchase
 POST   - /commerce/updateCart

 */

const factory = request => {
  const BASE = '/commerce'

  return {
    trackPurchase ({
      id,
      user,
      items,
      campaignId,
      templateId,
      total,
      createdAt,
      dataFields
    }) {
      return request.post(`${BASE}/trackPurchase`, {
        id,
        user,
        items,
        campaignId,
        templateId,
        total,
        createdAt,
        dataFields
      })
    },

    updateCart ({ user, items }) {
      return request.post(`${BASE}/updateCart`, { user, items })
    }

  }
}

module.exports = factory
