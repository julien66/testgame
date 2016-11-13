/**
 * @file
 * Cursor handler for the game.
 *
 * It grabs the current mouse action and the map position
 * of the cursor and return it at update.
 *
 * @parent transform.js
 *
 * @see app/transform.js
 * transform.js update and listen to the cursor value.
 * It then pushes the details to effects.js.
 *
 * @see app/effects.js
 * effects.js will handle the details from the cursor.
 * and perform the necessaray call to a given effect.
 */
define(['three', 'app/camera', 'app/param', 'controls/mouse'], function(Three, cam, param, mouse) {
  var camera = cam.camera;
  var neck = cam.neck;

  // Cumulative delta since last update.
  var delta = 0;
  // Threshold for next update. 
  var updateThreshold = param.cursor.updateThreshold;
   
  var gridSquareSize = param.grid.width / param.grid.step;
  var step = param.grid.step;
  var type = "face"; 

  var update = function(deltaTime) {
    delta += deltaTime;
    if (delta > updateThreshold) {
      mousePosition = mouse.getPosition();
      var vector = new THREE.Vector3(
        (mousePosition.clientX / window.innerWidth) * 2 - 1,
        - (mousePosition.clientY / window.innerHeight) * 2 + 1,
        0.5 );
      
      // Project the position over the plane z=0.
      var projector = new Three.Projector();
      projector.unprojectVector(vector, camera);
      var dir = vector.sub(neck.position).normalize();
      var distance = - neck.position.z / dir.z;
      var position = neck.position.clone().add(dir.multiplyScalar(distance));
      var baseSquare = {
        x : Math.floor(position.x / gridSquareSize),
        y : Math.floor(position.y / gridSquareSize),
      }
      var baseVertice = {
        x : Math.round(position.x / gridSquareSize),
        y : Math.round(position.y / gridSquareSize),
      }
      var absVertice = {
        x : baseVertice.x + (step / 6),
        y : -(baseVertice.y - step / 6),
      }
      var vertex = (absVertice.x + absVertice.y * step + absVertice.y)  + 620;
      
      var tiers = param.grid.width / 3;
      var zX = Math.floor((position.x + (tiers * 0.5)) / tiers);
      var zY = Math.floor((position.y + (tiers * 0.5)) / tiers);
      var zone = (zY * 3) + zX;

      var localVertex = vertex - (zX * (step / 3));
      //console.log(localVertex, vertex); 
      //console.log(baseSquare, baseVertice, absVertice, vertex, zone);
      delta = 0;

      return {
        'position' : position,
        'vertex' : vertex,
        'baseSquare' : baseSquare,
        'baseVertice' : baseVertice,
        'zone' : zone, 
        'type' : type,
      }
    }
  }

  return  {
    'update' : update,
  };
});
