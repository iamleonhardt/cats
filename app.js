/**
 * Created by bill on 1/10/17.
 */


console.log('Mushies Great Adventures');


var express = require('express');
var app = express();
var serv = require('http').Server(app);
var io = require('socket.io')(serv,{});
serv.listen(2000);


app.get('/',function(req, res){
    res.sendFile(__dirname + '/client/index.html');
});
// app.use('/client',express.static(__dirname + '/client'));




io.sockets.on('connection', function(socket){
    console.log('socket connection');

    socket.on('happy', function(data){
        console.log('I am happy because ' + data.reason);
    })

    socket.emit('serverMsg', {
        msg: 'server says hello'
    })

});