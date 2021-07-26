var express = require('express');

var app = express();
var server = app.listen(3000);

app.use(express.static('public'));

console.log("my server is running!!");

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
    console.log('new connection: ' + socket.id);
    
    const count = io.engine.clientsCount;
        
    socket.on('mouse', mouseMsg);
    io.emit('count', count);
    console.log("clients: " + count);
    
    function mouseMsg(data) {
        socket.broadcast.emit('mouse', data);
        //console.log(data);
    }
    


}