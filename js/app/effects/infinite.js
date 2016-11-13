/**
 * @file
 * Infinite world effects module for the game.
 */
define(['three'], function (Three) {

  var uniforms = {
    'zoneXMin' : { type : 'f', value : 0 },
    'zoneXMax' : { type : 'f', value : 0 },
    'zoneYMin' : { type : 'f', value : 0 },
    'zoneYMax' : { type : 'f', value : 0 },
    'zoneNum' : { type : 'f', value : 0 },
  }

  var terrainVertexDeclare = [
    "uniform float zoneXMin;",
    "uniform float zoneXMax;",
    "uniform float zoneYMin;",
    "uniform float zoneYMax;",
    "uniform float zoneNum;",
  ].join("\n");

  var terrainFragmentDeclare = [
    "uniform float zoneXMin;",
    "uniform float zoneXMax;",
    "uniform float zoneYMin;",
    "uniform float zoneYMax;",
    "uniform float zoneNum;",
  ].join("\n");
  
  return {
    'terrainShader' : {
      'uniforms' : uniforms,
      'vertexDeclare' : terrainVertexDeclare,
      'vertexLogic' : '',
      'fragmentDeclare' : terrainFragmentDeclare,
      'fragmentLogic' : '',
    }
  }
});
