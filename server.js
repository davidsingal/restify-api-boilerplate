var restify = require('restify');
var server = restify.createServer({ name: 'api', version: '1.0.0' });

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.listen(3000, function () {
  'use strict';
  console.log('%s listening at %s', server.name, server.url);
});
