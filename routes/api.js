
/* EXPORT CSV DATA */
exports.getCSV = function (req, res) {
	var path = 'public/data/' + req.params.name + '.csv';

	res.setHeader('Content-disposition', 'attachment; filename=' + req.params.name + '.csv');
	res.setHeader('Content-type', 'text/csv');
	res.sendfile(path);
};


/* EXPORT JSON DATA */
exports.getJSON = function (req, res) {
	var path = 'public/data/' + req.params.name + '.json';

	res.setHeader('Content-disposition', 'attachment; filename=' + req.params.name + '.json');
	res.setHeader('Content-type', 'application/json');
	res.sendfile(path);
};


/**/
exports.getDateJSON = function (req, res) {
	var path = req.params.name + '.json';
	var fullJSON = require(path);
	var data = fullJSON[req.params.date];

	//res.setHeader('Content-disposition', 'attachment; filename=test.json');
	//res.setHeader('Content-type', 'application/json');
	//res.sendfile(JSON.parse(data));
};