var mysql				= require("database/mysql.js"),
	requestable			= require("misc/requestable.js"),
	__					= require("underscore"),
	logger				= require("debug/logger.js");


var get_fields = {
	"id": {
	},
	"name": {
	},
	"description": {
	},
	
	"note_count": {
	},
	"hold_count": {
	},
	"mine_count": {
	},
	"trap_count": {
	},
	"effect_count": {
	},
	"keys": {
	},
	"url": {
	},
	"order": {
	},
	"plays": {
	},
	"timestamp": {
	},
	
	"rating.mod.difficulty": {
		"name": "Charts.rating_mod_difficulty"
	},
	"rating.mod.quality": {
		"name": "Charts.rating_mod_quality"
	},
	"rating.user.difficulty": {
		"name": "Charts.rating_user_difficulty"
	},
	"rating.user.quality": {
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
		"name": "Users.uid"
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
		"name": "Users.name"
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
		"name": "Songs.sid"
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
		"name": "Songs.name"
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
	var id = req.params.id|0;
	requestable.model.get(req, "Charts", {"id": id, "approved_owner": true, "approved_song": true, "approved_mod": true}, get_fields,
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