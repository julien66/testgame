/**
 * @file
 * Wind module for the game.
 */
define(['three', 'app/param'], function(Three, param) {
  var wind = {
    direction : 0,
    strength : 0,
  }

  var vectorWind = new Three.Vector3(0, 0, 0);

  var setWind = function(newWind) {
    wind = newWind;
    var radDirection = Three.Math.degToRad(wind.direction);
    var xWay = 1;
    var yWay = 1;
    if (radDirection > Math.PI / 2 && radDirection < Math.PI * 1.5) {
      xWay = -1;
    }
    if (radDirection > Math.PI && radDirection < Math.PI * 2) {
      yWay = -1;
    }
    vectorWind.y = Math.cos(radDirection) * wind.strength * xWay; 
    vectorWind.x = Math.sin(radDirection) * wind.strength * yWay;
    /*var e = document.createEvent("CustomEvent");
    e.initCustomEvent('newWindBlowing', false, false, {
      'wind' : vectorWind,
    });
    document.dispatchEvent(e);*/
  }

  var getVectorWind = function() {
    return vectorWind;
  }

  var getStrength = function() {
    return wind.strength;
  }

  return {
    setWind : setWind,
    getVectorWind : getVectorWind,
    getStrength : getStrength,
  }
});
