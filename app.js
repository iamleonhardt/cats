/**
 * Created by bill on 1/10/17.
 */


// console.log('Mushies Great Adventures');


var http = require('http');
http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<!DOCTYPE html>\n<html lang="en">\n' +
        '<head>\n' +
        '<meta charset="UTF-8">\n' +
        '<link href="https://fonts.googleapis.com/css?family=VT323" rel="stylesheet">\n' +
        '<link rel="stylesheet" href="style.css">\n' +
        '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>\n' +
        '<script src="js/script.js"></script>\n' +
        '<script src="js/gameController.js"></script>\n' +
        '<script src="js/tileMap.js"></script>\n' +
        '<script src="js/heroController.js"></script>\n' +
        '<title>Title</title>\n' +
        '</head>\n' +
        '<body>\n' +
        '<div id="gameArea"></div>\n' +
        '</body>\n' +
        '</html>');
    res.end();

}).listen(2000, '127.0.0.1');
