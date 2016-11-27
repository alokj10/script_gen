var express 		= require('express');
var http 			= require('http');
var path 			= require('path');
var app 			= express();
var fs 				= require('fs');
var bodyParser 		= require('body-parser');
var session 		= require('express-session');

// database connection
//var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/mydb');

// some environment variables
console.log(path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.env.PORT || 8080);
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/public');
app.set('view engine', 'html');

app.set('generatorPath', __dirname + '/server/generators/');
app.set('controllerPath', __dirname + '/server/serviceControllers/');
app.set('writerPath', __dirname + '/server/writers/');

console.log('generator path: ' + app.get('generatorPath'));
console.log('controller path: ' + app.get('controllerPath'));
console.log('writer path: ' + app.get('writerPath'));

//app.use(app.router);
app.use(session({secret: 'ssshhhhh', resave: true, saveUninitialized: true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// dynamically include routes (Controller)
fs.readdirSync('./server/serviceControllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
  		console.log(file);
      route = require('./server/serviceControllers/' + file);
	    // console.log(file.indexOf('Controller'));
	    if(file.indexOf('Controller') > 0)
	    {
	    	// console.log('found controller');
	    	  route.controller(app);
	  	}
	  	else
	  	{
	  		//require('./controllers/' + file);
	  	}
  }
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});