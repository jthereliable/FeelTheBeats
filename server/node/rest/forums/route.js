var mysql				= require("database/mysql.js"),
	requestable			= require("misc/requestable.js"),
	__					= require("underscore"),
	logger				= require("debug/logger.js");


var get_fields = {
	"fid": {
		"default_order": true,
		"sort": 1
	},
	"name": {
		"queryable": true,
		"sort": 1,
		"type": "string"
	},
	"description": {
	},
	"permission.mod.view": {
		"name": "frm_Forums.view_mod_level_min",
		"ignore": true
	},
	"permission.mod.post": {
		"name": "frm_Forums.post_mod_level_min",
		"ignore": true
	},
	"permission.charter.view": {
		"name": "frm_Forums.view_charter_level_min",
		"ignore": true
	},
	"permission.charter.post": {
		"name": "frm_Forums.post_charter_level_min",
		"ignore": true
	},
	
	"last_post.id": {
		"tables": [
			{
				"table": "frm_Posts",
				"on": [
					"frm_Posts.pid",
					"frm_Forums.last_post"
				]
			}
		],
		"name": "frm_Posts.pid"
	},
	"last_post.date_posted": {
		"tables": [
			{
				"table": "frm_Posts",
				"on": [
					"frm_Posts.pid",
					"frm_Forums.last_post"
				]
			}
		],
		"name": "frm_Posts.date_posted"
	},
	"last_post.owner.uid": {
		"tables": [
			{
				"table": "frm_Posts",
				"on": [
					"frm_Posts.pid",
					"frm_Forums.last_post"
				]
			},
			{
				"table": "Users",
				"on": [
					"frm_Posts.owner",
					"Users.uid"
				]
			}
		],
		"name": "Users.uid"
	},
	"last_post.owner.name": {
		"tables": [
			{
				"table": "frm_Posts",
				"on": [
					"frm_Posts.pid",
					"frm_Forums.last_post"
				]
			},
			{
				"table": "Users",
				"on": [
					"frm_Posts.owner",
					"Users.uid"
				]
			}
		],
		"name": "Users.name"
	},
	
	"category.id": {
		"name": "frm_Forums.category"
	},
	"category.name": {
		"tables": [
			{
				"table": "frm_Categories",
				"on": [
					"frm_Categories.id",
					"frm_Forums.category"
				]
			}
		],
		"name": "frm_Categories.name",
		"type": "string",
		"queryable": true
	}
};
exports.get = function(req, res) {
	var mod_level = res.locals.token.access.mod;
	var charter_level = res.locals.token.access.charter;
	
	requestable.collection.get(req, "frm_Forums", {
		"view_mod_level_min": {
			"$lte": mod_level
		},
		"view_charter_level_min": {
			"$lte": charter_level
		},
		"hidden": 0
	}, get_fields, 25,
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