var express		= require("express"),
	socketio	= require('socket.io');

var app = express();
app.get("/", function(req, res) {
	res.send("Websockets!");
});

var server = require("http").Server(app);
var io = socketio.listen(server);
io.set("log level", 2);
io.set("browser client", false);

io.sockets.on("connection", function(socket) {
	io.sockets.emit("message", "New user");
	
	socket.on("message", function(message, callback) {
		socket.send(message);
	});

	socket.on("disconnect", function() {
		io.sockets.emit("User disconnected");
	});
});

server.listen(8000);