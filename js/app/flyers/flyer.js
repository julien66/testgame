/**
 * @module
 * Flyer module for the game
 */
define(['three', 'app/colladaLoader', 'app/param', 'controls/keyboard', 'app/socket', 'flyers/facePointer', 'weather/wind', 'flyers/windLift', 'flyers/landingDetection'], 
  function(Three, colladaLoader, param, keyboard, socket, facePointer, wind, windLift, landingDetection) {
  var flyer = function (mid, parameters) {
    var model;
    var id = mid;
    var type = 'paraglider';
    var speedCoef = param.flyers.speedCoef;
    var speed = param.flyers[type].speed / param.flyers.speedCoef;
    var loaded = false;
    var me = false;
    var task = [];
    var nextTurnpoint = 0;
    var landed = false;
    var startX = parameters ? parameters.position.x : 0;
    var startY = parameters ? parameters.position.y : 0 ;
    var startZ = parameters ? parameters.position.z : 100;
    var rotX = parameters ? parameters.rotation.x : 0;
    var rotY = parameters ? parameters.rotation.y : 0;
    var rotZ = parameters ? parameters.rotation.z : 0;
    if (id == socket.id) {
      me = true;
    }

    this.loadModel = function() {
      var loader = new colladaLoader();
      loader.load('assets/collada/gliders/ok.dae', function (result) {
        model = result.scene.children[0];
        modelInitPosition();
        model.scale.set(0.05, 0.05, 0.05);
        var e = document.createEvent("CustomEvent");
        e.initCustomEvent('gliderLoaded', false, false, {
          'glider' : model,
        });
        loaded = true;
       
        if (me == true) {
          var simpleModel = getSimpleFlyer();
          socket.emit('playerAdded', simpleModel);
        }
        document.dispatchEvent(e);
      });
    }
    
    var getSimpleFlyer = function() {
      return {
        'id': id,
        'position':  model.position,
        'rotation': model.rotation,
      }
    }
    
    var normalizedRadians = function(radians) {
      return (radians < 0) ?
        (Math.PI * 2) + (radians % (Math.PI * 2)) :
        radians % (Math.PI * 2);
    }

    var checkTurnpoint = function() {
      if (task.length > 0 && nextTurnpoint <= task.length) {
        var tpInfos = task[nextTurnpoint].getInfo();
        if (Math.pow((model.position.x - tpInfos.x), 2.0) + Math.pow((model.position.y - tpInfos.y), 2.0) < Math.pow(tpInfos.radius, 2.0)) {
          // Turnpoint tagged !!
          var e = document.createEvent("CustomEvent");
          e.initCustomEvent('turnpointTagged', false, false, {
            'turnpoint' : nextTurnpoint,
          });
          document.dispatchEvent(e);
          nextTurnpoint++;
        }
      }
    }

    this.move = function() {
      if (loaded) {
        // Turning Left.
        if (me && keyboard.isKeysDown([37])) {
          model.rotation.z += 0.03;
        }
        // Turning Right.
        if (me && keyboard.isKeysDown([39])) {
          model.rotation.z -= 0.03;
        }
        // Moving on x and y axis is just a matter of model orintation and speed.
        var radians = normalizedRadians(model.rotation.z + Math.PI / 2);
        var vectorWind = wind.getVectorWind();
        model.position.x += (Math.cos(radians) * speed) + vectorWind.x / speedCoef;
        model.position.y += (Math.sin(radians) * speed) + vectorWind.y / speedCoef;
        if (me) {
          checkTurnpoint();
          socket.emit('playerMove', getSimpleFlyer()); 
        }

        // moving on z axis needs to deal with various lifts effects
        model.position.z += param.flyers[type].tc / (param.flyers.verticalSpeedCoef);
        var faces = facePointer.getVerticalFaces(model.position);
        if (typeof faces != 'undefined') {
          landingDetection.check(faces, id);
          model.position.z += windLift.getLift(model.position, faces, vectorWind, wind.getStrength());
        }

      }
    }
   
    this.getId = function() {
      return id;
    }

    this.getPosition = function() {
      if (typeof model != 'undefined') {
        return new Three.Vector3(model.position.x, model.position.y, model.position.z);
      }
      return false;
    }

    this.setSimpleFlyer = function(pilot) {
      if (typeof pilot != 'undefined' && typeof model != 'undefined') {
        model.position.x = pilot.position.x;
        model.position.y = pilot.position.y;
        model.position.z = pilot.position.z;
        model.rotation.x = pilot.rotation._x;
        model.rotation.y = pilot.rotation._y;
        model.rotation.z = pilot.rotation._z;
      }
    }

    this.trash = function() {
      var e = document.createEvent("CustomEvent");
      e.initCustomEvent('gliderGone', false, false, {
        'glider' : model, 
      });
      document.dispatchEvent(e);
    }

    var onNewTaskSet = function(e) {
      task = e.detail.task;
      nextTurnpoint = 0;
    }

    var modelInitPosition = function() {
      model.position.x = startX;
      model.position.y = startY;
      model.position.z = startZ;
      model.rotation.x = rotX;
      model.rotation.y = rotY;
      model.rotation.z = rotZ;
    }

    var onFlyerLanded = function(e) {
      if (e.detail.id == id)  {
        modelInitPosition();
        nextTurnpoint = 0;
      }
    }

    document.addEventListener('newTaskSet', onNewTaskSet, false);
    document.addEventListener('flyerLanded', onFlyerLanded, false);
  }

  return flyer;
});
