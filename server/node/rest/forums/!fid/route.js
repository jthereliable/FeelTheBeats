var mysql				= require("database/mysql.js"),
	requestable			= require("misc/requestable.js"),
	__					= require("underscore"),
	squel				= require("squel"),
	async				= require("async"),
	logger				= require("debug/logger.js");

var get_forum_fields = {
	"fid": {
	},
	"name": {
	},
	"description": {
	},
	"order_by": {
	},
	
	"permission.mod.view": {
		"name": "frm_Forums.view_mod_level_min"
	},
	"permission.mod.post": {
		"name": "frm_Forums.post_mod_level_min"
	},
	"permission.charter.view": {
		"name": "frm_Forums.view_charter_level_min"
	},
	"permission.charter.post": {
		"name": "frm_Forums.post_charter_level_min"
	},
	
	"category.id": {
		"name": "frm_Forums.category"
	},
	"category.name": {
		"tables": [
			{
				"table": "frm_Categories",
				"on": [
					"frm_Categories.id",
					"frm_Forums.category"
				]
			}
		],
		"name": "frm_Categories.name"
	}
};
/*var get_topics_fields = {
	"tid": {
		"sort": 1
	},
	"title": {
		"queryable": true,
		"sort": 1,
		"type": "string"
	},
	
	"views": {
		"sort": -1
	},
	"posts": {
		"sort": -1
	},
	
	"date_posted": {
		"sort": -1
	},
	"date_replied": {
		"default_order": true,
		"sort": -1
	},
	
	"status.locked": {
		"name": "frm_Topics.locked"
	},
	"status.locked": {
		"name": "frm_Topics.stickied"
	},
	
	"owner.uid": {
		"tables": [
			{
				"table": "Users",
				"on": [
					"frm_Topics.owner",
					"Users.uid"
				]
			}
		],
		"name": "Users.uid"
	},
	"owner.name": {
		"tables": [
			{
				"table": "Users",
				"on": [
					"frm_Topics.owner",
					"Users.uid"
				]
			}
		],
		"name": "Users.name"
	}
};*/

exports.get = function(req, res) {
	// TODO: get mod/charter level from token
	var mod_level = 0;
	var charter_level = 0; // TODO: Set to max if mod_level > x?
	
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
	
	var fid = req.params.fid|0;
	
	var out = {};
	async.series([
		function(next) {
			requestable.model.get({}, "frm_Forums", {
				"fid": fid,
				"view_mod_level_min": {
					"$lte": mod_level
				},
				"view_charter_level_min": {
					"$lte": charter_level
				}
			}, get_forum_fields,
				function(err, row) {
					if(err)
					{
						res.json({
							"err": "Database Error"
						});
						return;
					}
					if(__.isEmpty(row))
					{
						res.json({});
						return;
					}
					out.forum = row;
					next();
				}
			);
		},
		function(next) {
			var sql = squel.select()
							.field("tid")
							.field("title")
							.field("locked", "status.locked")
							.field("stickied", "status.stickied")
							.field("views")
							.field("posts")
							.field("date_posted")
							.field("date_replied")
							.field("Users.uid", "owner.uid")
							.field("Users.name", "owner.name")
							.field("moved_from", "moved.fid")
							.field("frm_Forums.name", "moved.name")
							.field("moved_date", "moved.timestamp")
						.from("frm_Topics")
							.left_join("Users", null, "frm_Topics.owner = Users.uid")
							.left_join("frm_Forums", null, "frm_Topics.moved_from = frm_Forums.fid")
						.where("frm_Topics.fid = ?", fid)
						.order("stickied", false)
						.order("date_"+out.forum.order_by, false)
						.offset(offset)
						.limit(limit)
					.toString();
			mysql.query(sql, function(err, rows) {
				if(err)
				{
					res.json({
						"err": "Database Error"
					});
					return;
				}
				out.topics = rows;
				next();
			});
		},
		function(next) {
			var sql = squel.select()
							.field("COUNT(*)", "count")
						.from("frm_Topics")
						.where("fid = ?", fid)
					.toString();
			mysql.query(sql, function(err, rows) {
				if(err)
				{
					res.json({
						"err": "Database Error"
					});
					return;
				}
				out.count = {
					"count": rows[0],
					"offset": offset,
					"limit": limit
				};
				next();
			});
		},
		function(next) {
			res.json(out);
		}
	]);
};