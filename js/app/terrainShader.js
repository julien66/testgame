/**
 * @file
 * Terrain Shader module.
 *
 * Simple shader for the terrain.
 * It is fed by some sort of effects.
 * An "effect" can add it's own transformaton to a given shader.
 * 
 * @see app/effects.js
 * effect.js will ask for every effects if they want to transform
 * a given shader trought getShaderEffects().
 * If an effect is interested it must provide details about the
 * transformation trought a simple object.
 * Simple yet usefull API to deals with shader and effects.
 * See effects/cursorMove for acutal exemple.
 */

define(['three', 'app/effects'], function(Three, effects) {
  
  var tShader = function () {
    var shaderEffects = effects.getShaderEffects("terrainShader");
  
    // Uniforms.
    var uniformArray = [ 
    ];

    for (var i in shaderEffects) {
      uniformArray.push(shaderEffects[i].uniforms);
    }

    var uniforms = Three.UniformsUtils.merge(uniformArray);

    // Vertex Shader
    var vertexShader = "";
    for (var i in shaderEffects) {
      vertexShader += shaderEffects[i].vertexDeclare;
    }
    vertexShader += [
      "",
	    "void main() {",
      "",
    ].join("\n");
    for (var i in shaderEffects) {
      vertexShader += shaderEffects[i].vertexLogic;
    }
    vertexShader += [
      "",
	    "}"
	  ].join("\n")
	
    // Fragment Shader
    var fragmentShader = "";
    for (var i in shaderEffects) {
      fragmentShader += shaderEffects[i].fragmentDeclare;
    }
    fragmentShader += [
      "",
      "void main() {",
      "",
    ].join("\n");
    for (var i in shaderEffects) {
      fragmentShader += shaderEffects[i].fragmentLogic;
    }
    fragmentShader += [
      "",
      "}",
      "",
    ].join("\n");

    return {
      uniforms : uniforms,
      vertexShader : vertexShader,
      fragmentShader : fragmentShader,
    }
  }

  return tShader;
});
