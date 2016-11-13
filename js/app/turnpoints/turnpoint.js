/**
 * @file
 * Turnpoint module for the game
 */
define(['three', 'app/param'], function(Three, param) {
  var turnpoint = function(tParam) {
    var index = tParam.index;
    var x = tParam.x;
    var y = tParam.y;
    var radius = tParam.radius;

    var cylinderHeight = param.turnpoints.height;
    var tagged = false;
    var color = param.turnpoints.color;
    if (index == 0) {
      color = param.turnpoints.colorNext; 
    }

    var geometry = new Three.CylinderGeometry(radius, radius, cylinderHeight, 20, 1, true);
    // By default the cylinder is built from its center. Translating to its end.
    geometry.applyMatrix( new Three.Matrix4().makeTranslation( 0, cylinderHeight / 2, 0 ) );
    var material = new Three.MeshBasicMaterial({
      color: color,
      opacity: 0.7,
      transparent: true,
    });
    var cylinder = new Three.Mesh(geometry, material);
    cylinder.position.x = x;
    cylinder.position.y = y;
    // Rotating so it's vertical.
    cylinder.rotation.x = Three.Math.degToRad(90);

    this.setTagged = function(bool) {
      tagged = bool;
    };

    this.getCylinder = function() {
      return cylinder;
    }

    this.getInfo = function() {
      return {
        x : x,
        y : y,
        radius : radius,
      }
    }

    this.setColor = function(mode) {
      var newColor;
      switch(mode) {
        case 'tagged' :
          newColor = param.turnpoints.colorTagged;
        break;
        case 'next' :
          newColor = param.turnpoints.colorNext;
        break;
        default :
          newColor = param.turnpoints.color;
        break;
      }
      cylinder.material.color.setHex(newColor);
    }
  };

  return turnpoint;
});
