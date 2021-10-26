
module.exports = [
  {
    resource: 'lists',
    methods: ['get', 'post', 'delete'],
    actions: [
      {
        name: 'getUsers',
        method: 'get'
      },
      {
        name: 'subscribe',
        method: 'post'
      },
      {
        name: 'unsubscribe',
        method: 'post'
      }
    ]
  },
  {
    resource: 'events',
    methods: ['get'],
    actions: [
      {
        name: 'track',
        method: 'post'
      },
      {
        name: 'trackBulk',
        method: 'post'
      },
      {
        name: 'trackInAppOpen',
        method: 'post'
      },
      {
        name: 'trackInAppClick',
        method: 'post'
      },
      {
        name: 'trackWebPushClick',
        method: 'post'
      },
      {
        name: 'trackPushOpen',
        method: 'post'
      }
    ]
  },
  {
    resource: 'users',
    methods: ['get', 'delete'],
    actions: [
      {
        name: 'update',
        method: 'post'
      },
      {
        name: 'updateEmail',
        method: 'post'
      },
      {
        name: 'bulkUpdate',
        method: 'post'
      },
      {
        name: 'registerDeviceToken',
        method: 'post'
      },
      {
        name: 'updateSubscriptions',
        method: 'post'
      },
      {
        name: 'getFields',
        method: 'get'
      },
      {
        name: 'getSentMessages',
        method: 'get'
      },
      {
        name: 'disableDevice',
        method: 'post'
      }
    ]
  },
  {
    resource: 'inApp',
    actions: [
      {
        name: 'getMessages',
        method: 'get'
      }
    ]
  },
  {
    resource: 'push',
    actions: [
      {
        name: 'target',
        method: 'post'
      }
    ]
  },
  {
    resource: 'campaigns',
    actions: [
      {
        name: 'create',
        method: 'post'
      }
    ]
  },
  {
    resource: 'commerce',
    actions: [
      {
        name: 'trackPurchase',
        method: 'post'
      },
      {
        name: 'updateCart',
        method: 'post'
      }
    ]
  },
  {
    resource: 'email',
    actions: [
      {
        name: 'viewInBrowser',
        method: 'get'
      },
      {
        name: 'target',
        method: 'post'
      }
    ]
  },
  {
    resource: 'workflows',
    actions: [
      {
        name: 'triggerWorkflow',
        method: 'post'
      }
    ]
  },
  {
    resource: 'sms',
    actions: [
      {
        name: 'target',
        method: 'post'
      }
    ]
  },
  {
    resource: 'webPush',
    actions: [
      {
        name: 'target',
        method: 'post'
      }
    ]
  },
  {
    resource: 'messageTypes',
    methods: ['get']
  },
  {
    resource: 'experiments',
    actions: [
      {
        name: 'metrics',
        method: 'get'
      }
    ]
  },
  {
    resource: 'catalogs',
    methods: ['get', 'post', 'delete'],
    subResources: [
      {
        resource: 'fieldMappings',
        urlPrefix: '/catalogs/{catalogName}',
        methods: ['get', 'put']
      },
      {
        resource: 'items',
        urlPrefix: '/catalogs/{catalogName}',
        methods: ['get', 'put', 'post', 'patch', 'delete']
      }
    ]
  },
  {
    resource: 'subscriptions',
    methods: ['put'],
    subResources: [
      {
        resource: 'user',
        urlPrefix: '/subscriptions/{subscriptionGroup}/{subscriptionGroupId}',
        methods: ['patch', 'delete']
      }
    ]
  }
]
