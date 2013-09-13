var mysql				= require("database/mysql.js"),
	mongo				= require("database/mongo.js"),
	requestable			= require("misc/requestable.js"),
	__					= require("underscore"),
	logger				= require("debug/logger.js"),
	flat				= require("flat.js"),
	async				= require("async");

var get_fields = {
	"gid": {
	},
	"name": {
	},
	"image": {
	},
	"description": {
	},
	"members": {
	},
	"date_formed": {
	},
	"owner.uid": {
		"name": "Groups.owner"
	},
	"owner.name": {
		"tables": [
			{
				"table": "Users",
				"on": [
					"Users.uid",
					"Groups.owner"
				]
			}
		],
		"name": "Users.name"
	},
	"owner.image": {
		"tables": [
			{
				"table": "Users",
				"on": [
					"Users.uid",
					"Groups.owner"
				]
			}
		],
		"name": "Users.image"
	}
};
exports.get = function(req, res) {
	var gid = req.params.gid|0;
	requestable.model.get(req, "Groups", {"gid": gid}, get_fields,
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