export function distance(app) {
    app.directive('distance', function(){
        return {
            scope: true,
            restrict: 'E',
            controllerAs: 'ctrl',
            controller: ctrl,
            templateUrl: './app/components/googleApi/template.html'
        };

        function ctrl() {}
    });
}

