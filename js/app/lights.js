/**
 * @file
 * lights module for the game.
 */
define(['three', 'app/param', 'app/time'], function(Three, param, time){
  var ambientLight = new Three.AmbientLight(0xffffff);
  
  var sun = new Three.Object3D();
  var dirLight = new Three.DirectionalLight(0x000000, 1.0);
  dirLight.castShadow = true;
  dirLight.position.set(0,100,0);
  var center =  new Three.Vector3(0,0,0);

  var width = 600;//window.innerWidth;
  var height = 600; //window.innerHeight; 
  var camera = new Three.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, -1000, 2000);
  camera.position.set(200,100,100);

  var update = function() {
    var timeInfo = time.getTime();
    var timeRatio = timeInfo.spent / timeInfo.totalTime;
    var radians = Three.Math.degToRad(timeRatio * 180);
    
    dirLight.position.x = Math.cos(-radians) * 200;
    dirLight.position.y = Math.sin(-radians) * 200;
    dirLight.position.z = - Math.sin(-radians) * 200;
    /*camera.position.x = Math.cos(-radians) * 200;
    camera.position.y = Math.sin(-radians) * 200;
    camera.position.z = - Math.sin(-radians) * 200;
    camera.up = new Three.Vector3(0, 0, 1);
    camera.lookAt(center);
    camera.matrixWorldNeedsUpdate = true;*/
    return dirLight.position;
  }  

  return {
    ambientLight: ambientLight,
    directionalLight : dirLight,
    camera: camera,
    sun: sun,
    update: update,
  }
});
