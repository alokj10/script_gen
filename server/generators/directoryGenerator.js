var exports = module.exports = {};

var fs = require('fs');

exports.CreateDirectoryPackage = function(uniqueId)
{

	var dir = './public/output';

	var outDir = '';
	var sessionDir = './public/output/' + uniqueId + '/';
	if(!fs.existsSync(sessionDir))
	{
		fs.mkdirSync(sessionDir);
		outDir = sessionDir + '1001';
		console.log(outDir);
	}

	fs.readdirSync(sessionDir).forEach(function(file){
		console.log(file);
		var dirName = parseInt(file);
		var newName = dirName + 1;
		outDir = sessionDir + newName.toString();
		console.log(outDir);
	});

	return GenerateDirectoryStructure(outDir);

}



function GenerateDirectoryStructure(dir)
{
	console.log('creating output directory');

	var directoryStructure = {};

	if(!fs.existsSync(dir))
	{
		fs.mkdirSync(dir);
		console.log('output directory created');
		directoryStructure.outputDir = dir + '/';

		var moduleDir = dir + '/node_modules';
		fs.mkdirSync(moduleDir);
		console.log('modules directory created');
		directoryStructure.moduleDir = moduleDir + '/';


		var publicDir = dir + '/public';
		fs.mkdirSync(publicDir);
		console.log('public directory created');
		directoryStructure.publicDir = publicDir + '/';

		var serverDir = dir + '/server';
		fs.mkdirSync(serverDir);
		console.log('server directory created');
		directoryStructure.serverDir = serverDir + '/';

		var partialDir = publicDir + '/partials';
		fs.mkdirSync(partialDir);
		console.log('partials directory created');
		directoryStructure.partialsDir = partialDir + '/';


		var cssDir = publicDir + '/css';
		fs.mkdirSync(cssDir);
		console.log('css directory created');
		directoryStructure.cssDir = cssDir + '/';
		
		var cssVendorDirectory = cssDir + '/vendor';
		fs.mkdirSync(cssVendorDirectory);
		console.log('css vendor directory created');
		directoryStructure.cssVendorDirectory = cssVendorDirectory + '/';

		var jsDir = publicDir + '/js';
		fs.mkdirSync(jsDir);
		console.log('js directory created');
		directoryStructure.jsDir = jsDir + '/';
		
		var jsVendorDirectory = jsDir + '/vendor';
		fs.mkdirSync(jsVendorDirectory);
		console.log('js vendor directory created');
		directoryStructure.jsVendorDirectory = jsVendorDirectory + '/';

		return directoryStructure;

	
	}

}