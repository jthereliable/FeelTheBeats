var mysql				= require("database/mysql.js"),
	requestable			= require("misc/requestable.js"),
	__					= require("underscore"),
	logger				= require("debug/logger.js");


var get_fields = {
	"sid": {
	},
	"name": {
	},
	"description": {
	},
	"url": {
	},
	"image": {
	},
	"genres": {
	},
	"topic_id": {
	},
	"timestamp": {
	},
	"owner.uid": {
		"tables": [
			{
				"table": "Users",
				"on": [
					"Users.uid",
					"Songs.owner"
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
					"Songs.owner"
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
					"Songs.owner"
				]
			}
		],
		"name": "Users.image"
	},
	"artist.id": {
		"tables": [
			{
				"table": "Artists",
				"on": [
					"Artists.id",
					"Songs.artist"
				]
			}
		],
		"name": "Artists.id"
	},
	"artist.name": {
		"tables": [
			{
				"table": "Artists",
				"on": [
					"Artists.id",
					"Songs.artist"
				]
			}
		],
		"name": "Artists.name"
	}
};
exports.get = function(req, res) {
	var sid = req.params.sid|0;
	requestable.model.get(req, "Songs", {"sid": sid, "approved_owner": true, "approved_mod": true}, get_fields,
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