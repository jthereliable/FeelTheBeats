var mysql				= require("database/mysql.js"),
	mongo				= require("database/mongo.js"),
	requestable			= require("misc/requestable.js"),
	__					= require("underscore"),
	logger				= require("debug/logger.js"),
	flat				= require("flat.js"),
	async				= require("async");

var get_fields = {
	"uid": {
		"name": "Users.uid"
	},
	"name": {
		"name": "Users.name"
	},
	"image": {
		"name": "Users.image"
	},
	"tier": {
		"name": "Users.tier"
	},
	"points": {
		"name": "Users.points"
	},
	"experience": {
		"name": "Users.experience"
	},
	"mod_level": {
		"name": "Users.mod_level"
	},
	"charter_level": {
		"name": "Users.charter_level"
	},
	"date_join": {
		"name": "Users.date_join"
	},
	"date_login": {
		"name": "Users.date_login"
	},
	"group.gid": {
		"name": "Groups.gid"
	},
	"group.name": {
		"name": "Groups.name"
	},
	"group.image": {
		"name": "Groups.image"
	},
	"ratings.reputation": {
		"mongo": true
	},
	"ratings.rating": {
		"mongo": true
	}
};
var get_order = {
	"uid": {
		"def": true
	},
	"name": {
	},
	"tier": {
		"sort": -1
	},
	"points": {
		"sort": -1
	},
	"experience": {
		"sort": -1
	},
	"date_join": {
	}
};
exports.get = function(req, res) {
	var uid = req.params.uid|0;
	var out;
	async.series([
		function(next) {
			mysql.query("SELECT " + requestable.select.fields(req, get_fields) +
						"FROM `Users` \
						 LEFT JOIN `GroupMembers` USING(`uid`) \
						 LEFT JOIN `Groups` USING(`gid`) " +
						"WHERE `Users`.`uid`=" + mysql.escape(uid) + " " +
						"LIMIT 1",
			function(err, rows) {
				if(err)
				{
					res.json({
						"err": "MySQL Error",
						"_err": err
						
					});
					return;
				}
				if(rows.length == 0)
				{
					res.json({});
					return;
				}
				out = flat.unflatten(rows[0]);
				if(out.group.gid == null)
				{
					delete out.group;
				}
				next();
			});
		},
		function(next) {
			var mongo_fields = requestable.select.fields.mongo(req, get_fields);
			if(!mongo_fields["ratings.reputation"] && !mongo_fields["ratings.rating"])
			{
				next();
				return;
			}
			
			out.ratings = {};
			mongo.collection("UserRatings").find({
				"uid": uid
			}, {
				"reputation": 1,
				"rating": 1
			}, function(err, rows) {
				var reputation = 0, rating = 0;
				if(rows.length != 0)
				{
					reputation = rows[0].reputation;
					rating = rows[0].rating;
				}
				if(mongo_fields["ratings.reputation"])
				{
					out.ratings.reputation = reputation;
				}
				if(mongo_fields["ratings.rating"])
				{
					out.ratings.rating = rating;
				}
				next();
			});
		},
		function(next) {
			res.json(out);
		}
	]);
};