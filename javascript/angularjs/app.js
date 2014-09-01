(function () {
    'use strict';

    angular.module('steamWorkshopDownloaderApp', ['ui.router', 'steamWorkshopDownloaderApp.controllers', 'steamWorkshopDownloaderApp.filters', 'steamWorkshopDownloaderApp.services'])
        .config(function ($urlRouterProvider, $stateProvider, $locationProvider, $interpolateProvider) {

                // change the tags so they don't conflict with Jinja2 template tags
                $interpolateProvider.startSymbol('{[{').endSymbol('}]}');

                $urlRouterProvider.otherwise('/');

                $stateProvider
                    .state('home', {
                        url: '/',
                        templateUrl: '/static/partials/home.html',
                        controller: 'IndexCtrl'
                    })
                    .state('home.view', {
                        url: 'view/{wid:[0-9]+}',
                        templateUrl: '/static/partials/home-view.html',
                        controller: 'ViewCtrl'
                    });

                $locationProvider.html5Mode(true);

            })
        .run(function ($rootScope, $location) {
            $rootScope.$on('$stateChangeSuccess',
                function (event, toState, toParams, fromState, fromParams) {
                    ga('send', 'pageview', { page: $location.path() });
                });
        });
}());