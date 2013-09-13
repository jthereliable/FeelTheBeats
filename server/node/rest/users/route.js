var mysql				= require("database/mysql.js"),
	requestable			= require("misc/requestable.js"),
	__					= require("underscore"),
	logger				= require("debug/logger.js");


var get_fields = {
	"uid": {
		"default_order": true,
		"sort": 1
	},
	"name": {
		"queryable": true,
		"sort": 1,
		"string": true
	},
	"image": {
	},
	"tier": {
		"queryable": true,
		"sort": -1
	},
	"points": {
		"sort": -1
	},
	"experience": {
		"sort": -1
	},
	"mod_level": {
		"queryable": true,
	},
	"charter_level": {
		"queryable": true,
	},
	"date_join": {
		"sort": 1,
		"ignore": true
	},
	"date_login": {
		"ignore": true
	}
};
exports.get = function(req, res) {
	requestable.collection.get(req, "Users", null, get_fields, 25,
		function(err, rows) {
			if(err)
			{
				res.json({
					"err": "Database Error"
				});
				return;
			}
			res.json(rows);
		}
	);
};