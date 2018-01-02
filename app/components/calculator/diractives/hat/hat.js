const app = angular.module('hat', []);

app.directive('hat', function(){
    return {
        restrict: 'E',
        templateUrl: './app/components/calculator/diractives/hat/hat.html',
        controllerAs: 'hat',
        controller: function() {}
    };
});
