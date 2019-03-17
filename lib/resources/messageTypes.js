/**

 GET    - /messageTypes

 */

const factory = request => {
  const BASE = '/messageTypes'

  return {
    get () {
      return request.get(BASE)
    }
  }
}

module.exports = factory
