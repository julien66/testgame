/**
 * @file
 * A camera module.
 */
define(['three'], function(Three) {
  var camera = new Three.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
 
  var neck = new Three.Object3D();
  neck.rotateOnAxis(new Three.Vector3(1, 0, 0), Three.Math.degToRad(90));
  neck.up = new Three.Vector3(0, 0, 1);
  neck.position.z = 100;
  neck.add(camera);
  //camera.position.y = 0;
  //camera.position.z = 100;

  return {
    camera : camera,
    neck : neck,
  }
});
