const app = angular.module('header', []);

app.directive('header', function(){
    return {
        restrict: 'E',
        controllerAs: 'header',
        controller: ctrl,
        templateUrl: './app/components/calculator/diractives/header/header.html'
    };

    function ctrl() {}
});
