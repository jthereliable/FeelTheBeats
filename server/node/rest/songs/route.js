var mysql				= require("database/mysql.js"),
	requestable			= require("misc/requestable.js"),
	__					= require("underscore"),
	logger				= require("debug/logger.js");


var get_fields = {
	"sid": {
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
	"genres": {
		"queryable": true,
		"bit": true
	},
	"timestamp": {
		"sort": -1
	}
};
exports.get = function(req, res) {
	requestable.collection.get(req, "Songs", {"approved_owner": true, "approved_mod": true}, get_fields, 25,
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