var mainApp = angular.module("mainApp",['ngRoute']);

mainApp.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {

    
    $routeProvider.when('/',{
        templateUrl: 'partials/home.html',
    });

    $routeProvider.when('/formCreate',{
        templateUrl: 'partials/form_create.html',
        controller: 'mainController'
    });

    $routeProvider.when('/home/:searchfor',{
        templateUrl: 'partials/re/home.html',
        controller: 'mainController'
    });

}]);


mainApp.run(function($rootScope, RESTService){
    $rootScope.restService = RESTService;
});

mainApp.controller('mainController', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
	$scope.tool_ctl_list = [];
	$scope.ctl_list = [];
	var ctl_list = [];
	console.log('contr called');

	// $scope.curr_ctl = {};
	var tool_ctl = {};
	tool_ctl.ctl_type = 'text';
	tool_ctl.ctl_title = 'Text Field';
	$scope.tool_ctl_list.push(tool_ctl);

	tool_ctl = {};
	tool_ctl.ctl_type = 'dropdown';
	tool_ctl.ctl_title = 'Dropdown';
	$scope.tool_ctl_list.push(tool_ctl);

	tool_ctl = {};
	tool_ctl.ctl_type = 'button';
	tool_ctl.ctl_title = 'Button';
	$scope.tool_ctl_list.push(tool_ctl);

	tool_ctl = {};
	tool_ctl.ctl_type = 'datagrid';
	tool_ctl.ctl_title = 'Datagrid';
	$scope.tool_ctl_list.push(tool_ctl);

	$scope.current_tool_item = $scope.tool_ctl_list[0];
	$scope.selectTool = function(tool_item){
		$scope.current_tool_item = tool_item;
		//curr_ctl = {};
	}

	$scope.addField = function(ctl_item){
		console.log('called');
		var tool_ctl_type = $scope.current_tool_item.ctl_type;
		var temp_ctl_item = {};
		temp_ctl_item['fieldName'] = ctl_item['fieldName'];
		temp_ctl_item['labelText'] = ctl_item['labelText'];
		temp_ctl_item['ctlType']    = tool_ctl_type;

		if(tool_ctl_type == 'dropdown')
		{
			temp_ctl_item['drpItems'] = [];
			angular.forEach(ctl_item.options, function(optionItem){
				temp_ctl_item['drpItems'].push(optionItem);
			});
		}


		$scope.ctl_list.push(temp_ctl_item);
		ctl_item.labelText = '';
		ctl_item.fieldName = '';
		ctl_item.options = [];
	}

    $scope.restService.get('get1', function (data) {
            // $rootScope.constants = data[0];
            console.log(data);
        }
    );

    $scope.generateForm = function(){
		var url = '/generate';
		var frmData = {};
		frmData.ctl_list = $scope.ctl_list;
		console.log(frmData);
	    $scope.restService.post(url, frmData, function (data) {
	            // $rootScope.constants = data[0];
	            console.log(data);
	            // $("#genArea").html(data);
	        }
	    );    	

    };

    $scope.preview = function(){
		var url = '/preview';
		var frmData = {};
		frmData.ctl_list = $scope.ctl_list;
		console.log(frmData);
	    $scope.restService.post(url, frmData, function (data) {
	            // $rootScope.constants = data[0];
	            console.log(data);
	            $("#genArea").html(data);
	        }
	    );    	

    };


}]);
