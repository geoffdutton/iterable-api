var Iterable = require('../');

var client = new Iterable({
	apiKey: '<iterable api key>'
});

return client.lists().get()
.then(function(lists){
	console.log(lists.lists);
}, function(err){
	console.log(err);
});



