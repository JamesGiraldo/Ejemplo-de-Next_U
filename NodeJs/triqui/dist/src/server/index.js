/*
* Dependencias
*/

var http = require('http')
var express = require('express')
var socketio = require('socket.io')

var port = 8082
var app = express()

app.use(express.static('public'))


var Server = http.createServer(app)

var io = socketio(Server)

Server.listen(port, function () {
console.log('TitTacToe is ready for play on port: '+port)
})
