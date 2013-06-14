var mysql			= require("mysql"),
	settings		= require("settings.json");

exports = module.exports = (function() {
	// TODO: Update code using new node-mysql pooling
	
	
	/*var options = settings.database.mysql;
	
	options.pool = options.pool || 1;
	options.idle = options.idle || 10000;
	
	var pool = generic_pool.Pool({
		"name":		"mysql",
		"create": function(callback) {
			var client = mysql.createConnection({
				"host":		options.host,
				"port":		options.port,
				"user": 	options.user,
				"password":	options.password,
				"database":	options.database
			});
			client.on("error", function(err) {
				if(!err.fatal)
				{
					return;
				}
				pool.destroy(client);
			});
			callback(null, client);
		},
		"destroy": function(client) {
			client.end(function(err) {
				client.destroy();
			});
		},
		"max":					options.pool,
		"idleTimeoutMillis":	options.idle,
		"log":					false
	});
	
	var that = {};
	
	that.destroy = function() {
		pool.drain(function() {
			pool.destroyAllNow();
		});
		that = null;
	};
	that.acquire = function(callback) {
		var retry = function(attempt) {
			if(attempt++>=10)
			{
				callback(null);
				return;
			}
			pool.acquire(function(err, client) {
				if(err || !client)
				{
					if(client)
					{
						pool.destroy(client);
					}
					setTimeout(function() {
						retry(attempt);
					}, 50);
					return;
				}
				callback(client);
			});
		};
		retry(0);
	};
	that.release = function(client) {
		pool.release(client);
	};
	that.query = function(query, args, callback) {
		if(typeof(args) == "function")
		{
			callback = args;
			args = [];
		}
		if(typeof(callback) != "function")
		{
			callback = (function() {});
		}
		if(!(args instanceof Array))
		{
			args = [];
		}
		that.acquire(function(client) {
			if(!client)
			{
				that.release(client);
				callback("Could not acquire MySQL client.", null);
				return;
			}
			client.query(query, args, function(err, rows) {
				that.release(client);
				if(err)
				{
					callback(err, null);
					return;
				}
				callback(null, rows);
			});
		});
	};
	that.transaction = function() {
		var out = {};
		var queries = [];
		out.query = function(query, args) {
			if(!(args instanceof Array))
			{
				args = [];
			}
			queries.push({
				"query": query,
				"args": args
			});
			return out;
		};
		out.rollback = function() {
			that.acquire(function(client) {
				if(!client)
				{
					that.release(client);
					return;
				}
				client.query("ROLLBACK;", function(err, result) {
					that.release(client);
				});
			});
		};
		out.commit = function(callback) {
			if(typeof(callback) != "function")
			{
				callback = (function() {});
			}
			that.acquire(function(client) {
				if(!client)
				{
					that.release(client);
					callback("Could not acquire MySQL client.", null);
					return;
				}
				queries.unshift({
					"query": "START TRANSACTION;",
					"args": []
				});
				queries.push({
					"query": "COMMIT;",
					"args": []
				});
				
				function runQueries()
				{
					var query = queries.shift();
					client.query(query.query, query.args, function(err, result) {
						if(err)
						{
							that.release(client);
							out.rollback();
							callback(err, null);
							return;
						}
						if(queries.length<=0)
						{
							that.release(client);
							callback(null, result);
							return;
						}
						runQueries();
					});
				}
				runQueries();
			});
		};
		
		return out;
	};
	
	return that;*/
})();