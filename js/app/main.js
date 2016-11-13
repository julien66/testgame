/**
 * @file
 * 
 * Main Javascript file for the game.
 **/
define(['three', 'app/scene', 'app/camera', 'app/controls', 'app/stats', 'app/time', 'app/socket', 'app/flyers', 'app/weather'], 
    function(Three, scene, camera, controls, stats, time, socket, flyers, weather) {
  
  // Socket established a connection sooner.
  // However now that we loaded all modules we send a 'Ready' Message.
  // Nodejs will therefore send the map.
  socket.emit('loadComplete', {
    'id' : socket.id,
  });

  // FPS Stats panel
  var stats = new Stats();
  stats.setMode(0); // 0: fps, 1: ms
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.right = '0px';
  stats.domElement.style.top = '0px';
  document.body.appendChild(stats.domElement);
  
  // WebGL renderer. 
  var renderer =  new Three.WebGLRenderer({
    alpha: true,
  });
  renderer.setClearColor(scene.fog.color, 1);
  renderer.shadowMapEnabled = true;
  renderer.shadowCameraNear = 3;
  renderer.shadowCameraFar = camera.camera.far;
  renderer.shadowCameraFov = 50;
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  
  // Rendering loop and updates.
  function render() {
    stats.begin();
    var delta = time.clock.getDelta();
    requestAnimationFrame(render);
    controls.update(delta);
    time.update(delta);
    flyers.update();
    
    renderer.render(scene, camera.camera);
    stats.end();
  } 

  // Launch !
  render(); 
});
