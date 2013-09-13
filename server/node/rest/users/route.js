var mysql				= require("database/mysql.js"),
	requestable			= require("misc/requestable.js"),
	__					= require("underscore"),
	logger				= require("debug/logger.js");

/*
	{
		"request.name": {
			"name": "database.name"
		}
	}
*/
var get_fields = {
	"uid": {
	},
	"name": {
	},
	"image": {
	},
	"tier": {
	},
	"points": {
	},
	"experience": {
	},
	"mod_level": {
	},
	"charter_level": {
	},
	"date_join": {
		"ignore": true
	},
	"date_login": {
		"ignore": true
	}
};
var get_where = {
	"name": {
		"string": true
	},
	"tier": {},
	"mod_level": {},
	"charter_level": {}
};
var get_order = {
	"uid": {
		"def": true
	},
	"name": {
	},
	"tier": {
		"sort": -1
	},
	"points": {
		"sort": -1
	},
	"experience": {
		"sort": -1
	},
	"date_join": {
	}
};
exports.get = function(req, res) {
	mysql.query("SELECT " + requestable.select.fields(req, get_fields) +
				"FROM `Users` " +
				requestable.select.where(req, get_where) +
				requestable.select.order(req, get_order, 25),
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