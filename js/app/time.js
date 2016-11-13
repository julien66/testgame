/**
 * @file
 * Time module for the game
 */
define(['three', 'app/param'], function(Three, param) {
  // Duration of a day in sec.
  var dayDuration = param.time.dayLength;
  // Time spent this day.
  var spent = 0;
  // # of day already spent since the epoch...
  var daySpent = Math.floor((new Date().getTime() / 1000) / dayDuration);
  var clock = new Three.Clock();

  var update = function(delta) {
    var current = new Date().getTime() / 1000;
    spent = current % dayDuration;
    var newDay = Math.floor(current / dayDuration);
    if (newDay > daySpent) {
      // Cocooricoo for a new day !!
      var e = document.createEvent("CustomEvent");
      e.initCustomEvent('newDay', false, false, {
        'time' : getTime(),
      });
      daySpent = newDay;
      document.dispatchEvent(e);
    }
  }

  var getTime = function() {
    return {
      'totalTime' : dayDuration,
      'daySpent' : daySpent,
      'spent' : spent,
    }
  }

  return {
    clock : clock,
    update: update,
    getTime : getTime,
  }
});
