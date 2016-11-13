/**
 * @file
 * A scene module.
 */
define(['three', 'app/infiniteTerrain', 'app/camera', 'app/lights', 'app/flyers', 'app/task'], function(Three, infiniteTerrain, camera, lights, flyers, task){
  var scene = new Three.Scene();
  scene.add(infiniteTerrain);
  scene.add(lights.ambientLight);
  scene.add(lights.dirLight);
  scene.fog = new THREE.FogExp2( 0x000000, 0.0128 );
  scene.add(lights.sun);
  //lights.sun.position.set(0, 0, 0);

  var taskCylinders = [];
  scene.add(lights.camera)
  scene.add(camera.neck);
  
  var onGliderLoaded = function(e) {
    var glider = e.detail.glider;
    scene.add(glider);
  }

  var onGliderGone = function(e) {
    var glider = e.detail.glider;
    scene.remove(glider);
  }

  var removeTask = function() {
    for (var i = 0; i < taskCylinders.length; i++) {
      scene.remove(taskCylinders[i]);
    }
  }

  var onNewTaskSet = function(e) {
    removeTask();
    var turnpoints = e.detail.task;
    var cylinders = [];
    for (var i = 0; i < turnpoints.length; i++) {
      var cylinder = turnpoints[i].getCylinder();
      scene.add(cylinder);
      cylinders.push(cylinder);
    }
    taskCylinders = cylinders;
  } 

  document.addEventListener('gliderLoaded', onGliderLoaded, false);
  document.addEventListener('gliderGone', onGliderGone, false);
  document.addEventListener('newTaskSet', onNewTaskSet, false);

  return scene;
});
