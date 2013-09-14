var mysql				= require("database/mysql.js"),
	mongo				= require("database/mongo.js"),
	requestable			= require("misc/requestable.js"),
	__					= require("underscore"),
	async				= require("async"),
	squel				= require("squel"),
	logger				= require("debug/logger.js");

var sort_fields = {
	"score": "stats.score",
	"base": "stats.base",
	"completion": "stats.completion",
	"tournament.score": "tournament.score"
};
exports.get = function(req, res) {
	var sort = req.query.sort;
	var id = req.params.id|0;
	var offset = req.query.offset|0 || 0;
	var limit = req.query.limit|0 || 50;
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
		"song": 1,
		"user": 1,
		"stats": 1,
		"tournament": 1,
		"cheated": 1
	};
	query["song.chart.id"] = id;
	if(req.query.uid)
	{
		query["user.uid"] = req.query.uid|0;
	}
	if(req.query.tournament)
	{
		query["tournament.id"] = req.query.tournament|0;
	}
	if(req.query.cheated)
	{
		query["cheated"] = true;
	} else {
		query["cheated"] = false;
	}
	sorting[sort_fields[req.query.order || "score"] || sort_fields["score"]] = -1;
	async.series([
		function(next) {
			mongo.collection("Scores")
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
				res.json(rows);
			});
		},
	]);
};