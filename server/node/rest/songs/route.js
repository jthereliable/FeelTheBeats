var mysql				= require("database/mysql.js"),
	requestable			= require("misc/requestable.js"),
	__					= require("underscore"),
	logger				= require("debug/logger.js");


var get_fields = {
	"sid": {
		"default_order": true,
		"sort": 1
	},
	"name": {
		"queryable": true,
		"sort": 1,
		"string": true
	},
	"image": {
	},
	"genres": {
		"queryable": true,
		"bit": true
	},
	"timestamp": {
		"sort": -1,
		"ignore": true
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
		"name": "Users.uid",
		"queryable": true
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
		"name": "Users.name",
		"queryable": true
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
		"name": "Artists.id",
		"queryable": true,
		"string": true
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
		"name": "Artists.name",
		"queryable": true,
		"string": true
	}
};
exports.get = function(req, res) {
	requestable.collection.get(req, "Songs", {"approved_owner": true, "approved_mod": true}, get_fields, 25,
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