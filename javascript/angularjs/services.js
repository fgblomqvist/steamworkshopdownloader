(function () {
    'use strict';

    angular.module('steamWorkshopDownloaderApp.services', ['ngResource'])
        .factory('SteamWorkshop', function ($resource) {
            return $resource('/api/workshop/:wid', {});
        });
}());