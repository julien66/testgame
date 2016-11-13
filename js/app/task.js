/**
 * @file
 * Task module for the game
 */
define(['three', 'app/param', 'turnpoints/turnpoint', 'app/socket'], function(Three, param, turnpoint, socket) {
  var task = [];

  var onNewDay = function(e) {
    socket.emit('getTask', {
      day : e.detail.time.daySpent,
    });
  }

  var buildTask = function(newTask) {
    var taskArray = [];
    for (var i = 0; i < newTask.length; i++) {    
      var tp = new turnpoint(newTask[i]);
      taskArray.push(tp);
    }
    task = taskArray;
    // Briefing !! We have a new Task.
    var e = document.createEvent("CustomEvent");
    e.initCustomEvent('newTaskSet', false, false, {
      'task' : task,
    });
    document.dispatchEvent(e);
  }

  socket.on('newTask', function(newTask) {
    buildTask(newTask)
  });
  
  var onTurnpointTagged = function(e) {
    var current = e.detail.turnpoint;
    task[current].setColor('tagged');
    if (current + 1 <= task.length) {
      task[current + 1].setColor('next');
    }
  }
  
  var onFlyerLanded = function() {
    if (task.length > 0) {
      for (var i = 0; i < task.length; i++) {
        task[i].setColor('normal');
      }
      task[0].setColor('next');
    }
  }

  document.addEventListener('newDay', onNewDay, false);
  document.addEventListener('turnpointTagged', onTurnpointTagged, false);
  document.addEventListener('flyerLanded', onFlyerLanded, false);
});
