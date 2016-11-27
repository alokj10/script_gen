var exports = module.exports = {};

var fs = require('fs');

exports.WriteToHtml = function(dirStruct, fileName, content)
{
	console.log('underscore init: ' + fileName);

	var u = require('underscore');

	var htmlFiles 	= dirStruct.htmlFiles;
	console.log('no of html files: ' + htmlFiles.length);

	var fileItem = u.findWhere(htmlFiles, { file: fileName }); 

	if(fileItem)
	{
		var fileToWrite = fileItem.destPath + fileName;
		console.log('write to: ' + fileToWrite);
		
		fs.open(fileToWrite, 'a', function(err){
			fs.appendFile(fileToWrite, content);
		});
		console.log('file written: ' + fileToWrite);
	}
	else
	{
		console.log('file not found: ' + fileName);
	}
}