/**
 * @file
 * terrainMaterial module.
 */
define(['three', 'app/terrainShader'], function(Three, terrainShader) {
 
  var createMaterial = function () {
    var tShader = new terrainShader();
    var uniformsTerrain = tShader.uniforms; 
    var defines = {};
    
    var material = new Three.ShaderMaterial({
      uniforms: uniformsTerrain,
      vertexShader: tShader.vertexShader,
      //vertexColors: Three.VertexColors, 
      fragmentShader: tShader.fragmentShader,
      //lights: true,
      //fog: true,
    });
  
    var grassT = material.uniforms.tiledTextureGrass.value;
    grassT.needsUpdate = true;
    return material;
  }
  
  return createMaterial;
});
