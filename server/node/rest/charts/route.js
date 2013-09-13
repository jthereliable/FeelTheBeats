var mysql				= require("database/mysql.js"),
	requestable			= require("misc/requestable.js"),
	__					= require("underscore"),
	logger				= require("debug/logger.js");


var get_fields = {
	"id": {
		"default_order": true,
		"sort": 1
	},
	"name": {
		"queryable": true,
		"sort": 1,
		"string": true
	},
	"note_count": {
		"ignore": true
	},
	"hold_count": {
		"ignore": true
	},
	"mine_count": {
		"ignore": true
	},
	"trap_count": {
		"ignore": true
	},
	"effect_count": {
		"ignore": true
	},
	"order": {
		"ignore": true
	},
	"keys": {
		"queryable": true,
		"ignore": true
	},
	"plays": {
		"sort": -1
	},
	"timestamp": {
		"sort": -1,
		"ignore": true
	},
	
	"rating.mod.difficulty": {
		"sort": 1,
		"name": "Charts.rating_mod_difficulty"
	},
	"rating.mod.quality": {
		"sort": -1,
		"name": "Charts.rating_mod_quality"
	},
	"rating.user.difficulty": {
		"sort": 1,
		"name": "Charts.rating_user_difficulty"
	},
	"rating.user.quality": {
		"sort": -1,
		"name": "Charts.rating_user_quality"
	},
	
	"owner.uid": {
		"tables": [
			{
				"table": "Users",
				"on": [
					"Users.uid",
					"Charts.owner"
				]
			}
		],
		"name": "Users.uid",
		"queryable": true
	},
	"owner.name": {
		"tables": [
			{
				"table": "Users",
				"on": [
					"Users.uid",
					"Charts.owner"
				]
			}
		],
		"name": "Users.name",
		"queryable": true
	},
	
	"song.sid": {
		"tables": [
			{
				"table": "Songs",
				"on": [
					"Songs.sid",
					"Charts.sid"
				]
			}
		],
		"name": "Songs.sid",
		"queryable": true
	},
	"song.name": {
		"tables": [
			{
				"table": "Songs",
				"on": [
					"Songs.sid",
					"Charts.sid"
				]
			}
		],
		"name": "Songs.name",
		"queryable": true,
		"string": true
	},
	"song.image": {
		"tables": [
			{
				"table": "Songs",
				"on": [
					"Songs.sid",
					"Charts.sid"
				]
			}
		],
		"name": "Songs.image"
	}
};
exports.get = function(req, res) {
	requestable.collection.get(req, "Charts", {"approved_owner": true, "approved_song": true, "approved_mod": true}, get_fields, 25,
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