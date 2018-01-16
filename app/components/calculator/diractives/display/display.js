require('./../../servises/calculate.js');

const app = angular.module('display', ['operationsService']);

app.directive('display', function(){
    return {
        restrict: 'E',
        controllerAs: 'display',
        controller: displayCtrl,
        templateUrl: './app/components/calculator/diractives/display/display.html'
    };

    function displayCtrl($scope, operationsService) {
        $scope.topScreen = operationsService.topScreen;
        $scope.botScreen = operationsService.botScreen;

        $scope.$on('btnEvent', function (event, data) {
            switch (data.inputType) {
                case 'number':
                                operationsService.setValue(data.inputData);
                                break;
                case 'operator':
                                operationsService.setOperator(data.inputData);
                                break;
                case 'operation':
                                operationsService.checkOperation(data.inputData);
                                break;
            }
        });
    }
});
