/**

 GET    - /experiments/metrics

 */

const factory = request => {
  const BASE = '/experiments'

  return {
    metrics ({ experimentId, campaignId, startDateTime, endDateTime }) {
      return request.get(`${BASE}/metrics`, {
        experimentId,
        campaignId,
        startDateTime,
        endDateTime
      })
    }
  }
}

module.exports = factory
