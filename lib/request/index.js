var _ = require('lodash');
var q = require('q');
var qs = require('querystring');
var _http = require('http');
var _https = require('https');

/**
	serverConfig = {
		secure: <bool, default true>,
		hostname: <string, default api.iterable.com>,
		path: <string, default /api>,
		apiKey: <string>
	}
*/
function Request(serverConfig){
	var self = this;
	serverConfig = serverConfig || {};

	if(!serverConfig.apiKey || !serverConfig.apiKey.length){
		throw new Error('apiKey is required');
	}


	var makeRequest = function(method, path, queryParams, data, options){
		queryParams = _.isPlainObject(queryParams) ? queryParams : {};
		data = _.isPlainObject(data) ? data : {};
		options = _.isPlainObject(options) ? options : {};

		var http = serverConfig.secure ? _https : _http;

		if(serverConfig.path && serverConfig.path.length){
			path = [serverConfig.path, path].join('');
		}

		if(method == 'GET'){
			queryParams = _.merge({}, data, queryParams);
		}

		queryParams = _.filter(data, function(val, key){
			return val !== undefined;
		});
		queryParams.apiKey = serverConfig.apiKey;
		if(_.keys(queryParams).length){
			path = [path, qs.stringify(queryParams)].join('?');
		}

		var requestConfig = {
			hostname: serverConfig.hostname,
			path: path,
			port: serverConfig.secure ? 443 : 80,
			method: method,
			headers: {
				'Content-Type': 'application/json'
			}
		};
		console.log(requestConfig);
		var deferred = q.defer();
		var req = http.request(requestConfig, function(res){

			var data = '';
			res.on('data', function(d){
				data += d.toString();
			});

			res.on('end', function(){
				var json;
				try {
					json = JSON.parse(data);
				} catch(e){}

				var shortCode = ~~(res.statusCode / 100);
				if(shortCode == 2){
					return deferred.resolve(json);
				}
				return deferred.reject({
					statusCode: res.statusCode,
					data: json
				});
			})
		});

		req.on('error', function(err){
			deferred.reject(err);
		});

		if(method != 'GET' && _.keys(data).length){
			req.write(JSON.stringify(data));
		}
		req.end();

		return deferred.promise;
	};


	var methods = {};
	return _.reduce(['GET', 'POST', 'PUT', 'DELETE'], function(methods, method){

		methods[method.toLowerCase()] = function(payload){
			payload = _.isPlainObject(payload) ? payload : {};

			var path = _.isString(payload.url) && payload.url.length ? payload.url : '';
			var data = payload.data || {}
			var queryParams = payload.queryParams || {};
			var options = payload.options || {};

			return makeRequest(method, path, queryParams, data, options);
		};
		return methods;
	}, methods);
};

module.exports = Request;