/* REQUIRE STATMENTS */
var moment = require('moment');
var fs = require ('fs');

var _  = require('underscore');
_.str = require('underscore.string');
_.mixin(_.str.exports());
_.str.include('Underscore.string', 'string'); // => true

/* EXPORT ROUTES */

exports.index = function(req, res){
	res.render('index', {title:'Te Tides'});
};

exports.about = function(req, res){
	res.render('about', {title:'Te Tides'});
};

exports.getPort = function (req, res) {

	//VARIABLES GOING TO HTML
	var humanPortName =  humaniseName(req.params.name); //portChalmers -> Port Chalmers
	var titleDate = moment.utc().add('h', 13).format("MMM Do YYYY"); // "February 14th 2010"
	var weather = global.weatherData[req.params.name];
	
 	//LOAD SAVED JSON TIDE DATA
	var data = loadJSON(req.params.name);

	var day = moment.utc().add('h', 13).format('DDD') - 1;
	var tideData = (data[day].tide1Height > data[day].tide2Height) ? 'high' : 'low';
	
	var m = moment().utc();

	var tideString1 = data[day].dayMonth +'-'+data[day].month + '-' + data[day].year + '-' + data[day].tide1 + ' +1300';
	var tideTest1 = moment(tideString1, 'D-M-YYYY-HH:mmZ').add('h',1);
	var tide1Human = tideTest1.from(m);
	var tide1Time = tideTest1.add('h', 13).format('h:mma');

	var tideString2 = data[day].dayMonth +'-'+data[day].month + '-' + data[day].year + '-' + data[day].tide2 + ' +1300';
	var tideTest2 = moment(tideString2, 'D-M-YYYY-HH:mmZ').add('h',1);
	var tide2Human = tideTest2.from(m);
	var tide2Time = tideTest2.add('h', 13).format('h:mma');

	var tideString3 = data[day].dayMonth +'-'+data[day].month + '-' + data[day].year + '-' + data[day].tide3 + ' +1300';
	var tideTest3 = moment(tideString3, 'D-M-YYYY-HH:mmZ').add('h',1);
	var tide3Human = tideTest3.from(m);
	var tide3Time = tideTest3.add('h', 13).format('h:mma');

	var tideString4 = data[day].dayMonth +'-'+data[day].month + '-' + data[day].year + '-' + data[day].tide4 + ' +1300';
	var tideTest4 = moment(tideString4, 'D-M-YYYY-HH:mmZ').add('h',1);
	var tide4Human = tideTest4.from(m);
	var tide4Time = tideTest4.add('h', 13).format('h:mma');

	res.render('port', { 
		 title: humanPortName
		, now: titleDate
		, tide: data[day]
		, tide1: tideData
		, tide1Human: tide1Human
		, tide1Time: tide1Time
		, tide2Human: tide2Human
		, tide2Time: tide2Time
		, tide3Human: tide3Human
		, tide3Time: tide3Time
		, tide4Human: tide4Human
		, tide4Time: tide4Time
		, weather: weather
	}); 
};

/* HELPER FUNCTIONS */

function humaniseName(portName) {
	return _.chain(portName).humanize().titleize().value();
};

function loadJSON(portName) {
	var path = portName + '.json';
	var data = require(path);
	return data;
};



