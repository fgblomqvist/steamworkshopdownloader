'use strict';

function IndexController($scope, SteamWorkshop) {

    $scope.getAddon = function() {

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

        SteamWorkshop.get({
            wid: matches[1]
        }, function(response) {
            $scope.message = "";
            $scope.file = response;
            $scope.loading = false;

        }, function(error) {
            $scope.file = {};
            $scope.message = error.data.message;
            $scope.loading = false;
        });
    };
}