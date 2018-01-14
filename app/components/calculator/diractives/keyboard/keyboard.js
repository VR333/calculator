const app = angular.module('keyboard', []);

app.directive('keyboard', function(){
    return {
        restrict: 'E',
        controllerAs: 'keyboard',
        controller: keyboardCtrl,
        templateUrl : './app/components/calculator/diractives/keyboard/keyboard.html'
    };

    function keyboardCtrl() {}
});
