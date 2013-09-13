var mysql				= require("database/mysql.js"),
	mongo				= require("database/mongo.js"),
	requestable			= require("misc/requestable.js"),
	__					= require("underscore"),
	logger				= require("debug/logger.js"),
	flat				= require("flat.js"),
	async				= require("async");

var get_fields = {
	"sid": {
	},
	"name": {
	},
	"image": {
	}
};
exports.get = function(req, res) {
	var id = req.params.id|0;
	requestable.collection.get(req, "Songs", {"Songs.artist": id}, get_fields, 25,
		function(err, row) {
			if(err)
			{
				res.json({
					"err": "Database Error"
				});
				return;
			}
			res.json(row);
		}
	);
};