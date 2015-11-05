var request = require('superagent');
require('superagent-as-promised')(request);

var http = require('http');
var url = require('url');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const userAgentHeader = 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1';

const REQUEST_PORT=8080; 
const PROXY_PORT=8081;

 
var server = http.createServer();

var requestHandler = function(requestInstance, responseInstance){
  
  var parsedUrl = url.parse(requestInstance.url, true);
  var replacedChar;

  console.log('Client requested ' + parsedUrl.query.url)

  if (parsedUrl.query.accept) {
    replacedChar = parsedUrl.query.accept.replace('+','/');
  }  

  var acceptType = replacedChar || 'application/json';

  var RequestStream = request(parsedUrl.query.url).accept(acceptType);

  RequestStream.on('error', function(error){
    this.emit('end').end();
  });

  RequestStream.on('end', function(error){
    this.emit('end').end();
  }); 
 
  RequestStream.pipe(responseInstance);
 
};

server.on('request', requestHandler);

server.on('connection', function(sock) {
  console.log('Client connected from ' + sock.remoteAddress + ':' + sock.remotePort);
});

server.listen(REQUEST_PORT, function(){
    console.log("Server listening on: http://localhost:%s", REQUEST_PORT);
});

