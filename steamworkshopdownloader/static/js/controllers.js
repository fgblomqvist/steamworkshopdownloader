'use strict';

function IndexController($scope, $http) {

    $scope.getAddon = function() {

        // reset the message
        $scope.message = "";

        // filter out the id of the url
        var wid = $scope.steamworkshop_url.match(/id=(\d+)/)[1];

        // check for invalid url
        if (!wid)
            return;

        $http.post("/api/workshop/" + wid)
            .success(function(data) {
                $scope.message = "";
                $scope.file = data;
            })
            .error(function(data) {
                $scope.file = {};
                $scope.message = data.message;
            });
    };
}