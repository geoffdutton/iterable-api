
const padEnd = require('pad-end')
const Request = require('./request')
const API = require('./api')

const factory = (apiKey, request) => {
  request = request || new Request(apiKey)
  return {
    printResources () {
      API.forEach(resource => {
        console.log(resource.resource)

        if (resource.methods) {
          resource.methods.forEach(method => {
            console.log(['  ', [padEnd(method.toUpperCase(), 'delete'.length), ['', resource.resource].join('/')].join(' - ')].join(''))
          })
        }

        if (!resource.actions) {
          return
        }

        resource.actions.forEach(action => {
          console.log(['  ', [padEnd(action.method.toUpperCase(), 'delete'.length), ['', resource.resource, action.name].join('/')].join(' - ')].join(''))
        })
      })
    },
    campaigns: require('./resources/campaigns')(request),
    commerce: require('./resources/commerce')(request),
    email: require('./resources/email')(request),
    events: require('./resources/events')(request),
    experiments: require('./resources/experiments')(request),
    inApp: require('./resources/inApp')(request),
    lists: require('./resources/lists')(request),
    messageTypes: require('./resources/messageTypes')(request),
    push: require('./resources/push')(request),
    sms: require('./resources/sms')(request),
    users: require('./resources/users')(request),
    webPush: require('./resources/webPush')(request),
    workflows: require('./resources/workflows')(request)
  }
}

module.exports = factory
