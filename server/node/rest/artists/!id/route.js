var mysql				= require("database/mysql.js"),
	mongo				= require("database/mongo.js"),
	requestable			= require("misc/requestable.js"),
	__					= require("underscore"),
	logger				= require("debug/logger.js"),
	flat				= require("flat.js"),
	async				= require("async");

var get_fields = {
	"id": {
	},
	"name": {
	},
	"url": {
	},
	"description": {
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
		"name": "Users.name"
	}
};
exports.get = function(req, res) {
	var id = req.params.id|0;
	requestable.model.get(req, "Artists", {"id": id}, get_fields,
		function(err, row) {
			if(err)
			{
				res.json({
					"err": "Database Error"
				});
				return;
			}
			res.json(row);
		}
	);
};