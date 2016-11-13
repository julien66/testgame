/**
 * @file
 * Weather module for the game.
 */
define(['weather/wind', 'app/socket'], function(wind, socket) {
  var onNewDay = function(e) {
    socket.emit('getWind', {
      day : e.detail.time.daySpent,
    }); 
  }

  socket.on('newWind', function(newWind) {
    wind.setWind(newWind);
  });

  document.addEventListener('newDay', onNewDay, false);
});
