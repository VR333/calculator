export function display(app) {
    app.directive('display', function(){
        return {
            restrict: 'E',
            controllerAs: 'ctrl',
            controller: ctrl,
            templateUrl: './app/components/calculator/diractives/display/display.html'
        };

        function ctrl($scope, operationsService) {
            this.topScreen = operationsService.getTopScreen();
            this.botScreen = operationsService.getBotScreen();

            $scope.$on('btnClick', (event) => {
                this.topScreen = operationsService.getTopScreen();
                this.botScreen = operationsService.getBotScreen();
            });
        }
    });
}
