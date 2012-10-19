var http= require('http');
var httpProxy= require('http-proxy');



var server = httpProxy.createServer(
  require('./utils')({
    '/test': { port: 8000, host: '10.10.20.75' },
  })
);

server.listen(8080);
