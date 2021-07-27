var express = require('express');

var app = express();

var port = process.env.PORT || 3000;
var server = app.listen(port);

app.use(express.static('public'));

console.log("my server is running!!");

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', (socket) => {
    console.log('new connection: ' + socket.id);
            
    //socket.on('mouse', mouseMsg);
    
    io.emit('count', io.engine.clientsCount);
    console.log("clients: " + io.engine.clientsCount);
    
//    function mouseMsg(data) {
//        socket.broadcast.emit('mouse', data);
//        //console.log(data);
//    }
    
    socket.on("disconnect", () => {
        io.emit('count', io.engine.clientsCount);
    });
});
