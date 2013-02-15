var moment = require('moment');
var fs = require ('fs');
var json = require('jsonreq');
//var sugar = require('sugar');

var _  = require('underscore');
_.str = require('underscore.string');
_.mixin(_.str.exports());
_.str.include('Underscore.string', 'string'); // => true

exports.getPort = function (req, res) {

	



	//VARIABLES GOING TO HTML
	var humanPortName = _.chain(req.params.name).humanize().titleize().value(); //human port names
	var now = moment().format("MMM Do YYYY"); //current date
	var yql;

	// GET WEATHER 
	json.get("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D2348079%20AND%20u%3D'c'&format=json", function (err, data) {
        var weatherJSON = data.query.results.channel;

        yql = {
        	  location :weatherJSON.location
        	, units :weatherJSON.units
        	, wind :weatherJSON.wind
        	, atmosphere :weatherJSON.atmosphere
        	, astronomy :weatherJSON.astronomy
        	, image :weatherJSON.image
        	, item :weatherJSON.item
        };

		//LOAD SAVED JSON TIDE DATA
			
		var path = req.params.name + '.json';
		var data = require(path);
		var day = moment().format('DDD');
		var tideData = (data[day - 1].tide1Height > data[day - 1].tide2Height) ? 'high' : 'low';
		
		var m = moment();
		
		var tideString1 = data[day - 1].dayMonth +'-'+data[day - 1].month + '-' + data[day - 1].year + '-' + data[day - 1].tide1 + '+1300'
		var tideTest1 = moment(tideString1, 'D-M-YYYY-HH:mmZZ');
		var tide1Human = tideTest1.from(m);
		var tide1Time = tideTest1.format('h:mma');

		var tideString2 = data[day - 1].dayMonth +'-'+data[day - 1].month + '-' + data[day - 1].year + '-' + data[day - 1].tide2 + '+1300'
		var tideTest2 = moment(tideString2, 'D-M-YYYY-HH:mmZZ');
		var tide2Human = tideTest2.from(m);
		var tide2Time = tideTest2.format('h:mma');

		var tideString3 = data[day - 1].dayMonth +'-'+data[day - 1].month + '-' + data[day - 1].year + '-' + data[day - 1].tide3 + '+1300'
		var tideTest3 = moment(tideString3, 'D-M-YYYY-HH:mmZZ');
		var tide3Human = tideTest3.from(m);
		var tide3Time = tideTest3.format('h:mma');

		var tideString4 = data[day - 1].dayMonth +'-'+data[day - 1].month + '-' + data[day - 1].year + '-' + data[day - 1].tide4 + '+1300'
		var tideTest4 = moment(tideString4, 'D-M-YYYY-HH:mmZZ');
		var tide4Human = tideTest4.from(m);
		var tide4Time = tideTest4.format('h:mma');

		var fullTime = moment().format("dddd, MMMM Do YYYY, h:mm:ss a Z"); // "Sunday, February 14th 2010, 3:25:50 pm"

		res.render('inkPort', { 
			title: humanPortName
			, now: now
			, fullTime: fullTime
			, tide: data[day - 1]
			, tide1: tideData
			, tide1Human: tide1Human
			, tide1Time: tide1Time
			, tide2Human: tide2Human
			, tide2Time: tide2Time
			, tide3Human: tide3Human
			, tide3Time: tide3Time
			, tide4Human: tide4Human
			, tide4Time: tide4Time
			, yql: yql
		}); 
    });
};

exports.getDate = function (req, res) {
	//get correct json entry
	//var date = req.params.date - 1;

	//if (date > 365) {
		//date = 365;
	//};
		
	//var path = req.params.name + '.json';
	//var fulldata = require(path);
	//var data = fulldata[req.params.date - 1];

	//var day = moment([data.year, data.month - 1, data.dayMonth]); // July 10th
	//var now = day.format("MMM Do YYYY"); //Jan 01 2013
	
	//res.render('port', { title: req.params.name, now: now, tide: data});
};

exports.getCSV = function (req, res) {
	var path = 'public/data/' + req.params.name + '.csv';

	res.setHeader('Content-disposition', 'attachment; filename=' + req.params.name + '.csv');
	res.setHeader('Content-type', 'text/csv');
	res.sendfile(path);
};

exports.getJSON = function (req, res) {
	var path = 'public/data/' + req.params.name + '.json';

	res.setHeader('Content-disposition', 'attachment; filename=' + req.params.name + '.json');
	res.setHeader('Content-type', 'application/json');
	res.sendfile(path);
};

exports.getDateJSON = function (req, res) {
	var path = req.params.name + '.json';
	var fullJSON = require(path);
	var data = fullJSON[req.params.date];

	//res.setHeader('Content-disposition', 'attachment; filename=test.json');
	//res.setHeader('Content-type', 'application/json');
	//res.sendfile(JSON.parse(data));
};