var mysql				= require("database/mysql.js"),
	requestable			= require("misc/requestable.js"),
	__					= require("underscore"),
	logger				= require("debug/logger.js");


var get_fields = {
	"id": {
	},
	"name": {
	},
	"image": {
	},
	"description": {
	},
	"owned": {
	},
	"enabled": {
		"ignore": true
	},
	"conditions": {
	},
	
	"chart.id": {
		"tables": [
			{
				"table": "Charts",
				"on": [
					"Charts.id",
					"Badges.cid"
				]
			}
		],
		"name": "Charts.id"
	},
	"chart.name": {
		"tables": [
			{
				"table": "Charts",
				"on": [
					"Charts.id",
					"Badges.cid"
				]
			}
		],
		"name": "Charts.name"
	},
	"chart.song.sid": {
		"tables": [
			{
				"table": "Charts",
				"on": [
					"Charts.id",
					"Badges.cid"
				]
			},
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
	"chart.song.name": {
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
	}
};
exports.get = function(req, res) {
	var id = req.params.id|0;
	requestable.model.get(req, "Badges", {"id": id}, get_fields,
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