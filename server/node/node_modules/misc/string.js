exports.random = function(n) {
	var s = "";
	while(n>0)
	{
		s += String.fromCharCode(Math.floor(Math.random() * (127 - 32)) + 32);
		n--;
	}
	return s;
};

var rand_charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
exports.random_alphanum = function(l) {
	var out = "", i, n=rand_charset.length;
	for(i=0;i<l;i++)
	{
		out += rand_charset[n*Math.random()|0];
	}
	return out;
};

var rand_letter_charset = "abcdefghijklmnopqrstuvwxyz";
exports.random_letters = function(l) {
	var out = "", i, n=rand_letter_charset.length;
	for(i=0;i<l;i++)
	{
		out += rand_letter_charset[n*Math.random()|0];
	}
	return out;
};

var unorm = require("unorm");
exports.removeAccents = function(str) {
	return unorm.nfkd(str);
};
exports.removeSymbols = function(str) {
	return str.replace(/[^a-zA-Z_0-9 \.\,\:\(\)\[\]\-\+\=\'\"\/\\\{\}\!\@\#\$\%\^\&\*\?\<\>\;]/g,"");
};

var email_regex = /^(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){255,})(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){65,}@)(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22))(?:\.(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22)))*@(?:(?:(?!.*[^.]{64,})(?:(?:(?:xn--)?[a-z0-9]+(?:-[a-z0-9]+)*\.){1,126}){1,}(?:(?:[a-z][a-z0-9]*)|(?:(?:xn--)[a-z0-9]+))(?:-[a-z0-9]+)*)|(?:\[(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){7})|(?:(?!(?:.*[a-f0-9][:\]]){7,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?)))|(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){5}:)|(?:(?!(?:.*[a-f0-9]:){5,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3}:)?)))?(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))(?:\.(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:1[0-9]{2})|(?:[1-9]?[0-9]))){3}))\]))$/i;
exports.isEmail = function(email) {
	return email_regex.test(email);
};