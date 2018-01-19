module.exports = function (app) {
    app.directive('display', function(){
        return {
            restrict: 'E',
            controllerAs: 'display',
            controller: ctrl,
            templateUrl: './app/components/calculator/diractives/display/display.html'
        };

        function ctrl($scope, operationsService) {
            $scope.topScreen = operationsService.topScreen;
            $scope.botScreen = operationsService.botScreen;
        }
    });
}
