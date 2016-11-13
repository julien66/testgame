/**
 * @file
 * Wind lift module for the game.
 */
define(['three', 'app/param'], function(Three, param) {

  var getLift = function (position, faces, vectorWind, windStrength) {
    if (faces.length < 1) {
      return 0;
    }
    var windLift = 0;
    var normal = new Three.Vector3(0, 0, 0);
    for (var i = 0; i < faces.length; i++) {  
      if (typeof faces[i].distance != 'undefined') {       
        var height = position.z - faces[i].distance;
        if (position.z <  param.lifts.windLiftHeightCoef * height) {
          // If the flyer is still in the domain of a wind lift
          normal.add(faces[i].face.normal);
        }
      }
    }
    // Wind normal.
    var normalizedWind = vectorWind.normalize();
    // Dot product.
    var dot = - normalizedWind.dot(normal);
    // Wind lift according to dot product.
    windLift = (windStrength / param.lifts.windLiftStrengthCoef) * dot;
    
    return windLift / param.flyers.verticalSpeedCoef;
  }

  return {
    getLift: getLift,
  }
});
