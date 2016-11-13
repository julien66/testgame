/**
 * @file
 * Lighting module for the game.
 */
define(['three'], function(Three) {
  var update = function(terrain, cursorInfo, lightsInfo, delta) {
    var sun = lightsInfo;
    terrain.material.uniforms.lightingSunDirection.value = new Three.Vector3(- sun.x, - sun.y, - sun.z).normalize();
    //console.log(sun);
  }
 
  var uniforms = {
    lightingSunDirection : {type : 'v3' , value : new Three.Vector3(-1, 0, 0)},
  };

  var terrainVertexDeclare = [
    "uniform vec3 lightingSunDirection;",
    "varying float lightingNormal;",
  ].join("\n"); 

  var terrainVertexLogic = [
    "lightingNormal = dot(lightingSunDirection, normal);",
    "gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);",
  ].join("\n");
  
  var terrainFragmentDeclare = [
    "uniform vec3 lightingSunDirection;",
    "varying float lightingNormal;",
  ].join("\n");

  var terrainFragmentLogic = [
    "gl_FragColor = gl_FragColor * (1.0 - lightingNormal);",
  ].join("\n");

  return {
    'update' : update,
    'terrainShader' : {
      'uniforms' : uniforms,
      'vertexDeclare' : terrainVertexDeclare,
      'vertexLogic' : terrainVertexLogic,
      'fragmentDeclare' : terrainFragmentDeclare,
      'fragmentLogic' : terrainFragmentLogic,
    }
  }
});
