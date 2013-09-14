var mysql				= require("database/mysql.js"),
	requestable			= require("misc/requestable.js"),
	__					= require("underscore"),
	squel				= require("squel"),
	async				= require("async"),
	logger				= require("debug/logger.js");

var get_topic_fields = {
	"tid": {
	},
	"title": {
	},
	
	"views": {
	},
	"posts": {
	},
	
	"date_posted": {
	},
	"date_replied": {
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
	},
	
	"forum.fid": {
		"name": "frm_Topics.fid"
	},
	"forum.name": {
		"tables": [
			{
				"table": "frm_Forums",
				"on": [
					"frm_Forums.fid",
					"frm_Topics.fid"
				]
			}
		],
		"name": "frm_Forums.name",
		"unignoreable": true
	},
	
	"moved.fid": {
		"name": "frm_Topics.moved_from"
	},
	"moved.name": {
		"tables": [
			{
				"table": "frm_Forums",
				"on": [
					"frm_Forums.fid",
					"frm_Topics.moved_from"
				]
			}
		],
		"name": "frm_Forums.name"
	},
	"moved.timestamp": {
		"name": "frm_Topics.moved_date"
	}
};

exports.get = function(req, res) {
	// TODO: get mod/charter level from token
	var mod_level = 0;
	var charter_level = 0; // TODO: Set to max if mod_level > x?
	
	var offset = req.query.offset|0 || 0;
	var limit = req.query.limit|0 || 10;
	if(offset < 0)
	{
		offset = 0;
	}
	if(limit < 1)
	{
		limit = 1;
	}
	if(limit > 10)
	{
		limit = 10;
	}
	
	var fid = req.params.fid|0;
	var tid = req.params.tid|0;
	
	var out = {};
	async.series([
		function(next) {
			requestable.model.get({}, "frm_Topics", {
				"fid": fid,
				"tid": tid,
				"frm_Forums.view_mod_level_min": {
					"$lte": mod_level
				},
				"frm_Forums.view_charter_level_min": {
					"$lte": charter_level
				}
			}, get_topic_fields,
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
					out.topic = row;
					next();
				}
			);
		},
		function(next) {
			var sql = squel.select()
							.field("pid")
							.field("text")
							.field("date_posted")
							.field("rating")
							.field("deleted")
							.field("Users.uid", "owner.uid")
							.field("Users.name", "owner.name")
							.field("Users.image", "owner.image")
							.field("UsersEditor.uid", "edited.editor.uid")
							.field("UsersEditor.name", "edited.editor.name")
							.field("edit_note", "edited.note")
							.field("date_edited", "edited.timestamp")
						.from("frm_Posts")
							.left_join("Users", null, "frm_Posts.owner = Users.uid")
							.left_join("Users", "UsersEditor", "frm_Posts.editor = UsersEditor.uid")
						.where("frm_Posts.tid = ?", tid)
						.order("pid", true)
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
				out.posts = rows;
				next();
			});
		},
		function(next) {
			var sql = squel.select()
							.field("COUNT(*)", "count")
						.from("frm_Posts")
						.where("frm_Posts.tid = ?", tid)
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