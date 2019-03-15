# Node Iterable API
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Build Status](https://travis-ci.org/geoffdutton/iterable-api.svg?branch=master)](https://travis-ci.org/geoffdutton/iterable-api)
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
// If param is a string, it'll append it to the resource path
// Otherwise you can just past an object that will either be
// passed to the body on a POST/PUT request, or as query
// string params in the case of a GET request
iterableInstance[<resource name>]()[<resource action>](param[, payload])

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

```
lists
	GET    - /lists
	POST   - /lists
	DELETE - /lists/{listId}
	GET    - /lists/getUsers?listId={listId}
	POST   - /lists/subscribe
	POST   - /lists/unsubscribe
	
events
	POST   - /events/track
	POST   - /events/trackBulk
    GET    - /events/{email}
    POST   - /events/trackInAppOpen
    POST   - /events/trackInAppClick
    POST   - /events/trackWebPushClick
	POST   - /events/trackConversion
	POST   - /events/trackPushOpen
	
users
	GET    - /users/{email}
	DELETE - /users/{email}
	POST   - /users/update
	POST   - /users/updateEmail
	POST   - /users/bulkUpdate
	POST   - /users/registerDeviceToken
	POST   - /users/updateSubscriptions
	GET    - /users/getByEmail/{email}
	GET    - /users/byUserId/{userId}
	DELETE - /users/byUserId/{userId}
	GET    - /users/getFields
	GET    - /users/getSentMessages
	POST   - /users/disableDevice

email
    GET    - /email/viewInBrowsers?email={email}&messageId={messageId}
    POST   - /email/target

webPush
    POST   - /webPush/target
    
inApp
    GET    - /inApp/getMessages?email={email}&count={msgCount}
    GET    - /inApp/getMessages?userId={userId}&count={msgCount}
    
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
    
messageTypes
    GET    - /messageTypes
    
experiments
    GET    - /experiments/metrics
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
