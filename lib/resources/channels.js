/**

  GET    - /channels

*/
const BASE = '/channels'

const channelsFactory = request => {
  return {
    get () {
      return request.get(BASE)
    }
  }
}

module.exports = channelsFactory
