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
		"string": true
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
	
	"category": {
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
		"string": true,
		"queryable": true
	}
};
exports.get = function(req, res) {
	// TODO: get mod/charter level from token
	var mod_level = 0;
	var charter_level = 0; // Set to max if mod_level > x?
	
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