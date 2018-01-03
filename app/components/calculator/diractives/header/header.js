const app = angular.module('header', []);

app.directive('header', function(){
    return {
        restrict: 'E',
        controllerAs: 'header',
        controller: hatCtrl,
        templateUrl: './app/components/calculator/diractives/header/header.html'
    };

    function hatCtrl() {}
});
