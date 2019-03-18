
function Request (apiKey) {
  if (!apiKey) {
    throw new Error('apiKey is required')
  }

  const client = require('axios').create({
    baseURL: 'https://api.iterable.com/api',
    headers: {
      'Api-Key': apiKey,
      'Content-Type': 'application/json'
    }
  })

  const makeRequest = (method, url, data) => {
    const requestConfig = {
      url,
      method: method.toLowerCase()
    }

    data = Object.assign({}, data)

    if (method === 'GET') {
      requestConfig.params = data
    } else if (Object.keys(data).length) {
      requestConfig.data = data
    }

    return client.request(requestConfig)
      .then(res => res.data)
  }

  return ['GET', 'POST', 'PUT', 'DELETE'].reduce((methods, method) => {
    methods[method.toLowerCase()] = (url, data) => {
      return makeRequest(method, url, data)
    }
    return methods
  }, {})
}

module.exports = Request
