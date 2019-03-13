
const Request = require('./request')
const API = require('./api')

class Iterable {
  constructor (apiKey) {
    this.request = new Request(apiKey)
  }

  printResources () {
    API.forEach(resource => {
      console.log(resource.resource)

      if (resource.method) {
        console.log(['\t', [resource.method.toUpperCase(), ['', resource.name].join('/')].join(' - ')].join(''))
      }

      resource.actions.forEach(action => {
        console.log(['\t', [action.method.toUpperCase(), ['', resource.resource, action.name].join('/')].join(' - ')].join(''))
      })
    })
  }
}

API.forEach(resource => {
  Iterable.prototype[resource.resource] = function () {
    const actions = resource.actions.reduce((accm, action) => {
      accm[action.name] = (param, payload) => {
        let url = ['', resource.resource, action.name]

        if (typeof param === 'string') {
          url.push(param)
        } else {
          payload = param
        }

        return this.request[action.method]({
          url: url.join('/'),
          data: payload || {}
        })
      }
      return accm
    }, {})

    if (resource.method) {
      actions[resource.method] = (param, payload) => {
        let url = ['', resource.resource]

        if (typeof param === 'string') {
          url.push(param)
        } else {
          payload = param
        }

        return this.request[resource.method]({
          url: url.join('/'),
          data: payload || {}
        })
      }
    }

    return actions
  }
})

module.exports = Iterable
