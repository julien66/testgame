/**
 * @file
 * Effect module.
 *
 * When the cursor move.
 */
define(['app/param', 'app/helper'], function(param, helper) {
  var update = function (terrain, cursorInfo, lightsInfo,  delta) {
    if (cursorInfo && cursorInfo.position) {
      terrain.material.uniforms.cursorZone.value = cursorInfo.zone;
      var y = Math.floor(cursorInfo.zone / 3);
      var x = cursorInfo.zone - (3 * y);
      //console.log(zone,x,y);
      var cursorX = cursorInfo.position.x - (x * (param.grid.width / 3));
      var cursorY = cursorInfo.position.y - (y * (param.grid.width / 3));
      terrain.material.uniforms.cursorX.value = cursorX;
      terrain.material.uniforms.cursorY.value = cursorY;
      //console.log(cursorX, cursorY);
    }
  }
  
  var uniforms = {
    'cursorX' : { type: "f", value: 0 },
    'cursorY' : { type: "f", value: 0 },
    'cursorZone' : { type: "f", value: 0 },
    'cursorType' : { type: "i", value: 1 },
    'cursorSquareColor' : { type: "v4", value: param.cursor.squareColor },
    'cursorCircleRadius' : { type: "f", value: param.cursor.circleRadius }
  };

  var terrainVertexDeclare = [
    "uniform float cursorX;",
    "uniform float cursorY;",
    "uniform float cursorZone;",
    "uniform int cursorType;",
    "uniform vec4 cursorSquareColor;",
    "uniform float cursorCircleRadius;",
  ].join("\n");


  var terrainFragmentDeclare = [ 
    "uniform float cursorX;",
    "uniform float cursorY;",
    "uniform float cursorZone;",
    "uniform int cursorType;",
    "uniform vec4 cursorSquareColor;",
    "uniform float cursorCircleRadius;",
  ].join("\n");

  var terrainFragmentLogic = [
    "if (zoneNum == cursorZone) {",
      "if (cursorType == 0) {",
        "float difX = vPosition.x - (floor(cursorX / gridSquareSize) * gridSquareSize);",
        "float difY = vPosition.y - (floor(cursorY / gridSquareSize) * gridSquareSize);",
        "if (difX < gridSquareSize && difX > 0.0 && difY < gridSquareSize && difY > 0.0) {",
          "gl_FragColor = cursorSquareColor;",
        "}",
      "}",
      "else if (cursorType == 1) {",
        "float centerX = (floor((cursorX / gridSquareSize) + 0.5) * gridSquareSize);",
        "float centerY = (floor((cursorY / gridSquareSize) + 0.5) * gridSquareSize);",
        /*"if (mod(zoneNum, 2.0) != 0.0) {",
          "centerX = -centerX;",
          "centerY = -centerY;",
        "}",*/
        "if (pow((vPosition.x - centerX), 2.0) + pow((vPosition.y - centerY), 2.0) < pow(cursorCircleRadius, 2.0)) {",
         // "gl_FragColor = cursorSquareColor;",
        "}",
      "}",
    "}",
  ].join("\n");
  
  return {
    'update' : update,
    'terrainShader' : {
      uniforms : uniforms,
      vertexDeclare : terrainVertexDeclare,
      vertexLogic : "",
      fragmentDeclare : terrainFragmentDeclare,
      fragmentLogic : terrainFragmentLogic,
    }
  }
}); 
