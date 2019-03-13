# Node Iterable API
Credit: [seanmcgary](https://github.com/seanmcgary/iterable)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Build Status](https://travis-ci.org/geoffdutton/iterable-api.svg?branch=master)](https://travis-ci.org/geoffdutton/iterable-api)
[![Coverage Status](https://coveralls.io/repos/github/geoffdutton/iterable-api/badge.svg?branch=master)](https://coveralls.io/github/geoffdutton/iterable-api?branch=master)

### Install

```
npm install node-iterable-api
```

### Example

```javascript
const Iterable = require('node-iterable-api')

const client = new Iterable('<iterable api key>')

return client.lists().get()
  .then(lists => {
    console.log(lists.lists)
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

iterableInstance[<resource name>]()[<resource action>]({
	// optional data passed to resource
})

// e.g. to get lists:
iterableInstace.lists().get()
  .then(data => {
	// data response
  })

// e.g. bulk update users
iterableInstace.users().bulkUpdate({
	users: {
		email: 'foo@bar.com',
		dataFields: {
			// some data fields
		},
		userId: "someUserId"
	}
})
```

Actions and resources are as follows:

```javascript
lists
	GET -  /
	POST - /lists/subscribe
	POST - /lists/unsubscribe
events
	POST - /events/trackConversion
	POST - /events/trackPushOpen
	POST - /events/track
users
	POST - /users/delete
	POST - /users/get
	POST - /users/updateEmail
	POST - /users/bulkUpdate
	POST - /users/registerDeviceToken
	POST - /users/updateSubscriptions
	GET  - /users/getByEmail
	GET  - /users/getFields
	POST - /users/update
	GET  - /users/getSentMessages
	POST - /users/disableDevice
push
	POST - /push/target
campaigns
	GET  - /
	POST - /campaigns/create
	POST - /campaigns/create
commerce
	POST - /commerce/trackPurchase
	POST - /commerce/updateCart
email
	GET  - /email/viewInBrowser
	POST - /email/target
workflows
	POST - /workflows/triggerWorkflow
sms
    POST - /sms/target
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
