/*Modules*/
var express = require('express')
  , http = require('http')
  , connect = require('connect')
  , path = require('path');

/*External scripts*/
var router = require('./routes/router')
  , api = require('./routes/api');

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

app.get('/', router.index); //list of ports
app.get('/about', router.about);
app.get('/developers', router.developers); 
app.get('/contact', router.contact); 
app.get('/:name', router.getPort); //info for port
//app.get('/:name/:date', getPort.getDate); //port info for specific day

//API
app.get('/:name/csv', api.getCSV);
app.get('/:name/json', api.getJSON);
//app.get('/:name/:date/json', getPort.getDateJSON); //not working yet

//SETUP WEATHER MODULE
var wu = require('./weatherUpdate');
wu.setTimeInterval(1);
wu.begin();
global.weatherData = wu.weatherData;

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
