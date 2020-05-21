var WebSocketServer = require("ws").Server
const fs = require('fs');
var http = require("http")
var express = require("express")
var app = express()
var port = process.env.PORT || 5000

app.use(express.static(__dirname + "/"))

var server = http.createServer(app, {
  cert: fs.readFileSync('cert.pem'),
  key: fs.readFileSync('key.pem')
})
server.listen(port)
console.log("http server listening on %d", port)

var wss = new WebSocketServer({server: server})
console.log("websocket server created")

wss.on("connection", function(ws, req) {
  const ip = req.socket.remoteAddress
  console.log("connection from " + ip + " opened")
  ws.on("message", function(message) {
    console.log("message reveived: " + message)
  })
  ws.on("close", function() {
    console.log("connection from " + ip + " closed")
  })
})
