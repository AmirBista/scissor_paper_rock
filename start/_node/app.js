var http = require("http");
var domain ='192.168.1.7';
// var domain ='192.168.1.122';

const server = http.createServer(function (request, response) {

   // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, {'Content-Type': 'text/plain'});
   
   // Send the response body as "Hello World"
    // response.render(index);

   // response.end('Hello World\n');
}).listen(8088,domain);
io = require('socket.io')(server);
require('./node-server/node-server')(io); //inculde ios module

// Console will print the message
console.log('Server running at http://'+domain+':8088/');