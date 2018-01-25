export function keyboard(app) {
    app.directive('keyboard', function(){
        return {
            scope: true,
            restrict: 'E',
            controllerAs: 'ctrl',
            controller: ctrl,
            templateUrl : './app/components/calculator/diractives/keyboard/keyboard.html'
        };

        function ctrl() {}
    });
}
