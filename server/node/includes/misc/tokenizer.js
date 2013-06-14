var crypto		= require("misc/crypto.js"),
	string		= require("misc/string.js"),
	settings	= require("settings.json");

var validate = exports.validate = function(token) {
	if(!token)
	{
		return false;
	}
	token=token.split(".");
	if(token.length != 2)
	{
		return false;
	}
	
	raw_token = token[0];
	hash_check = token[1];
	
	if(raw_token.split("|").length != 4)
	{
		return false;
	}
	
	var hash_validate = crypto.sha1(crypto.md5(raw_token)).replace(/\+/g,"-").replace(/\//g,"_").replace(/\=/g,"");
	return (hash_check === hash_validate);
};
var alive = exports.alive = function(token) {
	if(!validate(token))
	{
		return false;
	}
	var expiration = Number(token.split(".")[0].split("|")[2]);
	var now = (new Date()).getTime();
	
	return (now < expiration);
};
var parse = exports.parse = function(token, salt) {
	if(!alive(token))
	{
		return null;
	}
	token = token.split(".")[0].split("|");
	salt = salt || "";
	
	enc_json = token[0];
	enc_key = token[1];
	expiration = token[2];
	
	var key = settings.token_priv_enc_key + expiration + enc_key + salt;
	
	enc_json = enc_json.replace(/\-/g,"+").replace(/\_/g,"/") + Array(4 - (enc_json.length%4)).join("=");
	var json = crypto.auth_aes256_d(enc_json,key);
	
	try {
		return JSON.parse(json);
	} catch(err) {
		return null;
	}
};
var generate = exports.generate = function(obj, lifetime, salt) {
	lifetime = (lifetime|0) || settings.tokens.lifetime;
	salt = salt || "";
	
	var json = JSON.stringify(obj);
	var enc_key = string.random_alphanum(16);
	var hash_key = string.random_alphanum(16);
	var expiration = String(((new Date()).getTime() + lifetime*1000));
	
	var key = settings.token_priv_enc_key + expiration + enc_key + salt;
	var enc_json = crypto.auth_aes256(json,key);
	enc_json = enc_json.replace(/\+/g,"-").replace(/\//g,"_").replace(/\=/g,"");
	
	var raw_token = enc_json + "|" + enc_key + "|" + expiration + "|" + hash_key;
	var hash_check = crypto.sha1(crypto.md5(raw_token)).replace(/\+/g,"-").replace(/\//g,"_").replace(/\=/g,"");
	
	return raw_token + "." + hash_check;
};