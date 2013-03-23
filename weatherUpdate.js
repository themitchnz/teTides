//IMPORT MODULES
var yql = require('yql');
var _  = require('underscore');

//VARIABLES
var timeInterval = 60000; // default 60 minutes
var weatherData = {
	Auckland:"",
	Bluff:"",
	Dunedin:"",
	Gisborne:"",
	Lyttleton:"",
	MarsdenPoint:"",
	Napier:"",
	Nelson:"",
	Onehunga:"",
	Picton:"",
	PortChalmers:"",
	Taranaki:"",
	Tauranga:"",
	Timaru:"",
	Wellington:"",
	Westport:""
};

/********************
	MODULE EXPORTS
	
	/** SET FUNCTIONS
	setTimeInterval - Change default interval time from 60 minutes
	begin - Starts the module running

	/** GET 
	weatherData - the weather object
********************/

var weatherUpdate = exports;

weatherUpdate.weatherData = weatherData;

weatherUpdate.setTimeInterval = function(time) {
	timeInterval = time * 60 * 1000; //minutes
};

//entry point
weatherUpdate.begin = function() {
	intervalFunction(); //initial run
	setInterval(intervalFunction, timeInterval); //interval run every x minutes
};

/***************
	INTERNALS
***************/

function intervalFunction() {
	//console.log('updating weather');
	_.each(weatherData, function (value, key){
		var woeid = getWoeid(key);
		getWeather(woeid,key);
	});
};

function getWeather(woeid, key) {
	var theData = "";

	yql.exec("select * from weather.forecast where (woeid = @port_id) and u='c'", function(response){
		var r = response.query.results.channel;
		var theData = {
			"wText": r.item.condition.text,
			"wDate": r.item.condition.date,
			"wTemp": r.item.condition.temp + "°C",
			"wHigh": r.item.forecast[0].high + "°C",
			"wLow": r.item.forecast[0].low + "°C",
			"wSunrise": r.astronomy.sunrise,
			"wSunset": r.astronomy.sunset,
			"wWindSpeed": Math.round(r.wind.speed) + " km/hr",
			"wWindDirection": degToCompass(r.wind.direction)
		};
		weatherData[key] = theData;
	},{"port_id": woeid});
};

function getWoeid(portName) {
	var woeid;
	switch(portName){
		case 	"Auckland" 		: woeid = 2348079;break;
        case 	"MarsdenPoint"  : woeid = 2349427;break;
        case  	"Onehunga" 		: woeid = 22726481;break;
        case  	"Tauranga" 		: woeid = 2350751;break;
        case 	"Wellington" 	: woeid = 2351310;break;
        case   	"Taranaki" 		: woeid = 2349680;break;
        case  	"Gisborne" 		: woeid = 2348582;break;
        case   	"Napier" 		: woeid = 2349663;break;
        case   	"Nelson" 		: woeid = 2349669;break;
        case 	"Lyttleton"		: woeid = 2349260;break;
        case 	"Westport"		: woeid = 2351332;break;
        case  	"Picton"		: woeid = 2350121;break;
        case   	"Bluff" 		: woeid = 2348202;break;
        case   	"Timaru" 		: woeid = 2350910;break;
        case	"PortChalmers" 	: woeid = 2350191;break;
        case   	"Dunedin" 		: woeid = 2348444;break;
	};
	return woeid;
};

function degToCompass(num) {
 	var val=Math.round((num/22.5)+.5);
    var arr=["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
    return arr[(val % 16)];
};