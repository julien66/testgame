/**
 * @file app/effects.js
 * Effects module for the game.
 *
 * Gather all effects.
 * Feed a given shader with its effects trought getShaderEffects(). 
 * Receive a cursor position and update every Effect.
 *
 * @see app/transform.js
 *
 */
define(['three', 'effects/infinite', 'effects/tiledTexture', 'effects/grid', 'effects/cursorMove', 'effects/elevation', 'effects/lighting', 'effects/gliderShadow'],
function(Three, infinite, tiledTexture, grid, cursorMove, elevation, lighting, gliderShadow) {
  var effects = [infinite, tiledTexture, grid, cursorMove, elevation, lighting, gliderShadow];
  var update = function(terrains, cursorInfo, lightsInfo,  delta, flyersInfo) {
    for (var i in effects) {
      if(effects[i].update) {
        effects[i].update(terrains, cursorInfo, lightsInfo, delta, flyersInfo);
      }
    }
  }

  // Called by shaders. Look for effects and return info.
  var getShaderEffects = function(name) {
    var shaderEffects = [];
    for (var i in effects) {
      if (effects[i][name]) {
        shaderEffects.push(effects[i][name]);
      }
    } 
    return shaderEffects;
  }

  var getAttributesEffects = function(name) {
    var attributesEffects = [];
    for (var i in effects) {
      if (effects[i][name]) {
        attributesEffects.push(effects[i][name]);
      }
    }
    return attributesEffects;
  }

  return {
    'update' : update,
    'getShaderEffects' : getShaderEffects,
    'getAttributesEffects' : getAttributesEffects,
  }
});
