'use strict';

// simple stub that could use a lot of work...
mainApp.factory('RESTService',
    function ($http) {
        return {
            get:function (url, callback) {
                return $http({method:'GET', url:url}).
                    success(function (data, status, headers, config) {
                        callback(data);
                        //console.log(data.json);
                    }).
                    error(function (data, status, headers, config) {
                        console.log("failed to retrieve data");
                    });
            },
            post:function (url, data, callback) {
                return $http({method: 'POST', data: data, url:url}).
                    success(function(data, status, headers, config) {
                        callback(data);
                    }).
                    error(function(data, status, headers, config) {
                        console.log('failed to save data');
                    })
            }
        };
    }
);

