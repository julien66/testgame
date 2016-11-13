/**
 * @file
 * Node task module. Generating tasks for the day.
 */
// The task is just an array of turnpoint object. 
var task = [];
// Latest day.
var pastDay = 0;

// Warning !! The map wisth is hardcoded from app/param !
var width = 960;

var setTask = function() {
  var newTask = [];
  for (var  i = 0; i < 5; i++) {
    newTask.push({
      index : i,
      x : (Math.random() * width) - (width / 2) ,
      y : (Math.random() * width) - (width / 2),
      radius : 10.0,
    });
  }
  task = newTask;
}

exports.getTask = function (day) {
  if (day > pastDay ) {
    pastDay = day;
    setTask();
  }
  return task;
}
