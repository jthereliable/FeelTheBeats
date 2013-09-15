var mysql				= require("database/mysql.js"),
	requestable			= require("misc/requestable.js"),
	__					= require("underscore"),
	squel				= require("squel"),
	async				= require("async"),
	logger				= require("debug/logger.js");

var get_fields = {
	"pid": {
	},
	"text": {
	},
	
	"date_posted": {
	},
	
	"owner.uid": {
		"name": "frm_Posts.owner"
	},
	"owner.name": {
		"tables": [
			{
				"table": "Users",
				"on": [
					"frm_Posts.owner",
					"Users.uid"
				]
			}
		],
		"name": "Users.name"
	},
	"owner.image": {
		"tables": [
			{
				"table": "Users",
				"on": [
					"frm_Posts.owner",
					"Users.uid"
				]
			}
		],
		"name": "Users.image"
	},
	
	"edited.editor.uid": {
		"name": "frm_Posts.editor"
	},
	"edited.editor.name": {
		"tables": [
			{
				"table": ["Users", "UsersEditor"],
				"on": [
					"frm_Posts.editor",
					"UsersEditor.uid"
				]
			}
		],
		"name": "UsersEditor.name"
	},
	"edited.note": {
		"name": "frm_Posts.edit_note"
	},
	"edited.timestamp": {
		"name": "frm_Posts.date_edited"
	},
	
	"topic.tid": {
		"name": "frm_Posts.tid"
	},
	"topic.title": {
		"tables": [
			{
				"table": "frm_Topics",
				"on": [
					"frm_Topics.tid",
					"frm_Posts.tid"
				]
			}
		],
		"name": "frm_Topics.title",
		"unignoreable": true
	},
	"topic.status.locked": {
		"tables": [
			{
				"table": "frm_Topics",
				"on": [
					"frm_Topics.tid",
					"frm_Posts.tid"
				]
			}
		],
		"name": "frm_Topics.locked"
	},
	"topic.status.stickied": {
		"tables": [
			{
				"table": "frm_Topics",
				"on": [
					"frm_Topics.tid",
					"frm_Posts.tid"
				]
			}
		],
		"name": "frm_Topics.stickied"
	},
	"topic.forum.fid": {
		"tables": [
			{
				"table": "frm_Topics",
				"on": [
					"frm_Topics.tid",
					"frm_Posts.tid"
				]
			},
			{
				"table": "frm_Forums",
				"on": [
					"frm_Forums.fid",
					"frm_Topics.fid"
				]
			}
		],
		"name": "frm_Topics.fid",
		"unignoreable": true
	},
	"topic.forum.name": {
		"tables": [
			{
				"table": "frm_Topics",
				"on": [
					"frm_Topics.tid",
					"frm_Posts.tid"
				]
			},
			{
				"table": "frm_Forums",
				"on": [
					"frm_Forums.fid",
					"frm_Topics.fid"
				]
			}
		],
		"name": "frm_Forums.name"
	}
};

exports.get = function(req, res) {
	var mod_level = res.locals.token.access.mod;
	var charter_level = res.locals.token.access.charter;
	
	var fid = req.params.fid|0;
	var tid = req.params.tid|0;
	var pid = req.params.pid|0;
	
	requestable.model.get({}, "frm_Posts", {
		"frm_Topics.fid": fid,
		"tid": tid,
		"pid": pid,
		"frm_Forums.view_mod_level_min": {
			"$lte": mod_level
		},
		"frm_Forums.view_charter_level_min": {
			"$lte": charter_level
		}
	}, get_fields,
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