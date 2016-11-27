var mainApp = angular.module("mainApp",['ngRoute']);

mainApp.config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {

    
    $routeProvider.when('/',{
        templateUrl: 'partials/home.html',
        controller: 'mainController'
    });

}]);


mainApp.run(function($rootScope, RESTService){
    $rootScope.restService = RESTService;
});

mainApp.controller('mainController', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {

	

}]);
