/**
 * @file
 * Texture per tile effect module for the game.
 */
define(['three', 'image!assets/textures/terrain/grass1.jpg!bust'], function(Three, grassTexture) {
  
  var grassT = new Three.Texture(grassTexture);
  grassT.wrapS = grassT.wrapT = Three.RepeatWrapping;
  grassT.repeat.set(30, 30);

  var terrainUniforms = {
    'tiledTextureGrass' : { type: "t", value: grassT },
    'tiledTextureStep' : { type: "f", value: param.grid.step },
  }

  var terrainVertexDeclare = [
  "",
  "uniform float tiledTextureStep;",
  "varying vec2 tUv;",
  "",
  ].join("\n");

  var terrainVertexLogic = [
    "",
    //"tUv = ((uv / floor((uv * tiledTextureStep))) * tiledTextureStep) - (floor(uv * tiledTextureStep));",
    "tUv = floor(uv * tiledTextureStep);",
    //"tUv = uv;",
    "",
  ].join("\n");
  
  var terrainFragmentDeclare = [
    "",
    "uniform float tiledTextureStep;",
    "uniform sampler2D tiledTextureGrass;",
    "varying vec2 tUv;",
    "",
  ].join("\n");

  var terrainFragmentLogic = [
    "",
    //"gl_FragColor = texture2D(tiledTextureGrass, tUv);",
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
