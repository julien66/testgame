/**
 * @file
 * Camera control module.
 */

define(['three', 'app/camera', 'controls/mouse', 'controls/keyboard'], function(Three, cam, mouse, keyboard) {
  var camera = cam.camera;
  var neck = cam.neck
  var movementX = 0;
  var movementY = 0;

  var viewhalfX = 0;
  var viewHalfY = 0;

  var lookSpeed = 0.001;
  var lookVerticalSpeed = 0.002;
  var movementSpeed = 5;
  var verticalSpeed = 5;

  var minHeight = 20;
  var maxHeight = 500;

  var move = true;
  var look = true;

  var minAngle = Three.Math.degToRad(-90);
  var maxAngle = Three.Math.degToRad(30);

  var moveForward = false;
  var moveBackward = false;

  var handleResize = function() {
    viewHalfX = window.innerWidth / 2;
    viewHalfY = window.innerHeight / 2;
  }

  var toggleMove = function(bool) {
    move = bool;
  } 
  
  var toggleLook = function(bool) {
    look = bool;
  }

  var toggleFreeze = function(bool) {
    move = bool;
    look = bool;
  } 

  var update = function() {
    mousePosition = mouse.getPosition();
    mouseState = mouse.getState();
    movementX = mousePosition.pageX - viewHalfX;
    movementY = mousePosition.pageY - viewHalfY;
    moveForward = mouseState.leftIsDown; 
    moveBackward = mouseState.rightIsDown;
    
    if (keyboard.isKeysDown([83])) {
      moveBackward = true;
    }
    
    if (keyboard.isKeysDown([90])) {
      moveForward = true;
    }

    if (keyboard.isKeysDown([32])) {
      toggleFreeze(false);
    }
    else {
      toggleFreeze(true);
    }

    if (moveForward && move) {
      neck.translateZ(- movementSpeed);
      neck.translateY(camera.rotation.x * verticalSpeed);
    }

    if (moveBackward && move) {
      neck.translateZ(movementSpeed);
      neck.translateY(- camera.rotation.x * verticalSpeed);
    }
      
    if (neck.position.z < minHeight) {
      neck.position.z = minHeight;
    }

    if (neck.position.z > maxHeight) {
      neck.position.z = maxHeight;
    }

    var absX = Math.abs(movementX) * lookSpeed;
    var absY = Math.abs(movementY) * lookVerticalSpeed;
    if (movementX < 0 && look) {
      neck.rotation.y += Three.Math.degToRad(absX);
    }
    else if (movementX > 0 && look){
      neck.rotation.y -= Three.Math.degToRad(absX);
    }

    if (movementY < 0 && look) {
      camera.rotation.x += Three.Math.degToRad(absY); 
    }
    else if (movementY > 0 && look){
      camera.rotation.x -= Three.Math.degToRad(absY);
    }
      
    if (camera.rotation.x < minAngle) {
      camera.rotation.x = minAngle;
    }
      
    if (camera.rotation.x > maxAngle) {
      camera.rotation.x = maxAngle;
    }
    //console.log(neck.position);
  } 
     
  handleResize();
  
  return {
    'update' : update,
    'toggleFreeze' : toggleFreeze,
    'toggleMove' : toggleMove,
    'toogleLook' : toggleLook
  };
});
