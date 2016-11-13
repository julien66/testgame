/**
 * @file
 * Face pointer module for the game.
 * Cast a ray and select the terrain's face below a flyer.
 */
define(['three', 'app/infiniteTerrain'], function(Three, terrains) {
  var caster = new Three.Raycaster();
  var verticalRay = new Three.Vector3(0, 0, -1);

  var getVerticalFaces = function(position) {
    for (var terrain in terrains) {
      if ( (position.x < terrain.zoneXMax && position.x > terrain.zoneXMin ) && (position.y > terrain.zoneYMin && position.y < terrain.zoneYMax)) {
        caster.set(position, verticalRay);
        return caster.intersectObject(terrain);
      }
    }
    return;
  }

  return {
    getVerticalFaces : getVerticalFaces,
  }
});
