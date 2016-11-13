/**
 * @file
 * cursor / terrain transformation module.
 */
define(['three', 'app/infiniteTerrain', 'app/cursor', 'app/lights', 'app/effects', 'app/flyers'], function(Three, terrains, cursor, lights, effects, flyers) {
  var update = function(delta) {
    var cursorInfo = cursor.update(delta);
    var lightsInfo = lights.update();
    var flyersInfo = flyers.getFlyers();
    effects.update(terrains, cursorInfo, lightsInfo, delta, flyersInfo);
  }
  return {
    'update' : update,
  };
});
