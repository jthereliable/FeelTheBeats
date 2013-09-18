var mysql				= require("database/mysql"),
	mongo				= require("database/mongo"),
	crypto				= require("misc/crypto"),
	string				= require("misc/string"),
	tokenizer			= require("misc/tokenizer"),
	recaptcha			= require("misc/recaptcha"),
	validators			= require("misc/validators"),
	mailer				= require("misc/mailer"),
	squel				= require("squel"),
	__					= require("underscore"),
	logger				= require("debug/logger");

exports.post = function(req, res) {
	var ip = req.connection.remoteAddress;
	var recaptcha_response = req.body.recaptcha_response;
	var recaptcha_challenge = req.body.recaptcha_challenge;
	var email = String(req.body.email).toLowerCase();
	var name = req.body.name;
	var password = req.body.password;
	
	if(!validators.email(email) || mailer.isThrowAway(email))
	{
		res.json({
			"err": "Invalid email provided."
		});
		return;
	}
	if(!validators.string(name, 2))
	{
		res.json({
			"err": "Name provided is too short."
		});
		return;
	}
	if(!validators.string(password, 5))
	{
		res.json({
			"err": "Password provided is too short."
		});
		return;
	}
	if(!recaptcha_response || !recaptcha_challenge)
	{
		res.json({
			"err": "Invalid reCAPTCHA data provided."
		});
		return;
	}
	
	var salt = string.random(96), uid;
	async.series([
		function(next) {
			recaptcha.verify(ip, recaptcha_challenge, recaptcha_response, function(err, res) {
				if(err || !res)
				{
					res.json({
						"err": "Invalid reCAPTCHA data provided.",
						"_err": err
					});
					return;
				}
				next();
			});
		},
		function(next) {
			var sql = squel.select().field("uid").from("Users").where("email=? OR LOWER(name)=?", email, name.toLowerCase()).limit(1).toString();
			mysql.query(sql, function(err, rows) {
				if(err)
				{
					res.json({
						"err": "Database Error"
					});
					return;
				}
				if(rows.length > 0)
				{
					if(rows[0].email == email)
					{
						res.json({
							"err": "Email has already been registered."
						});
					} else {
						res.json({
							"err": "Name has been taken."
						});
					}
					return;
				}
				next();
			});
		},
		function(next) {
			var password_hash = crypto.password(password, salt.substr(0,32), salt.substr(32,32), salt.substr(64,32));
			var sql = squel.insert().into("Users").set("email", email).set("name", name).set("password", password_hash).toString();
			mysql.query(sql, function(err, res) {
				if(err)
				{
					res.json({
						"err": "Database Error"
					});
					return;
				}
				uid = res.insertId;
				next();
			});
		},
		function(next) {
			var token_salt = string.random(32);
			mongo.collection("UserTokens").update({
				"uid": uid
			}, {
				"$set": {
					"salt": salt,
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
			var register_code = string.rand_letter_charset(16);
			mongo.collection("UserRegisterCodes").update({
				"uid": uid
			}, {
				"$set": {
					"code": register_code
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
			res.json({
				"success": true,
				"uid": uid
			});
		}
	]);
};