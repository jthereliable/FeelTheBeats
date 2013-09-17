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
	var password = req.body.password;
	
	if(!validators.email(email) || mailer.isThrowAway(email))
	{
		res.json({
			"err": "Invalid email provided."
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
			var sql = squel.select().field("uid").from("Users").where("email=?", email).limit(1).toString();
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
					res.json({
						"err": "Email has already been registered."
					});
					return;
				}
				next();
			});
		},
		function(next) {
			// TODO: Finish registration
		}
	]);
};