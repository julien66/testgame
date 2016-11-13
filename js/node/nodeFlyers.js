/**
 * @file
 * Node Module file. Storing flyers.
 */
var flyers = {};
exports.addFlyer = function(flyer) {
  flyers[flyer.id] = flyer;
}

exports.removeFlyer = function(def) {
  delete flyers[def];
  console.log(flyers);
  console.log('remove Flyer');
}

exports.getFlyers = function() {
  return flyers;
}

exports.moveFlyer = function(flyer) {
  flyers[flyer.id] = flyer;
}
