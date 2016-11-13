/**
 * @file
 * Persistent node terrain !
 */
var vertices = [];
exports.getVertices = function() {
  return vertices;
}

exports.setVertices = function(index, value) { 
  vertices[index] = value;
}
