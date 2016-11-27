var exports = module.exports = {};

exports.GenerateModuleFiles = function(dirStruct)
{
	var moduleDir = dirStruct.moduleDir;
	var preReqModuleFolder = './public/prereq/node_modules/';

	var ncp = require('ncp').ncp;
	ncp.limit = 16;

	ncp(preReqModuleFolder, moduleDir, function(err){
		if(err)
		{
			console.log('error while generating modules: ' + err);
		}
		else
		{
			console.log('modules generated successfully');
		}
	})


}