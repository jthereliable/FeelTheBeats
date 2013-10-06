var mysql				= require("database/mysql"),
	requestable			= require("misc/requestable"),
	__					= require("underscore"),
	logger				= require("debug/logger");

var get_fields = {
	"id": {
		"default_order": true,
		"sort": 1
	},
	"name": {
		"queryable": true,
		"sort": 1,
		"type": "string"
	},
	"url": {
	},
	"user.uid": {
		"tables": [
			{
				"table": "Users",
				"on": [
					"Users.uid",
					"Artists.uid"
				]
			}
		],
		"name": "Users.uid"
	},
	"user.name": {
		"tables": [
			{
				"table": "Users",
				"on": [
					"Users.uid",
					"Artists.uid"
				]
			}
		],
		"name": "Users.name",
		"queryable": true,
		"sort": 1,
		"type": "string"
	}
};
exports.get = function(req, res) {
	requestable.collection.get(req, "Artists", null, get_fields, 25,
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