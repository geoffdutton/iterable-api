# Node Iterable API
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Node CI](https://github.com/geoffdutton/iterable-api/actions/workflows/nodejs.yml/badge.svg)](https://github.com/geoffdutton/iterable-api/actions/workflows/nodejs.yml)
[![Coverage Status](https://coveralls.io/repos/github/geoffdutton/iterable-api/badge.svg?branch=master)](https://coveralls.io/github/geoffdutton/iterable-api?branch=master)
[![npm version](https://badge.fury.io/js/node-iterable-api.svg)](https://badge.fury.io/js/node-iterable-api)
[![Known Vulnerabilities](https://snyk.io/test/github/geoffdutton/iterable-api/badge.svg)](https://snyk.io/test/github/geoffdutton/iterable-api)

Credit: [seanmcgary/iterable](https://github.com/seanmcgary/iterable)

### Install

```
npm install node-iterable-api
```

### Example

```javascript
const client = require('node-iterable-api').create('<iterable api key>')

return client.lists.get()
  .then(res => {
    console.log(res.lists)
  })
  .catch(err => {
    console.log(err)
  })
```

### Resources

All resources are taken from those available in the [Iterable API documentation](https://app.iterable.com/api/docs).

**Note**: Not all resources are implemented yet. You can see which ones in `lib/api.js`.

Resources are addressable by calling:

```javascript
// If param is a string, it'll append it to the resource path
// Otherwise you can just past an object that will either be
// passed to the body on a POST/PUT request, or as query
// string params in the case of a GET request
iterableInstance[<resource name>][<resource action>](param[, payload])

// e.g. to get lists:
iterableInstace.lists.get()
  .then(data => {
	// data response
  })

// e.g. bulk update users
iterableInstace.users.bulkUpdate({
	users: [
        {
            email: 'foo@bar.com',
            dataFields: {
                // some data fields
            },
            userId: "someUserId"
        }
	]
})
```

Currently implemented resources are as follows:

```
lists
  GET    - /lists
  POST   - /lists
  DELETE - /lists
  GET    - /lists/getUsers
  POST   - /lists/subscribe
  POST   - /lists/unsubscribe
events
  GET    - /events
  POST   - /events/track
  POST   - /events/trackBulk
  POST   - /events/trackInAppOpen
  POST   - /events/trackInAppClick
  POST   - /events/trackWebPushClick
  POST   - /events/trackPushOpen
users
  GET    - /users
  DELETE - /users
  POST   - /users/update
  POST   - /users/updateEmail
  POST   - /users/bulkUpdate
  POST   - /users/registerDeviceToken
  POST   - /users/updateSubscriptions
  POST   - /users/bulkUpdateSubscriptions
  GET    - /users/getFields
  GET    - /users/getSentMessages
  POST   - /users/disableDevice
inApp
  GET    - /inApp/getMessages
push
  POST   - /push/target
campaigns
  POST   - /campaigns/create
commerce
  POST   - /commerce/trackPurchase
  POST   - /commerce/updateCart
email
  GET    - /email/viewInBrowser
  POST   - /email/target
workflows
  POST   - /workflows/triggerWorkflow
sms
  POST   - /sms/target
webPush
  POST   - /webPush/target
messageTypes
  GET    - /messageTypes
experiments
  GET    - /experiments/metrics
catalogs
  GET    - /catalogs
  POST   - /catalogs
  DELETE - /catalogs
catalogs.fieldMappings
  GET    - /catalogs/{catalogName}/fieldMappings
  PUT    - /catalogs/{catalogName}/fieldMappings
catalogs.items
  GET    - /catalogs/{catalogName}/items
  PUT    - /catalogs/{catalogName}/items
  POST   - /catalogs/{catalogName}/items
  PATCH  - /catalogs/{catalogName}/items
  DELETE - /catalogs/{catalogName}/items
subscriptions
  PUT    - /subscriptions
subscriptions.user
  PATCH  - /subscriptions/{subscriptionGroup}/{subscriptionGroupId}/user
  DELETE - /subscriptions/{subscriptionGroup}/{subscriptionGroupId}/user
```

### Development

To run the full tests with coverage:
```
npm test
```

To run test driven development:
```
npm run tdd
```

To list the implemented resources:
```
node index.js
```

### Contributors
- [julianmclain](https://github.com/julianmclain)
- [dpolivy](https://github.com/dpolivy)
