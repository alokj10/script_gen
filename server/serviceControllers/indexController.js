module.exports.controller = function(app) {

	var sess;
  
    app.get('/', function(req, res) {
	    SetSessionObject(req);

	    res.render('index');
    });

    app.get('/get1', function(req, res) {
	    SetSessionObject(req);

	    res.send('sample');
    });

    app.post('/preview', function(req, res) {
    	SetSessionObject(req);

	    // var hg = require(__dirname + '../generators/htmlGenerator.js');
	    var hg = require(app.get('generatorPath') + 'htmlGenerator.js');
	    var ctl_list = req.body.ctl_list;
	    var html = hg.Generate_html(ctl_list);
	    res.send(html);
    });

    app.post('/generate', function(req, res) {
		// var vm = require('vm');
		// vm.runInThisContext(fs.readFileSync('controllers/fileGenerator.js'));
		// vm.runInThisContext(fs.readFileSync('controllers/htmlGenerator.js'));

		// console.log(__dirname + '/fileGenerator.js');

    	SetSessionObject(req);
	    var fs = require('fs');
		// var fg = require(__dirname + '/fileGenerator.js');
		var fg = require(app.get('generatorPath') + 'fileGenerator.js');
		var hg = require(app.get('generatorPath') + 'htmlGenerator.js');
		var hw = require(app.get('writerPath') + 'htmlWriter.js');
		var dg = require(app.get('generatorPath') + 'directoryGenerator.js');
		var mg = require(app.get('generatorPath') + 'moduleGenerator.js');
		var ag = require(app.get('generatorPath') + 'angularScriptGenerator.js');

		var ctl_list = req.body.ctl_list;

		var html = hg.Generate_html(ctl_list);

		console.log('get session object: ' + req.session);
		var dirStruct = dg.CreateDirectoryPackage(req.session.uniqueId);

		ag.GenerateController(ctl_list);
		
		mg.GenerateModuleFiles(dirStruct);

		fg.GenerateCssFiles(dirStruct.cssDir);

		fg.GenerateJsFiles(dirStruct);

		fg.GenerateHtmlFiles(dirStruct);

		hw.WriteToHtml(dirStruct, 'home.html', html);
		

		// res.send(html);
		console.log('generation complete');
  	});

}

function SetSessionObject(req)
{
	sess = req.session;
	if(!sess.uniqueId)
	{
		var uuid = GenerateUniqueId();
		sess.uniqueId = uuid;
		return;
	}
	console.log('unique id is: ' + sess.uniqueId);
}

function GenerateUniqueId()
{
	var uuid = require('node-uuid');
	var uid = uuid.v1();
	console.log('unique id generated: ' + uid);
	return uid;
}


