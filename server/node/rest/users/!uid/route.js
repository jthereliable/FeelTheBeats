var mysql				= require("database/mysql.js"),
	mysql_query_builder	= require("rest/mysql_query_builder.js"),
	mongo_query_builder	= require("rest/mongo_query_builder.js"),
	User				= require("models/community/User.js"),
	__					= require("underscore"),
	logger				= require("debug/logger.js"),
	flat				= require("flat.js"),
	async				= require("async");

var get_field_settings = {
	"requestable": ["uid", "name", "image", "tier", "mod_level", "charter_level", "date_join", "date_login", "ratings", "group"],
	"request_default": ["uid", "name", "image", "tier", "mod_level", "charter_level"],
	"mongo": {
		"ratings": [{
			"table": "UserRatings",
			"fields": ["rating", "reputation"],
			"where": "uid"
		}]
	},
	"where_field": "uid",
	"join_field": {
		"group": [{
			"table": "GroupMembers",
			"fields": ["position"],
			"on": ["GroupMembers.uid", "Users.uid"]
		}, {
			"table": "Groups",
			"fields": ["gid", "name", "image"],
			"on": ["GroupMembers.gid", "Groups.gid"]
		}]
	}
};
mongo_query_builder.select_row_preprocess(get_field_settings);

exports.get = function(req, res) {
	var out;
	async.series([
		function(next) {
			mysql_query_builder.select_row_request(User, "Users", get_field_settings, req.params, req.query, function(err, rows) {
				if(err)
				{
					logger.err(err);
					res.json({
						"success": false,
						"error": 0
					});
					return;
				}
				if(rows.length==0)
				{
					res.json({});
					return;
				}
				
				out = rows[0];
				next();
			});
		},
		function(next) {
			mongo_query_builder.select_row_request(User, get_field_settings, req.params, req.query, function(err, row) {
				if(err)
				{
					logger.err(err);
					res.json({
						"success": false,
						"error": 0
					});
					return;
				}
				
				__.extend(out, row);
				next();
			});
		},
		function(next) {
			out = flat.unflatten(out);
			res.json(out);
		}
	]);
};