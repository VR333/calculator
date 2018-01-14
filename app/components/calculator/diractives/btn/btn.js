const app = angular.module('btn', []);

app.directive('btn', function(){
    return {
        restrict: 'E',
        transclude: true,
        controllerAs: 'btn',
        controller: btnCtrl,
        templateUrl: './app/components/calculator/diractives/btn/btn.html'
    };

    function btnCtrl($scope) {

        this.handleEmit = (type, data) => {
            $scope.$emit('btnEvent', {inputType: type, inputData: data});
        };
    }
});
