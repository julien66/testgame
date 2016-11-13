/**
 * @file
 * Effects elevation module.
 */
define(['controls/mouse', 'app/socket'], function(mouse, socket) {
  var update = function(terrain, cursorInfo, lightsInfo, delta) {
    if (cursorInfo && cursorInfo.vertex) {
      var mouseState = mouse.getState();
      var diff = 0;
      var change = false;
      if (mouseState.leftIsDown) {
          diff = 5;
          change = true;
      }
      else if(mouseState.rightIsDown) {
          diff = -5;
          change = true;
      }
      if (terrain.geometry.vertices[cursorInfo.vertex] && change) {
        // Convert world vertex to local vertex. 
        terrain.geometry.vertices[cursorInfo.vertex].z += diff;
        socket.emit('terrainChange',  {
          id : socket.id,
          index : cursorInfo.vertex,
          value : terrain.geometry.vertices[cursorInfo.vertex].z,
        });
        terrain.geometry.computeFaceNormals();
        terrain.geometry.computeVertexNormals();
        terrain.geometry.verticesNeedUpdate = true;
        terrain.geometry.normalsNeedUpdate = true;
      }
    }
  }

  return {
    'update' : update,
  }
});
