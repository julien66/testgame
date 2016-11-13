/**
 * @file
 * Landing detection module for the game.
 */
define([], function() {
  var check = function(faces, id) {
    for (var i = 0; i < faces.length; i++) {
      if (faces[i].distance < 1) { 
        var e = document.createEvent("CustomEvent");
        e.initCustomEvent('flyerLanded', false, false, {
          'id' : id,
        });
        document.dispatchEvent(e);
      }
    }
  }

  return {
    check : check,
  }
});
