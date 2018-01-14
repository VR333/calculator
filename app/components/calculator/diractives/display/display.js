require('./../../servises/calculate.js');

// 'operationsService'

const app = angular.module('display', ['operationsService']);

app.directive('display', function(){
    return {
        restrict: 'E',
        controllerAs: 'display',
        controller: displayCtrl,
        templateUrl: './app/components/calculator/diractives/display/display.html'
    };

    function displayCtrl($scope, operationsService) {
        $scope.first = operationsService.first;
        $scope.second = operationsService.second;
        $scope.operator = operationsService.operator;

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

            // console.log(data.inputData);
        });

        this.checkForDoubleScreenNeed = () => {
            if ($scope.first.value && $scope.operator.value) {
                return true;
            }
            return false;
        };
    }
});
