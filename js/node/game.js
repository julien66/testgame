var util = require('util');
var express = require('express');
var terrain = require('./nodeTerrain');
var flyers = require('./nodeFlyers');
var task = require('./nodeTask');
var weather = require('./nodeWeather');

var app = express();
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/../../');
app.use('/', express.static(__dirname + '/../../'));

var server = require('http').Server(app);
var io = require("socket.io").listen(server);
// On connection.
io.sockets.on('connection', function(client) {
  console.log('websocket connection started : ' + client.id);
  //client.on('loadComplete', function(message) {
    // Send an init signal to self.
    client.emit('init', {
      //'terrain' : terrain.getVertices(),
      //'flyers' : flyers.getFlyers(),
      'id' : client.id
    });
  //});
 
  // When someone ask for the terrain 
  client.on('getTerrain', function(message) {
    client.emit('terrainUpdate', {
      type : 'init',
      terrain : terrain.getVertices(),
    });
  });

  // When someone add a player.
  client.on('playerAdded', function(message) {
    flyers.addFlyer(message);
    client.emit('flyersUpdate', {
      'flyers' : flyers.getFlyers(), 
    })
  });

  // When someone change terrain.
  client.on('terrainChange', function(message) {
    terrain.setVertices(message.index, message.value);
    if (client.id == message.id) {
      client.broadcast.emit('terrainUpdate', {
        type : 'update',
        index : message.index,
        value : message.value,
      });
    }
  });
 
  // When someone move. 
  client.on('playerMove', function(flyer) {
    flyers.moveFlyer(flyer);
    if (client.id == flyer.id) {
      client.broadcast.emit('flyersUpdate', {
        'flyers' : flyers.getFlyers(),
      });
    }
  });

  // When someone asks for a new Task
  client.on('getTask', function(time) {
    var newTask = task.getTask(time.day);
    client.emit('newTask', newTask);
  });

  // When someone ask for the wind.
  client.on('getWind', function(time) {
    var newWind = weather.getWind(time.day);
    client.emit('newWind', newWind);
  });

  // When someone disconnect
  client.on('disconnect', function(reason) {
    console.log(client.id + ' disconnecting because ' + reason + '  !!');
    flyers.removeFlyer(client.id);
    io.sockets.emit('playerQuit', {
      id : client.id,
    });
  });
});

// Serve the game file @ home.
app.get('/', function(req, res){
    res.render("game.html");
});

// Listen to given port.
server.listen('443');
