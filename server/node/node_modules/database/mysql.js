var mysql			= require("mysql"),
	settings		= require("settings.json");

var options = settings.database.mysql;
var pool = mysql.createPool({
	"host":					options.host,
	"port":					options.port,
	"user":					options.user,
	"password":				options.password,
	"database":				options.database,
	"connectionLimit":		options.pool_size,
	
	"multipleStatements":	true			// For transactions
});

exports = module.exports = (function() {
	// TODO: Update code using new node-mysql pooling
	
	var that = {};
	
	that.destroy = function() {
		pool.end(function(err) {
			if(err)
			{
				pool.destroy();
			}
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
			pool.getConnection(function(err, connection) {
				if(err || !connection)
				{
					if(connection)
					{
						connection.destroy();
					}
					setTimeout(function() {
						retry(attempt);
					}, 50);
					return;
				}
				callback(connection);
			});
		};
		retry(0);
	};
	
	that.release = function(connection) {
		connection.end();
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
		that.acquire(function(connection) {
			if(!connection)
			{
				that.release(connection);
				callback("Could not acquire MySQL connection.", null);
				return;
			}
			connection.query(query, args, function(err, rows) {
				that.release(connection);
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
			that.acquire(function(connection) {
				if(!connection)
				{
					that.release(connection);
					return;
				}
				connection.query("ROLLBACK;", function(err, result) {
					that.release(connection);
				});
			});
		};
		out.commit = function(callback) {
			if(typeof(callback) != "function")
			{
				callback = (function() {});
			}
			that.acquire(function(connection) {
				if(!connection)
				{
					that.release(connection);
					callback("Could not acquire MySQL connection.", null);
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
					connection.query(query.query, query.args, function(err, result) {
						if(err)
						{
							that.release(connection);
							out.rollback();
							callback(err, null);
							return;
						}
						if(queries.length<=0)
						{
							that.release(connection);
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
	
	return that;
})();