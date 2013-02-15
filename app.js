var express = require('express')
  , routes = require('./routes')
  , getPort = require('./routes/getPort')
  , http = require('http')
  , json = require('jsonreq')
  , connect = require('connect')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(connect.compress());
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.compress());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index); //list of ports
app.get('/:name', getPort.getPort); //info for port
//app.get('/:name/:date', getPort.getDate); //port info for specific day

//API
app.get('/:name/csv', getPort.getCSV);
app.get('/:name/json', getPort.getJSON);
//app.get('/:name/:date/json', getPort.getDateJSON); //not working yet

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
