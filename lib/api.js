
module.exports = [
  {
    resource: 'lists',
    method: 'get',
    actions: [
      {
        name: 'subscribe',
        method: 'post'
      }, {
        name: 'unsubscribe',
        method: 'post'
      }
    ]
  }, {
    resource: 'events',
    actions: [
      {
        name: 'trackConversion',
        method: 'post'
      }, {
        name: 'trackPushOpen',
        method: 'post'
      }, {
        name: 'track',
        method: 'post'
      }
    ]
  }, {
    resource: 'users',
    method: 'get',
    actions: [
      {
        name: 'delete',
        method: 'post'
      }, {
        name: 'updateEmail',
        method: 'post'
      }, {
        name: 'bulkUpdate',
        method: 'post'
      }, {
        name: 'registerDeviceToken',
        method: 'post'
      }, {
        name: 'updateSubscriptions',
        method: 'post'
      }, {
        name: 'getByEmail',
        method: 'get'
      }, {
        name: 'getFields',
        method: 'get'
      }, {
        name: 'update',
        method: 'post'
      }, {
        name: 'getSentMessages',
        method: 'get'
      }, {
        name: 'disableDevice',
        method: 'post'
      }
    ]
  }, {
    resource: 'push',
    actions: [
      {
        name: 'target',
        method: 'post'
      }
    ]
  }, {
    resource: 'campaigns',
    method: 'get',
    actions: [
      {
        name: 'create',
        method: 'post'
      }, {
        name: 'create',
        method: 'post'
      }
    ]
  }, {
    resource: 'commerce',
    actions: [
      {
        name: 'trackPurchase',
        method: 'post'
      }, {
        name: 'updateCart',
        method: 'post'
      }
    ]
  }, {
    resource: 'email',
    actions: [
      {
        name: 'viewInBrowser',
        method: 'get'
      }, {
        name: 'target',
        method: 'post'
      }
    ]
  }, {
    resource: 'workflows',
    actions: [
      {
        name: 'triggerWorkflow',
        method: 'post'
      }
    ]
  }, {
    resource: 'sms',
    actions: [
      {
        name: 'target',
        method: 'post'
      }
    ]
  }
]
