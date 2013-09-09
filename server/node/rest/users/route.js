var mysql				= require("database/mysql.js"),
	requestable			= require("misc/requestable.js"),
	__					= require("underscore"),
	logger				= require("debug/logger.js");

var get_params_order = ["uid", "name", "tier", "points", "experience"];
var get_params_query = {
	"name": {
		"string": true
	},
	"tier": {},
	"mod_level": {},
	"charter_level": {}
};
var get_params_query_string = ["name"];
exports.get = function(req, res) {
	mysql.query("SELECT `uid`, `name`, `image`, `tier`, `mod_level`, `charter_level`, `date_join`, `date_login`			\
				FROM `Users`" +
				requestable.where(req, get_params_query) +
				requestable.limits(req, get_params_order, 25),
	function(err, rows) {
		if(err)
		{
			res.json({
				"err": "MySQL Error"
			});
			return;
		}
		res.json(rows);
	});
};