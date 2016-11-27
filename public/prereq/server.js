var express 		= require('express');
var http 			= require('http');
var path 			= require('path');
var app 			= express();
var fs 				= require('fs');
var bodyParser 		= require('body-parser');

app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.env.PORT || 8080);
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/public');
app.set('view engine', 'html');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

fs.readdirSync('./server/').forEach(function (file) {
  if(file.substr(-3) == '.js') {
  		console.log(file);
      route = require('./server/' + file);
	    // console.log(file.indexOf('Controller'));
	    if(file.indexOf('Controller') > 0)
	    {
	    	// console.log('found controller');
	    	  route.controller(app);
	  	}
  }
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});