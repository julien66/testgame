/**
 * @file
 * Glider Shadow module
 *  
 * @trouble : Flyers shadows are done by passing a position array 
 * to the shader as a uniform. Unfortunatly the array size MUST 
 * be specified during declaration...
 * I had to set a maximum # of flyers. With a uniform containing 
 * the real actual number.
 */
define(['three', 'app/param'], function(Three, param) {
  var update = function(terrain, cursorInfo, lightInfo, delta, flyersInfo) {
    var positionArray = [];
    for (var id in flyersInfo) {
      var position = flyersInfo[id].getPosition();
      positionArray.push(position);
    }
    // Storing real # of flyers as uniform.
    terrain.material.uniforms.gliderShadowLength.value = positionArray.length;
    var fullArray = fillArray(positionArray);
    // Passing the whole bunch of positions to the shader.
    terrain.material.uniforms.gliderShadow.value = fullArray;
  }

  /**
   * This function is an helper to fill the real array with fake
   * 0.0 position.
   */
  var fillArray = function(origin) {
    var newArray = origin;
    for (var z = newArray.length; z < 10; z++) {
      newArray.push(new Three.Vector3(0.0, 0.0, 0.0));
    }
    return newArray;
  }

  var uniforms = {
    'gliderShadowLength' : { type : 'i', value : 0 },
    'gliderShadow' : { type : 'v3v' , value : fillArray(Array()) },
    'gliderShadowRadius' : { type : 'f' , value : param.flyers.paraglider.shadowRadius },
    'gliderShadowColor' : { type : 'v4', value : param.flyers.paraglider.shadowColor },
    'gliderShadowMyColor' : { type : 'v4', value : param.flyers.paraglider.myShadowColor },
  };
  
  var terrainVertexDeclare = [
    "uniform vec3 gliderShadow[10];",
    "uniform int gliderShadowLength;",
    "uniform float gliderShadowRadius;",
    "uniform vec4 gliderShadowColor;",
    "uniform vec4 gliderShadowMyColor;",
  ].join("\n");
  
  var terrainVertexLogic = [
    "",
  ].join("\n");
  
  var terrainFragmentDeclare = [
    "uniform vec3 gliderShadow[10];",
    "uniform int gliderShadowLength;",
    "uniform float gliderShadowRadius;",
    "uniform vec4 gliderShadowColor;",
    "uniform vec4 gliderShadowMyColor;",
  ].join("\n");

  var terrainFragmentLogic = [
    "for (int i = 0; i < 10; i++) {",
      // I break the for loop to the real # of flyers...
      "if (i == gliderShadowLength) {",
        "break;",
      "}",
      "if (pow((vPosition.x - gliderShadow[i].x), 2.0) + pow((vPosition.y - gliderShadow[i].y), 2.0) < pow(gliderShadowRadius, 2.0)) {",
        "if (i == 0) {",
          "gl_FragColor = gliderShadowMyColor;",
        "}",
        "else {",
          "gl_FragColor = gliderShadowColor;",
        "}",
      "}",
    "}",
  ].join("\n");

  return {
    'update' : update,
    'terrainShader' : {
      'uniforms' : uniforms,
      'vertexDeclare' : terrainVertexDeclare,
      'vertexLogic' : '',
      'fragmentDeclare' : terrainFragmentDeclare,
      'fragmentLogic' : terrainFragmentLogic,
    }
  } 
});
