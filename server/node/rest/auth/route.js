var mysql				= require("database/mysql.js"),
	mongo				= require("database/mongo.js"),
	crypto				= require("misc/crypto.js"),
	string				= require("misc/string.js"),
	tokenizer			= require("misc/tokenizer.js"),
	squel				= require("squel"),
	__					= require("underscore"),
	logger				= require("debug/logger.js");

exports.get = function(req, res) {
	var raw_token = req.query.check;
	if(raw_token == null)
	{
		res.json({
			"status": "none"
		});
		return;
	}
	if(!tokenizer.validate(raw_token))
	{
		res.json({
			"status": "invalid"
		});
		return;
	}
	if(!tokenizer.alive(raw_token))
	{
		res.json({
			"status": "expired"
		});
		return;
	}
	res.json({
		"status": "valid"
	});
};
exports.post = function(req, res) {
	var email = req.body.email;
	var password = req.body.password;
	
	var uid, salt, token_salt;
	async.series([
		function(next) {
			var sql = squel.select().field("uid").from("Users").where("email = ?", email).limit(1).toString();
			mysql.query(sql, function(err, rows) {
				if(err)
				{
					res.json({
						"err": "Database Error"
					});
					return;
				}
				if(rows.length == 0)
				{
					res.json({
						"err": "Invalid email or password provided."
					});
					return;
				}
				uid = rows[0].uid|0;
				next();
			});
		},
		function(next) {
			mongo.collection("UserTokens").find({
				"uid": uid
			}, {
				"_id": 0,
				"salt": 1,
				"token": 1
			}, function(err, rows) {
				if(err)
				{
					res.json({
						"err": "Database Error"
					});
					return;
				}
				if(rows.length == 0)
				{
					res.json({
						"err": "Invalid email or password provided."
					});
					return;
				}
				salt = rows[0].salt;
				token_salt = rows[0].token;
				next();
			});
		},
		function(next) {
			if(token_salt)
			{
				next();
				return;
			}
			token_salt = string.random(32);
			mongo.collection("UserTokens").update({
				"uid": uid
			}, {
				"$set": {
					"token": token_salt
				}
			}, {
				"upsert": true
			}, function(err) {
				if(err)
				{
					res.json({
						"err": "Database Error"
					});
					return;
				}
				next();
			});
		},
		function(next) {
			var password_hash = crypto.password(password, salt.substr(0,32), salt.substr(32,32), salt.substr(64,32));
			var sql = squel.select()
							.field("Users.name", "name")
							.field("cheater")
							.field("mod_level","access.mod")
							.field("charter_level","access.charter")
							.field("ban_level","access.ban")
							.field("GroupMembers.gid","group.gid")
							.field("Groups.name","group.name")
							.field("GroupMembers.position","group.position")
						.from("Users")
							.left_join("GroupMembers", null, "Users.uid = GroupMembers.uid")
							.left_join("Groups", null, "GroupMembers.gid = Groups.gid")
						.where("email = ?", email)
						.where("password = ?", password_hash)
						.limit(1).toString();
			mysql.query(sql, function(err, rows) {
				if(err)
				{
					res.json({
						"err": "Database Error"
					});
					return;
				}
				if(rows.length == 0)
				{
					res.json({
						"err": "Invalid email or password provided."
					});
					return;
				}
				var out = rows[0];
				rows[0].uid = uid;
				out = tokenizer.generate(uid, out, null, token_salt);
				res.json({
					"token": out
				});
				next();
			});
		},
		function(next) {
			var sql = squel.update({"usingValuePlaceholders": true}).table("Users").set("date_login", "NOW()").where("uid = ?", uid).toString();
			mysql.query(sql, function(err) {
				if(err)
				{
					// Log error
				}
			});
		}
	]);
};
exports.put = function(req, res) {
	var token = res.locals;
	if(token.uid == 0)
	{
		res.json({
			"err": "Not logged in."
		});
		return;
	}
	mongo.collection("UserTokens").find({
		"uid": token.uid
	}, {
		"_id": 0,
		"token": 1
	}, function(err, rows) {
		if(err)
		{
			res.json({
				"err": "Database Error"
			});
			return;
		}
		if(rows.length == 0)
		{
			res.json({
				"err": "Not logged in."
			});
			return;
		}
		var out = tokenizer.generate(token.uid, token, null, rows[0].token);
		res.json({
			"token": out
		});
	});
};
exports.del = function(req, res) {
	var token = res.locals.token;
	if(token.uid == 0)
	{
		res.json({
			"err": "Not logged in."
		});
		return;
	}
	var token_salt = string.random(32);
	mongo.collection("UserTokens").update({
		"uid": token.uid
	}, {
		"$set": {
			"token": token_salt
		}
	}, {
		"upsert": true
	}, function(err) {
		if(err)
		{
			res.json({
				"err": "Database Error"
			});
			return;
		}
		res.json({
			"success": true,
			"token": ""
		});
	});
};