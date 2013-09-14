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
		"string": true
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
	
	var offset = 0; // TODO: Get from req.query
	var limit = 50; // TODO: Get from req.query
	
	var fid = req.params.fid|0;
	
	var out = {};
	async.series([
		function(next) {
			requestable.model.get({}, "frm_Forums", {
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
			// TODO: moved_from, moved_date fields (need to left join forums)
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
						.from("frm_Topics")
							.left_join("Users", null, "frm_Topics.owner = Users.uid")
						.where("fid = ?", fid)
						.order("stickied", false)
						.order("date_"+out.forum.order_by, false)
						.offset(offset)
						.limit(limit)
					.toString();
			mysql.query(sql, function(err, rows) {
				if(err)
				{
					res.json({
						"err": "Database Error",
						"_err": err
					});
				}
				out.topics = rows;
				next();
			});
		},
		function(next) {
			res.json(out);
		}
	]);
	
	/*requestable.collection.get(req, "frm_Topics", null, get_fields, 25,
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
	);*/
};