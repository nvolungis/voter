var five    = require('johnny-five'),
    board   = new five.Board(),
    Cluster = require('./cluster.js'),
    EventEm = require('events').EventEmitter,
    bus     = new EventEm();

board.on('ready', function(){
  var clusters = {
    yes: new Cluster(this, five, [3,5,6]),
    no: new Cluster(this, five, [9,10,11])
  };

  bus.on('vote:received', function(type){
    clusters[type].increment();
    clusters[type].randomFade(1000);
  });

  bus.on('reset', function(){
    for(var i in clusters) {
      clusters[i].reset();
    } 
  });
});

module.exports = {
  vote: function(type){
    bus.emit('vote:received', type);
  },

  reset: function(){
    bus.emit('reset');
  }
};
