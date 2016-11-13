/**
 * @file
 * Mouse controls module for the game.
 */
define([], function() {
  var clientX = 0;
  var clientY = 0;
  var pageX = 0;
  var pageY = 0;

  var leftIsDown = false;
  var rightIsDown = false;

  var onMouseMove = function(e) {
    clientX = e.clientX;
    clientY = e.clientY;
    pageX = e.pageX;
    pageY = e.pageY;
  }

  var onMouseUp = function(e) {
    e.preventDefault();
    e.stopPropagation();
    switch (e.button) {
      case 0: leftIsDown = false; break;
      case 2: rightIsDown = false; break;
    }
    mouseIsDown = false;
  }

  var onMouseDown = function(e) {
    e.preventDefault();
    e.stopPropagation();
    switch (e.button) {
      case 0: leftIsDown = true; break;
      case 2: rightIsDown = true; break;
    }
  }

  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  }, false );
  document.addEventListener('mousemove', onMouseMove, false);
  document.addEventListener('mousedown', onMouseDown, false);
  document.addEventListener('mouseup', onMouseUp, false);

  var getPosition = function() {
    return {
      clientX : clientX,
      clientY : clientY,
      pageX : pageX,
      pageY : pageY,
    }
  }

  var getState = function() {
    return {
      leftIsDown : leftIsDown,
      rightIsDown : rightIsDown,
    }
  }

  return {
    getPosition : getPosition,
    getState :getState, 
  }
});
