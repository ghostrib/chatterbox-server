let http = require('http');
let db = require('./fake-db');
let path = '/classes/messages';

let headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

exports.requestHandler = function (request, response) {
  let statusCode;
  headers['Content-Type'] = 'application/json';

  if (request.url === path) {
    if (request.method === 'GET') {
      statusCode = 200;
    }
    if (request.method === 'POST') {
      statusCode = 201;
      let body = '';
      request.on('data', function (data) {
        body += data;
        body = JSON.parse(body);
        db.results.push({
          username: body.username,
          text: body.text
        });
      });
    }
  } else {
    statusCode = 404;
  }
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(db));
};






