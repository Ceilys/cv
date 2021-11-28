var path = require('path'), 
    express = require('express');

var app = express();

// Display on good directory
app.use('/cv', express.static(path.join(__dirname, 'webapp')));

// For other key words, go on first page
app.get('/', function (req, res) {
	var miniHtml = "Test program of Christophe" + "<BR>"
		+ "/cv   send to a dynamic CV";
	res.send(miniHtml);
});

// Listen to port
var port = process.env.PORT || 8080;
app.listen(port, function () {
	console.log("Listen on port " + port);
	console.log("http://localhost:" + port + "/cv");
});