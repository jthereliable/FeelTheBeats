require "coffee-script"

express = require "express"
socketio = require "socket.io"

app = express()
app.get "/", (req, res) ->
  res.send "Websockets!"

server = (require "http").Server app
io = socketio.listen server
io.set "log level", 2
io.set "browser client", false

io.sockets.on "connection", (socket) ->
  io.sockets.emit "message", "New user"

  socket.on "message", (message, callback) ->
    socket.send message

  socket.on "disconnect", () ->
    io.sockets.emit "User disconnected"

server.listen 8000