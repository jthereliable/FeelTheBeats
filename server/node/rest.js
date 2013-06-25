var express		= require("express");

var app = express();
app.get("/", function(req, res) {
	console.log("/");
	res.send("Hello!");
});
app.get("/test/?", function(req, res) {
	console.log("/test/?");
	res.send("Test!");
});
app.listen(82);
