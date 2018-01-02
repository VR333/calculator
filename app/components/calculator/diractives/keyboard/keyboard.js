const app = angular.module('keyboard', []);

app.directive('keyboard', function(){
    return {
        restrict: 'E',
        controllerAs: 'keyboard',
        bindToController: {
            first: '=',
            second: '=',
            operator: '='
        },
        controller: keyboardCtrl,
        templateUrl : './app/components/calculator/diractives/keyboard/keyboard.html'
    };

    function keyboardCtrl() {}
});
