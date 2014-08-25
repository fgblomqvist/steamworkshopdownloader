'use strict';

angular.module('steamWorkshopDownloaderApp.controllers', [])
    .controller('IndexCtrl', ['$scope', '$state', function ($scope, $state) {

        $scope.view = function() {

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

            $scope.loading = true;

            $state.go('home.view', {wid: matches[1]});
        }

    }])
    .controller('ViewCtrl', ['$scope', '$stateParams', 'SteamWorkshop', function ($scope, $stateParams, SteamWorkshop) {

        // check if the user came here directly (input box will be empty
        if (!$scope.$parent.steamworkshop_url)
            // fill in the input box for the looks
            $scope.$parent.steamworkshop_url = 'http://steamcommunity.com/sharedfiles/filedetails/?id=' + $stateParams['wid'];

        $scope.getAddon($stateParams['wid']);


        $scope.getAddon = function (wid) {

            SteamWorkshop.get({
                wid: wid
            }, function (response) {
                $scope.message = "";
                $scope.file = response;
                $scope.loading = false;

                ga('send', 'event', 'Addon', 'View');

            }, function (error) {
                $scope.file = {};
                $scope.message = error.data.message;
                $scope.loading = false;
            });

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
        };

    }]);