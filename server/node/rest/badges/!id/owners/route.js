var mysql				= require("database/mysql.js"),
	mongo				= require("database/mongo.js"),
	requestable			= require("misc/requestable.js"),
	__					= require("underscore"),
	async				= require("async"),
	squel				= require("squel"),
	logger				= require("debug/logger.js");


exports.get = function(req, res) {
	var id = req.params.id|0;
	var offset = req.query.offset|0 || 0;
	var limit = req.query.limit|0 || 25;
	if(offset < 0)
	{
		offset = 0;
	}
	if(limit < 1)
	{
		limit = 1;
	}
	if(limit > 50)
	{
		limit = 50;
	}
	
	var query = {}, sorting = {}, fields = {
		"_id": 0,
		"uid": 1,
		"timestamp": 1
	};
	query["badges."+id] = {
		"$exists": true
	};
	sorting["badges."+id+".timestamp"] = 1;
	fields["badges."+id+".timestamp"] = 1;
	
	var timestamps = {};
	async.series([
		function(next) {
			mongo.collection("UserBadges")
				.find(query, fields)
				.sort(sorting)
				.limit(limit)
				.skip(offset)
				.toArray(function(err, rows) {
				if(err)
				{
					res.json({
						"err": "Database error"
					});
					return;
				}
				if(rows.length == 0)
				{
					res.json([]);
					return;
				}
				rows.forEach(function(elem) {
					timestamps[elem.uid] = elem.badges[id].timestamp;
				});
				next();
			});
		},
		function(next) {
			var sql = squel.select().field("uid").field("name").field("image").from("Users").where("uid IN ?", __.keys(timestamps)).toString();
			mysql.query(sql, function(err, rows) {
				if(err)
				{
					res.json({
						"err": "Database error"
					});
					return;
				}
				rows.forEach(function(row) {
					row.timestamp = timestamps[row.uid];
				});
				rows = __.sortBy(rows, "timestamp");
				res.json(rows);
			});
		}
	]);
};