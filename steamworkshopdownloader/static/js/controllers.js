'use strict';

function IndexController($scope, $http) {

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

        $http.post("/api/workshop/" + matches[1])
            .success(function(data) {
                $scope.message = "";
                $scope.loading = false;
                $scope.file = data;
            })
            .error(function(data) {
                $scope.file = {};
                $scope.loading = false;
                $scope.message = data.message;
            });
    };
}