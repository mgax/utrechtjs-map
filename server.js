var http = require('http');
var express = require('express');

var app = express().use('/', express.static(__dirname));
http.createServer(app).listen(5000, '0.0.0.0');
