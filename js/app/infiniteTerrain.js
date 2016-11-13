/**
 * @file
 * Infinite terrain module for the game.
 */
define(['three', 'app/terrainMaterial', 'app/param', 'app/effects', 'app/socket', 'realTerrain/realElevation'], function(Three, terrainMaterial, param, effects, socket, realElevation) {
  
  var mapWidth = param.grid.width;
  var step = param.grid.step;
  
  var geom = new Three.PlaneGeometry(mapWidth, mapWidth, step, step);
  var vertices = geom.vertices;
  var attributesTerrain = {};
 
  for (var i = 0; i < geom.faces.length; i++) {
    //geom.faces[i].color = new Three.Color(0x018E0E);
  }
    
    /*var attributesEffects = effects.getAttributesEffects('terrainAttributes');
    for(var i in attributesEffects) {
      var attributesEffect = attributesEffects[i];
      for (var y in attributesEffect) {
        var attributeEffect = attributesEffect[y];
        attributesTerrain[attributeEffect.name] = {
          'type' : attributeEffect.type,
          'value' : attributeEffect.build(vertices),
        }
      }
    }
    terrainMaterial.attributes = attributesTerrain;*/
    var terrain = new Three.Mesh(geom, 
      /*new Three.MeshBasicMaterial({
        map : Three.ImageUtils.loadTexture("http://37.59.55.69:8000/assets/textures/terrain/grass1.jpg"), 
      })
    );*/new terrainMaterial());
    terrain.dynamic = true;
    
   /*socket.on('terrainUpdate', function(message) {
      if (message.type == 'update') {
        geom.vertices[message.index].z = message.value; 
      }
      else if (message.type == 'init') {
        for (var i = 0; i < message.terrain.length; i++) {
          geom.vertices[i].z = message.terrain[i];
        } 
      }
      geom.computeFaceNormals();
      geom.computeVertexNormals();
      geom.verticesNeedUpdate = true;
      geom.normalsNeedUpdate = true;
    });*/

  //socket.emit('getTerrain', '');
  realElevation.call(geom);
  return terrain;
});
