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
		"tables": [
			{
				"table": "Users",
				"on": [
					"Users.uid",
					"GroupMembers.uid"
				]
			}
		],
		"name": "Users.name",
		"queryable": true,
		"sort": 1,
		"type": "string"
	},
	"image": {
		"tables": [
			{
				"table": "Users",
				"on": [
					"Users.uid",
					"GroupMembers.uid"
				]
			}
		],
		"name": "Users.image"
	},
	"tier": {
		"tables": [
			{
				"table": "Users",
				"on": [
					"Users.uid",
					"GroupMembers.uid"
				]
			}
		],
		"name": "Users.tier",
		"queryable": true,
		"sort": -1
	},
	"points": {
		"tables": [
			{
				"table": "Users",
				"on": [
					"Users.uid",
					"GroupMembers.uid"
				]
			}
		],
		"name": "Users.points",
		"sort": -1
	},
	"experience": {
		"tables": [
			{
				"table": "Users",
				"on": [
					"Users.uid",
					"GroupMembers.uid"
				]
			}
		],
		"name": "Users.experience",
		"sort": -1
	},
	"mod_level": {
		"tables": [
			{
				"table": "Users",
				"on": [
					"Users.uid",
					"GroupMembers.uid"
				]
			}
		],
		"name": "Users.mod_level",
		"queryable": true,
	},
	"charter_level": {
		"tables": [
			{
				"table": "Users",
				"on": [
					"Users.uid",
					"GroupMembers.uid"
				]
			}
		],
		"name": "Users.charter_level",
		"queryable": true,
	}
};
exports.get = function(req, res) {
	var gid = req.params.gid|0;
	requestable.collection.get(req, "GroupMembers", {"gid": gid}, get_fields, 25,
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