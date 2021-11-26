var path = require('path'), 
    express = require('express');

var app = express();

// Display on good directory
app.use('/ui5', express.static(path.join(__dirname, 'webapp')));
app.use('/wt', express.static(path.join(__dirname, 'walkthrough')));
app.use('/cv', express.static(path.join(__dirname, 'webapp')));

// For other key words, go on first page
app.get('/', function (req, res) {
	var miniHtml = "Test program of Christophe" + "<BR>"
		+ "/wt   check if UI5 is active" + "<BR>"
		+ "/ui5  send to a list (list of Jerry)" + "<BR>"
		+ "/cv   send to a dynamic CV";
	res.send(miniHtml);
});

// Listen to port
var port = process.env.PORT || 0;
app.listen(port, function () {
	console.log("Listen on port " + port);
	console.log("http://localhost:" + port + "/cv");
});