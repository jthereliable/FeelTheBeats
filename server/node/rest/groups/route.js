var mysql				= require("database/mysql.js"),
	mysql_query_builder	= require("rest/mysql_query_builder.js"),
	Group				= require("models/community/Group.js"),
	__					= require("underscore"),
	logger				= require("debug/logger.js");

var field_settings = {
	"requestable": ["gid", "name", "description", "image", "members", "date_formed"],
	"request_default": ["gid", "name", "image", "members"],
	"where": ["name"],
	"order": ["gid", "name", "members", "date_formed"]
};

exports.get = function(req, res) {
	var query = mysql_query_builder.select_rows_request(Group, "Groups", field_settings, 25, req.query);
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