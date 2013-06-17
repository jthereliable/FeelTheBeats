var mongojs			= require("mongojs"),
	settings		= require("settings.json");

var options = settings.database.mongodb;

var pool = mongojs("mongodb://" + options.host
						+ ":" + options.port
						+ "/" + options.database
						+ "?"
						+ "&autoReconnect=true"
						+ "&poolSize=" + options.pool_size);


exports = module.exports = (function() {
	return pool;
})();