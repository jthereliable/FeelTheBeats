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
	"scoring_criteria": {
	},
	"settings": {
	},
	"date_start": {
	},
	"date_end": {
	},
	"archived": {
		"ignore": true
	},
	
	"chart.id": {
		"tables": [
			{
				"table": "Charts",
				"on": [
					"Charts.id",
					"Tournaments.cid"
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
					"Tournaments.sid"
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
					"Tournaments.sid"
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
				"table": "Charts",
				"on": [
					"Charts.id",
					"Tournaments.sid"
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
		"name": "Songs.name"
	},
	"chart.song.image": {
		"tables": [
			{
				"table": "Charts",
				"on": [
					"Charts.id",
					"Tournaments.sid"
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
		"name": "Songs.image"
	}
};
exports.get = function(req, res) {
	var id = req.params.id|0;
	requestable.model.get(req, "Tournaments", {"id": id}, get_fields,
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