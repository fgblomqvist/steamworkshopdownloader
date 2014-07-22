'use strict';

angular.module('steamWorkshopDownloaderApp', ['ngRoute'])
	.config(['$routeProvider', '$locationProvider', '$interpolateProvider',
		function($routeProvider, $locationProvider, $interpolateProvider) {

        // change the tags so they don't conflict with Jinja2 template tags
        $interpolateProvider.startSymbol('{[{').endSymbol('}]}');

		$routeProvider
		.when('/', {
			templateUrl: 'static/partials/home.html',
			controller: IndexController
		})
		.when('/about', {
			templateUrl: 'static/partials/about.html',
			controller: AboutController
		})
		.otherwise({
			redirectTo: '/'
		});

		$locationProvider.html5Mode(true);
	}]);