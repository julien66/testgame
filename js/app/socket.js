/**
 * @file
 * Socket Module for the game;
 */
define(['socketio'], function(io) {
  
  var connexion = 0;
  var socket = io.connect('http://37.59.55.69');
  socket.on('init', function(message) {
    socket.id = message.id;
    connexion++;
  });

  socket.on('disconnect', function(reason){
    console.log('disconnect ' + reason);
  }) 
  
  return socket;
});
