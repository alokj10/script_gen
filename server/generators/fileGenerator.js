var exports = module.exports = {};
	var fs = require('fs');

	exports.GenerateCssFiles = function(cssDir)
	{
		var bootstrapcssFile = './public/prereq/public/css/vendor/bootstrap.min.css';
		fs.createReadStream(bootstrapcssFile)
			.pipe(fs.createWriteStream(cssDir + '/vendor/bootstrap.min.css'));
		console.log(cssDir + '/vendor/bootstrap.min.css file created');

	};

	exports.GenerateJsFiles = function(dirStruct)
	{
		var outputDir 			= dirStruct.outputDir;
		var serverDir 			= dirStruct.serverDir;
		var jsDir 				= dirStruct.jsDir;
		var jsVendorDirectory 	= jsDir + '/vendor/';
		
		var bootstrapjsFile 	= { srcPath: './public/prereq/public/js/vendor/', file: 'bootstrap.min.js', destPath: jsVendorDirectory };
		var angularjsFile 		= { srcPath: './public/prereq/public/js/vendor/', file: 'angular.min.js', destPath: jsVendorDirectory };
		var angularroutejsFile 	= { srcPath: './public/prereq/public/js/vendor/', file: 'angular-route.min.js', destPath: jsVendorDirectory };
		var jqueryFile 			= { srcPath: './public/prereq/public/js/vendor/', file: 'jquery.js', destPath: jsVendorDirectory };
		var appJsFile 			= { srcPath: './public/prereq/public/js/', file: 'app.js', destPath: jsDir };
		var serviceJsFile 		= { srcPath: './public/prereq/public/js/', file: 'services.js', destPath: jsDir };
		var serverJsFile 		= { srcPath: './public/prereq/', file: 'server.js', destPath: outputDir };
		var serviceControllerJsFile = { srcPath: './public/prereq/server/', file: 'serviceController.js', destPath: serverDir };

		var jsFiles = [];
		
		jsFiles.push(bootstrapjsFile);
		jsFiles.push(angularjsFile);
		jsFiles.push(angularroutejsFile);
		jsFiles.push(jqueryFile);
		jsFiles.push(appJsFile);
		jsFiles.push(serviceJsFile);
		jsFiles.push(serverJsFile);
		jsFiles.push(serviceControllerJsFile);

		console.log('creating js files');
		
		jsFiles.forEach(function(jsFile){

			var src 	= jsFile.srcPath + jsFile.file;
			var dest 	= jsFile.destPath + jsFile.file;
			
			fs.createReadStream(src)
				.pipe(fs.createWriteStream(dest));
			
			console.log(jsFile.file + ' created successfully');
		
		});


	};

	exports.GenerateHtmlFiles = function(dirStruct)
	{
		var partialsDir = dirStruct.partialsDir;
		var outputDir   = dirStruct.outputDir;
		var publicDir   = dirStruct.publicDir;

		var topNav 		= { srcPath: './public/prereq/public/partials/', file: 'top_navbar.html', destPath: partialsDir };
		var bottomNav 	= { srcPath: './public/prereq/public/partials/', file: 'bottom_navbar.html', destPath: partialsDir };
		var home 		= { srcPath: './public/prereq/public/partials/', file: 'home.html', destPath: partialsDir };
		var index 		= { srcPath: './public/prereq/public/', file: 'index.html', destPath: publicDir };

		var htmlFiles = [];
		htmlFiles.push(topNav);
		htmlFiles.push(bottomNav);
		htmlFiles.push(home);
		htmlFiles.push(index);

		dirStruct.htmlFiles = htmlFiles;

		console.log('creating html files');
		
		htmlFiles.forEach(function(htmlFile){

				var src 	= htmlFile.srcPath + htmlFile.file;
				var dest 	= htmlFile.destPath + htmlFile.file;
				
				console.log(htmlFile.file + ' to be created');
				
				fs.createReadStream(src)
					.pipe(fs.createWriteStream(dest));
				
				console.log(htmlFile.file + ' created successfully');
			
		});

		console.log('html complete');
	};

	// exports.GeneratePartialHtmlFiles = function (formContent, fs){
	// 		// var htmlGenerator = require('htmlGenerator.js');
	// 		// htmlGenerator.
 //      		var htmlGenerator = require(__dirname + '/htmlGenerator.js');
	// 		htmlGenerator.WriteIndexFile(fs);
	// 		generate_top_nav(fs);
	// 		generate_bottom_nav();
	// 		generate_form(formContent,fs);
	// 	};

	// exports.GenerateJsFiles = function(fs)
	// {
	// 	generate_app_js(fs);
	// };

	var generate_app_js = function(fs)
	{
		var file_lines = [];
		file_lines.push('var mainApp = angular.module("mainApp",["ngRoute"]);');
		file_lines.push("mainApp.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {");
		file_lines.push("$routeProvider.when('/',{");
		file_lines.push("templateUrl: 'partials/home.html',");
		file_lines.push("});");
		file_lines.push("}]);");
		

			var dir = './public/output';
			var appJsFile = dir + '/js/app.js';
			
			fs.open(appJsFile,'a',function(err){
				console.log('appJsFile created successfully');
				
				file_lines.forEach(function(file_line){
					fs.appendFileSync(appJsFile, file_line);
					
				});
			
			});
	
	};

	var generate_top_nav = function (fs)
		{
			var file_lines = [];
			file_lines.push('<nav class="navbar navbar-inverse navbar-fixed-top">');
			file_lines.push('<div class="navbar-header">');
			file_lines.push('<a class="navbar-brand" href="#home/buy"><big><strong>Website Title</strong></big></a>');
			file_lines.push('<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#top-nav">');
			file_lines.push('<span class="icon-bar"></span>');
			file_lines.push('<span class="icon-bar"></span>');
			file_lines.push('<span class="icon-bar"></span>');
			file_lines.push('</button>');
			file_lines.push('</div>');
			file_lines.push('<div id="top-nav" class="navbar-collapse collapse">');
			file_lines.push('<ul class="nav navbar-nav pull-right">');
			file_lines.push('<li><a style="color:#fff;" href="#">Log In/a></li>');
			file_lines.push('<li><a style="color:#fff;" href="#">Sign Up</a></li>');
			file_lines.push('</ul>');
			file_lines.push('</div>');
			file_lines.push('</nav>');


			var dir = './public/output';
			var topNavHtmlFile = dir + '/partials/top_navbar.html';
			
			fs.open(topNavHtmlFile,'a',function(err){
				console.log('topNavHtmlFile created successfully');
				
				file_lines.forEach(function(file_line){
					fs.appendFileSync(topNavHtmlFile, file_line);
					// fs.appendFileSync(topNavHtmlFile, file_line, function(err1){
					// 	if(!err1)
					// 	{
					// 		console.log('topNavHtmlFile written successfully');
					// 	}
					// 	else
					// 	{
					// 		console.log('error occured while writing: ' + err1);
					// 	}
					// });
			
				});
			
			});
		}

	var generate_bottom_nav = function ()
		{

		};

	var generate_form = function (formContent, fs)
		{
			var dir = './public/output';
			var formHtmlFile = dir + '/partials/home.html';
			fs.open(formHtmlFile,'w',function(err){
				console.log('formHtmlFile created successfully');
				fs.writeFile(formHtmlFile, formContent, function(err1){
					if(!err1)
					{
						console.log('formHtmlFile written successfully');
					}
					else
					{
						console.log('error occured while writing: ' + err1);
					}
				});
			});
		};

// }