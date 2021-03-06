(function () {
    'use strict';

    angular.module('steamWorkshopDownloaderApp.controllers', [])
        .controller('IndexCtrl', function ($scope, $state) {

            $scope.view = function () {

                // reset the message
                $scope.message = "";

                if (isBlank($scope.steamworkshop_url)) {
                    $scope.file = {};
                    return;
                }

                // filter out the id of the url
                var matches = $scope.steamworkshop_url.match(/id=(\d+)/);

                // check for invalid url
                if (!matches) {
                    $scope.message = "That URL is DEFINITELY not correct!";
                    return;
                }

                $state.go('home.view', {wid: matches[1]});
            }

        })
        .controller('ViewCtrl', function ($scope, $stateParams, SteamWorkshop) {

            // check if the user came here directly (input box will be empty
            if (!$scope.$parent.steamworkshop_url)
            // fill in the input box for the looks
                $scope.$parent.steamworkshop_url = 'http://steamcommunity.com/sharedfiles/filedetails/?id=' + $stateParams['wid'];

            $scope.getAddon = function (wid) {

                $scope.$parent.loading = true;

                SteamWorkshop.get({
                    wid: wid
                }, function (response) {
                    $scope.$parent.message = "";
                    $scope.file = response;
                    $scope.$parent.loading = false;

                    ga('send', 'event', 'Addon', 'View');

                }, function (error) {
                    $scope.file = {};
                    $scope.$parent.message = error.data.message;
                    $scope.$parent.loading = false;
                });
            };

            $scope.download = function () {
                if (!$scope.file.title)
                    return;

                ga('send', 'event', {
                    'eventCategory': 'Addon',
                    'eventAction': 'Download',
                    'hitCallback': function () {
                        document.location = $scope.file.file_url;
                    }
                });
            };

            // get the addon data when the view has loaded
            $scope.getAddon($stateParams['wid']);

        });
}());