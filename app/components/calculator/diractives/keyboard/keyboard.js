module.exports = function (app) {
    app.directive('keyboard', function(){
        return {
            restrict: 'E',
            controllerAs: 'keyboard',
            controller: ctrl,
            templateUrl : './app/components/calculator/diractives/keyboard/keyboard.html'
        };

        function ctrl() {}
    });
}
