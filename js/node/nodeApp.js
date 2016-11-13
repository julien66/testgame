/**
 * @file
 * Nodejs server part of the game.
 * Using requirejs to share same files from client and server.
 */
var requirejs = require('requirejs');
requirejs.config({
  paths : {
    app : "../app",
  },
  nodeRequire: require,
});

requirejs(['app/param'], function(param) {
  console.log(param);
});
