var mongojs			= require("mongojs"),
	settings		= require("settings.json");

exports = module.exports = (function() {
	var options = settings.database.mongo;
	
	/*
		mongojs uses mongodb-native which has a default poolSize of 5
		would need to rewrite mongojs code to introduce variable poolSize
	*/
	
	/*
	options.pool = options.pool || 1;
	options.idle = options.idle || 10000;
	*/
	
	var client = mongojs({
		"host":	options.host,
		"port":	options.port,
		"db":	options.database
	});
	
	return client;
})();