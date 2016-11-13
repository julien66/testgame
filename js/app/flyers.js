/**
 * @file
 * A module that handle all flyers.
 */
define(['three', 'app/socket', 'flyers/flyer', 'app/task'], function(Three, socket, flyer, task) {
  var flyers = [];
  var player;
  var task;

  // When there is an update with a flyer (creation or move).
  socket.on('flyersUpdate', function(message) {
    for (var id in message.flyers) {
      if (id != socket.id && !flyers[id]) {
        var pilot = newPlayer(id, message.flyers[id]);
      }
      else if (id != socket.id && flyers[id]) {
        flyers[id].setSimpleFlyer(message.flyers[id]);
      }
    }
  });

  // When a player quit.
  socket.on('playerQuit', function(message) {
    var pilot = flyers[message.id];
    pilot.trash();
    delete flyers[message.id];
  });

  function newPlayer(id, param) {
    var pilot = new flyer(id, param);
    pilot.loadModel();
    flyers[id] = pilot;
    return pilot;
  }
  
  var update = function(delta) {
    for (var id in flyers) {
      flyers[id].move();
    }
  }  

  var getFlyers = function() {
    return flyers;
  }
  
  var getPlayer = function() {
    return player;
  }

  // Creating a new Player.
  player = newPlayer(socket.id);
  
  return {
    'getPlayer' : getPlayer,
    'getFlyers' : getFlyers,
    'update' : update, 
  }
});
