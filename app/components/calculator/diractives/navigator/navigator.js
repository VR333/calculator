const app = angular.module('navigator', []);

app.directive('navigator', function(){
    return {
        restrict: 'E',
        templateUrl : './app/components/calculator/diractives/navigator/navigator.html',
        controllerAs: 'navigator',
        controller: function() {}
    };
});
