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
		"type": "string"
	},
	"image": {
	},
	"owned": {
		"sort": -1
	},
	"enabled": {
		"ignore": true
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
		"name": "Charts.id",
		"queryable": true
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
		"name": "Charts.name",
		"queryable": true,
		"type": "string"
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
		"name": "Songs.sid",
		"queryable": true
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
		"name": "Songs.name",
		"queryable": true,
		"type": "string"
	}
};
exports.get = function(req, res) {
	requestable.collection.get(req, "Badges", null, get_fields, 25,
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