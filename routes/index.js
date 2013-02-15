var _  = require('underscore');
_.str = require('underscore.string');
_.mixin(_.str.exports());
_.str.include('Underscore.string', 'string'); // => true

var portsList = ['Auckland'
			,'Bluff'
			,'Dunedin'
			,'Gisborne'
			,'Lyttleton'
			,'MarsdenPoint'
			,'Napier'
			,'Nelson'
			,'Onehunga'
			,'Picton'
			,'PortChalmers'
			,'Taranaki'
			,'Tauranga'
			,'Timaru'
			,'Wellington'
			,'Westport'
	];

exports.index = function(req, res){
	//humanise name portChalmers --> Port Chalmers
	var humanPortName = _.map(portsList, function(item) {
		return _.chain(item).humanize().titleize().value();
	});

	//res.render('bootstrap', {title: 'NZ Tides', ports: portsList, humanPortName: humanPortName});
	res.render('ink', {title:'Te Tai Tides'});
  //res.render('index', { title: 'Tides', ports: portsList});
};

