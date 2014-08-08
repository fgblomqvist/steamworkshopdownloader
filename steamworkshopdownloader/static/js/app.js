'use strict';

angular.module('steamWorkshopDownloaderApp', ['ui.router'])
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
		.state('about', {
            url: '/about',
			templateUrl: 'static/partials/about.html',
			controller: AboutController
		});

        $locationProvider.html5Mode(true);
	}]);