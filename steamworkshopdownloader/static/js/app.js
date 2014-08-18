'use strict';

angular.module('steamWorkshopDownloaderApp', ['ui.router', 'steamWorkshopDownloaderApp.filters'])
	.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', '$interpolateProvider',
		function($urlRouterProvider, $stateProvider, $locationProvider, $interpolateProvider) {

        // change the tags so they don't conflict with Jinja2 template tags
        $interpolateProvider.startSymbol('{[{').endSymbol('}]}');

        $urlRouterProvider.otherwise('/');

		$stateProvider
		.state('home', {
            url: '/',
			templateUrl: 'static/partials/home.html',
			controller: IndexController
		})

        $locationProvider.html5Mode(true);
	}]);