var _ = require('lodash');
var Request = require('./request');


var api = [
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
		actions: [
			{
				name: 'delete',
				method: 'post'
			}, {
				name: 'get',
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
	}
];


var Iterable = function(config){
	this.request = new Request(_.defaults(config || {}, {
		hostname: 'api.iterable.com',
		secure: true,
		path: '/api'
	}));
};

_.each(api, function(resource){

	Iterable.prototype[resource.resource] = function(){
		var self = this;
		var actions = {};
		actions = _.reduce(resource.actions, function(actions, action){

			actions[action.name] = function(){
				var data = arguments[0] || {};

				return self.request[action.method]({
					url: ['', resource.resource, action.name].join('/'),
					data: data
				});
			};
			return actions;
		}, actions);

		if(resource.method){
			actions[resource.method] = function(){
				var data = arguments[0] || {};
				return self.request[resource.method]({
					url: ['', resource.resource].join('/'),
					data: data
				});
			};
		}

		return actions;
	};
});

module.exports = Iterable;
