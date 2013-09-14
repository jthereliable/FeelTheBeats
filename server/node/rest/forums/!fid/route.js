var mysql				= require("database/mysql.js"),
	requestable			= require("misc/requestable.js"),
	__					= require("underscore"),
	logger				= require("debug/logger.js");


var get_fields = {
	"tid": {
		"sort": 1
	},
	"title": {
		"queryable": true,
		"sort": 1,
		"string": true
	},
	
	"views": {
		"sort": -1
	},
	"posts": {
		"sort": -1
	},
	
	"date_posted": {
		"sort": -1
	},
	"date_replied": {
		"default_order": true,
		"sort": -1
	},
	
	"status.locked": {
		"name": "frm_Topics.locked"
	},
	"status.locked": {
		"name": "frm_Topics.stickied"
	},
	
	"owner.uid": {
		"tables": [
			{
				"table": "Users",
				"on": [
					"frm_Topics.owner",
					"Users.uid"
				]
			}
		],
		"name": "Users.uid"
	},
	"owner.name": {
		"tables": [
			{
				"table": "Users",
				"on": [
					"frm_Topics.owner",
					"Users.uid"
				]
			}
		],
		"name": "Users.name"
	}
};
exports.get = function(req, res) {
	// TODO: get mod/charter level from token
	var mod_level = 0;
	var charter_level = 0; // Set to max if mod_level > x?
	
	requestable.collection.get(req, "frm_Topics", null, get_fields, 25,
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