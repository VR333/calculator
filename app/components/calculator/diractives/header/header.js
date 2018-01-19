module.exports = function (app) {
    app.directive('header', function(){
        return {
            scope: true,
            restrict: 'E',
            controllerAs: 'ctrl',
            controller: ctrl,
            templateUrl: './app/components/calculator/diractives/header/header.html'
        };

        function ctrl() {}
    });
}
