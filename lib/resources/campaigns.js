/**

 POST   - /campaigns/create
 GET    - /campaigns

*/

const factory = request => {
  const BASE = '/campaigns'

  return {
    create ({
      name,
      listIds,
      templateId,
      suppressionListIds,
      sendAt,
      sendMode,
      startTimeZone,
      defaultTimeZone,
      dataFields
    }) {
      return request.post(`${BASE}/create`, {
        name,
        listIds,
        templateId,
        suppressionListIds,
        sendAt,
        sendMode,
        startTimeZone,
        defaultTimeZone,
        dataFields
      })
    },

    get () {
      return request.get(BASE)
    }
  }
}

module.exports = factory
