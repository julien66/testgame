/**
 * @file
 * Gird module for the game.
 */
define(['three', 'app/param'], function(Three, param, grassTexture) {

  var terrainUniforms = {
    'gridThickness' : { type: "f", value: param.grid.lineThickness },
    'gridWidth' : { type: "f", value: param.grid.width },
    'gridStep' : { type: "f", value: param.grid.step },
    'gridSquareSize' : { type: "f", value : param.grid.width / param.grid.step },
    'gridSquareColor' : { type: "v4", value: param.grid.squareColor },
    'gridLineColor' : { type: "v4", value: param.grid.lineColor },
  };

  var terrainVertexDeclare = [
   "uniform float gridThickness;",
   "uniform float gridWidth;",
   "uniform float gridStep;",
   "uniform float gridSquareSize;",
   "uniform vec4 gridSquareColor;",
   "uniform vec4 gridLineColor;",
   "varying vec3 vPosition;",
  ].join("\n");

  var terrainVertexLogic = [
    "",
    "vPosition = position;",
    "",
  ].join("\n");

  var terrainFragmentDeclare = [
    "",
    "uniform float gridThickness;",
    "uniform float gridWidth;",
    "uniform float gridStep;",
    "uniform float gridSquareSize;",
    "uniform vec4 gridLineColor;",
    "uniform vec4 gridSquareColor;",
    "varying vec3 vPosition;",
    "",
  ].join("\n");

  var terrainFragmentLogic = [ 
    "",
    "float lineX = fract(vPosition.x / gridSquareSize);",
    "float lineY = fract(vPosition.y / gridSquareSize);",
    "if (lineX < gridThickness || lineX > 1.0 - gridThickness || lineY < gridThickness || lineY > 1.0 - gridThickness) {",
      "gl_FragColor = gridLineColor;",
    "}",
    "else {",
      "gl_FragColor = gridSquareColor;",
    "}",
    "",
  ].join("\n");

  return {
    'terrainShader' : {
      'uniforms' : terrainUniforms,
      'vertexDeclare' : terrainVertexDeclare,
      'vertexLogic' : terrainVertexLogic,
      'fragmentDeclare' : terrainFragmentDeclare,
      'fragmentLogic' : terrainFragmentLogic,
    }
  }
});
