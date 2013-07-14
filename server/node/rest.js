var express		= require("express"),
	async		= require("async"),
	fs			= require("fs"),
	settings	= require("settings");
var debug_mode = (settings.server.environment == "debug");

var app = express();

var paths = [];
function scanDirectory(dir, cb)
{
	fs.readdir(dir, function(err, files) {
		if(err)
		{
			throw(err);
		}
		async.each(files, function(item, next) {
			if(item == "route.js")
			{
				paths.push(dir);
				next();
				return;
			}
			fs.lstat(dir+"/"+item, function(err, stats) {
				if(err)
				{
					throw(err);
				}
				if(stats.isDirectory() && !stats.isSymbolicLink())
				{
					scanDirectory(dir+"/"+item, next);
					return;
				}
				next();
			});
		}, function(err) {
			if(err)
			{
				throw(err);
			}
			cb();
		});
	});
}

var methods = ["get","post","put","del"];
scanDirectory("./rest", function() {
	var i, l=methods.length, method, path, rest;
	async.each(paths, function(dir, next) {
		path = dir.replace(/^\.\/rest/,"").replace(/\/\!/g,"/:")+"/?";
		rest = require(dir+"/route.js");
		for(i=0;i<l;i++)
		{
			method = methods[i];
			if(rest[method] instanceof Function)
			{
				if(debug_mode)
				{
					(function() {
						var _path = path;
						var _rest = rest;
						var _method = method;
						app[_method](_path, function(req, res) {
							console.log("Requesting: " + _path);
							_rest[_method](req, res);
						});
					})();
				} else {
					app[method](path, rest[method]);
				}
			}
		}
		next();
	}, function(err) {
		if(err)
		{
			throw(err);
		}
		app.listen(82);
	});
});