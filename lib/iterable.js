
const { padEnd } = require('./helpers')
const Request = require('./request')
const API = require('./api')

const create = apiKey => {
  const request = new Request(apiKey)
  return {
    printResources () {
      API.forEach(printResource)

      function printResource (resource) {
        const resourceName = resource.resource
        console.log(resourceName)
        printMethods(resource)
        printActions(resource)
        printSubResources(resource, resourceName)
      }

      function printMethods (resource) {
        if (!resource.methods) return
        resource.methods.forEach(method => {
          console.log(['  ', [padEnd(method.toUpperCase(), 'delete'.length), [(typeof resource.urlPrefix === 'undefined' ? '' : resource.urlPrefix), resource.resource].join('/')].join(' - ')].join(''))
        })
      }

      function printActions (resource) {
        if (!resource.actions) return
        resource.actions.forEach(action => {
          console.log(['  ', [padEnd(action.method.toUpperCase(), 'delete'.length), [(typeof resource.urlPrefix === 'undefined' ? '' : resource.urlPrefix), resource.resource, action.name].join('/')].join(' - ')].join(''))
        })
      }

      function printSubResources (resource, parentName) {
        if (typeof resource.subResources === 'undefined') return
        resource.subResources.forEach(resource => {
          const fullName = `${parentName}.${resource.resource}`
          console.log(fullName)
          printMethods(resource)
          printActions(resource)
          printSubResources(resource, fullName)
        })
      }
    },
    campaigns: require('./resources/campaigns')(request),
    catalogs: require('./resources/catalogs')(request),
    channels: require('./resources/channels')(request),
    commerce: require('./resources/commerce')(request),
    email: require('./resources/email')(request),
    events: require('./resources/events')(request),
    experiments: require('./resources/experiments')(request),
    inApp: require('./resources/inApp')(request),
    lists: require('./resources/lists')(request),
    messageTypes: require('./resources/messageTypes')(request),
    push: require('./resources/push')(request),
    sms: require('./resources/sms')(request),
    subscriptions: require('./resources/subscriptions')(request),
    users: require('./resources/users')(request),
    webPush: require('./resources/webPush')(request),
    workflows: require('./resources/workflows')(request)
  }
}

module.exports = {
  create
}
