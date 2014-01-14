var board = require('../components/board.js');

module.exports = function(app){
  app.get('/', function(req, res){
    res.render('home');
  });

  app.post('/vote', function(req, res){
    board.vote(req.body.type);
    res.send();
  });

  app.post('/reset', function(req,res){
    board.reset();
    res.send();
  });
};
