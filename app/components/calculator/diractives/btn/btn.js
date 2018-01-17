const app = angular.module('btn', []);

app.directive('btn', function(){
    return {
        restrict: 'E',
        controllerAs: 'btn',
        controller: ctrl,
        transclude: true,
        templateUrl: './app/components/calculator/diractives/btn/btn.html'
    };

    function ctrl(operationsService) {
        this.handleClick = (type, data) => {
            operationsService.btnClick(type, data);
        };
    }
});
