const app = angular.module('btn', []);

app.directive('btn', function(){
    return {
        restrict: 'E',
        transclude: true,
        controllerAs: 'btn',
        controller: ctrl,
        templateUrl: './app/components/calculator/diractives/btn/btn.html'
    };

    function ctrl(operationsService) {
        this.handleClick = (type, data) => {
            operationsService.btnClick(type, data);
        };
    }
});
