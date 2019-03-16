/**

 GET    - /inApp/getMessages

*/

const factory = request => {
  const BASE = '/inApp'

  return {
    getMessages ({ email, userId, count }) {
      return request.get(`${BASE}/getMessages`, { email, userId, count })
    }
  }
}

module.exports = factory
