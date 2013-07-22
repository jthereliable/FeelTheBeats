var mysql				= require("database/mysql.js"),
	mysql_query_builder	= require("rest/mysql_query_builder.js"),
	User				= require("models/community/User.js"),
	__					= require("underscore"),
	logger				= require("debug/logger.js");

var field_settings = {
	"requestable": ["uid", "name", "image", "tier", "mod_level", "charter_level", "date_join", "date_login"],
	"request_default": ["uid", "name", "image", "tier", "mod_level", "charter_level"],
	"where": ["name", "tier", "mod_level", "charter_level"],
	"order": ["uid", "name", "tier", "points", "experience", "mod_level", "charter_level", "date_join", "date_login"]
};

exports.get = function(req, res) {
	var query = mysql_query_builder.select_group_request(User, "Users", field_settings, 25, req.query);
	mysql.query(query, function(err, rows) {
		if(err)
		{
			logger.err(err);
			res.json({
				"success": false,
				"error": 0
			});
			return;
		}
		
		res.json(rows);
	});
};