var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

// Data storage
let usersCounter = 0;
let usersData = {};

// Settings of express
app.set('view engine', 'pug');
app.use(express.static('scripts'));

// Routing
app.get('/', function(req, res){
  res.render('index', { client: usersCounter+1 });
});
app.get('/client/:clientId', function(req, res){
	res.render('client', { client: req.params.clientId });
});

// Sockets
io.on('connection', function(socket){
	usersCounter++;
  console.log('A user #'+usersCounter+' connected');
  io.emit('data', usersData);
  
  socket.on('client', function(msg){
  	usersData[msg.client] = msg.data;
  	io.emit('data', usersData);
  });
});

// Server
http.listen(3000, function(){
  console.log('listening on *:3000');
});