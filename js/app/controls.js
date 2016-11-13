/**
 * @File
 * Main controls for the game.
 *
 * There is a camera control.
 * Pretty self explainary. It does handle the camera controls.
 *
 * There is also a transform controls.
 * Those are mouse controls that will interract with the world.
 *
 * @see app/transform.js
 * transform.js update and listen to the cursor value.
 * It then pushes the details to effects.js.
 *
 * @see app/effects.js
 * effects.js will handle the details from the cursor.
 * and perform the necessaray call to a given effect.
 */
define(['controls/cameraControls', 'app/camera', 'app/transform'], function(cameraControls, camera, transform) { 
  var update = function update(delta) {
    cameraControls.update();
    transform.update(delta);
  }
  
  return {
    'update' : update,
  };
});
