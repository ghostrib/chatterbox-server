
let handleRequest = require('./request-handler');
let http = require('http');

let port = 3000;
let ip = '127.0.0.1';

let server = http.createServer(handleRequest.requestHandler);

console.log('Listening on http://' + ip + ':' + port);
server.listen(port, ip);


