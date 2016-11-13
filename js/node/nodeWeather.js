/**
 * @file
 * Nodejs weather module.
 */

// Maximal wind strength
var maxStrength = 40;
// Latest day.
var pastDay = 0;

// A wind object.
// A direction in °.
// A strength in km per hour.
var wind = {
  direction : 0,
  strength : 0,
};

var setWind = function() {
  var direction = 180; //Math.round(Math.random() * 360);
  var strength = 20; //Math.round(Math.random() * maxStrength);
  wind = {
    direction : direction,
    strength : strength,
  } 
}

exports.getWind = function(day) {
  if (day > pastDay) {
    setWind();
  }
  return wind;
}

