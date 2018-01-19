module.exports = function (app) {
    app.directive('display', function(){
        return {
            scope: true,
            restrict: 'E',
            controllerAs: 'ctrl',
            controller: ctrl,
            templateUrl: './app/components/calculator/diractives/display/display.html'
        };

        function ctrl($scope, operationsService) {
            this.topScreen = operationsService.topScreen;
            this.botScreen = operationsService.botScreen;
        }
    });
}
