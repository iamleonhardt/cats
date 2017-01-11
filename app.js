/**
 * Created by bill on 1/10/17.
 */
console.log('Mushies Great Adventures');


var express = require('express');
var app = express();
var serve = require('http').Server(app);

app.get('/', function(req, res){
    res.sendFile(__dir + 'client/index.html');
});
app.use('/client',express.static(__dirname + '/client'));

serve.listen(2000);