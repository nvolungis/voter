module.exports = function(app, express){
  app.use(express.bodyParser());
  app.set('views', __dirname + '/../views')
  app.set('view engine', 'jade')
  app.use(express.static(__dirname + '/../bower_components'));
  app.use(express.static(__dirname + '/../public'));
};
