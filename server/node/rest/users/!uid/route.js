var mysql				= require("database/mysql.js"),
	mongo				= require("database/mongo.js"),
	requestable			= require("misc/requestable.js"),
	__					= require("underscore"),
	logger				= require("debug/logger.js"),
	flat				= require("flat.js"),
	async				= require("async");

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
	},
	"date_login": {
	},
	"group.gid": {
		"tables": [
			{
				"table": "GroupMembers",
				"on": [
					"Users.uid",
					"GroupMembers.uid"
				]
			},
			{
				"table": "Groups",
				"on": [
					"GroupMembers.gid",
					"Groups.gid"
				]
			}
		],
		"name": "Groups.name"
	},
	"group.name": {
		"tables": [
			{
				"table": "GroupMembers",
				"on": [
					"Users.uid",
					"GroupMembers.uid"
				]
			},
			{
				"table": "Groups",
				"on": [
					"GroupMembers.gid",
					"Groups.gid"
				]
			}
		],
		"name": "Groups.name"
	},
	"group.image": {
		"tables": [
			{
				"table": "GroupMembers",
				"on": [
					"Users.uid",
					"GroupMembers.uid"
				]
			},
			{
				"table": "Groups",
				"on": [
					"GroupMembers.gid",
					"Groups.gid"
				]
			}
		],
		"name": "Groups.image"
	},
	"ratings.reputation": {
		"collection": "UserRatings",
		"name": "reputation"
	},
	"ratings.rating": {
		"collection": "UserRatings",
		"name": "rating"
	}
};
exports.get = function(req, res) {
	var uid = req.params.uid|0;
	requestable.model.get(req, "Users", {"uid": uid}, get_fields,
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