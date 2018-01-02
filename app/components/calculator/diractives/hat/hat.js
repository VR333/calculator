const app = angular.module('hat', []);

app.directive('hat', function(){
    return {
        restrict: 'E',
        controllerAs: 'hat',
        controller: hatCtrl,
        templateUrl: './app/components/calculator/diractives/hat/hat.html'
    };

    function hatCtrl() {}
});
