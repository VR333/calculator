const app = angular.module('navigator', []);

app.directive('navigator', function(){
    return {
        restrict: 'E',
        controllerAs: 'navigator',
        controller: navigateCtrl,
        templateUrl : './app/components/calculator/diractives/navigator/navigator.html'
    };

    function navigateCtrl() {}
});
