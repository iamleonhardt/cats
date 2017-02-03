/**
 * Created by bill on 1/10/17.
 */

// console.log('Mushies Great Adventures');

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

server.listen(2000);

app.use('/', express.static(__dirname + '/client'));



io.sockets.on('connection', function(socket){
    console.log('socket connection');
    game.socket.id = Math.random();
    game.socketList[socket.id] = socket;
    console.log('socketList is : ', socketList);


    socket.emit('serverMsg', {
        msg: 'hai'
    })

});


setInterval(function(){
    console.log('hi');
}, 40);