var mysql				= require("database/mysql.js"),
	requestable			= require("misc/requestable.js"),
	__					= require("underscore"),
	logger				= require("debug/logger.js");


var get_fields = {
	"id": {
		"sort": -1
	},
	"name": {
		"queryable": true,
		"sort": 1,
		"type": "string"
	},
	"date_start": {
		"default_order": true,
		"sort": -1
	},
	"date_end": {
		"sort": -1
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
		"name": "Charts.id",
		"queryable": true
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
		"name": "Charts.name",
		"queryable": true
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
		"name": "Songs.sid",
		"queryable": true
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
		"name": "Songs.name",
		"queryable": true
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
	var query = null;
	if(!req.query.archived)
	{
		query = {
			"archived": false
		};
	}
	requestable.collection.get(req, "Tournaments", query, get_fields, 25,
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