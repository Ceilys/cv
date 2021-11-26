var http = require('http');
var fs = require('fs');

// User Heroku port or local port
const PORT = process.env.PORT || 5000;

fs.readFile('./webapp/index.html', function (err, html) {

    if (err) throw err;    

    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(PORT);
});