var _ = require('underscore'),
    Cluster;

Cluster = function(board, five, pins){
  this.five = five;
  this.board = board;
  this.intensity = 0;

  this.leds = _.map(pins, function(pin){
    return new five.Led(pin);
  });
};

_.extend(Cluster.prototype, {
  fadeAll: function(value, duration){
    this.leds.forEach(function(el, i, array){
      el.fade(value, duration);
    });
  },

  randomFade: function(len) {
    var partitionedLeds = this.getPartitionedLeds(),
        that = this;

    partitionedLeds.leader.fade(255, 100);
    board.wait(110, function(){
      partitionedLeds.leader.fade(that.intensity, len);
    });

    partitionedLeds.followers.forEach(function(led){
      led.fade(that.intensity, len);
    });
  },

  increment: function(){
    this.intensity += 10
  },

  getPartitionedLeds: function(){
    var leader = this.leds[Math.floor(Math.random() * this.leds.length)],
        followers = _.clone(this.leds);

    followers.splice(this.leds.indexOf(leader), 1);

    return {
      leader: leader,
      followers: followers
    }
  },
  
  reset: function(){
    this.intensity = 0;
    this.fadeAll(this.intensity, 500);
  }
});

module.exports = Cluster;
