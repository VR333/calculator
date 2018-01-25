export function navigator(app) {
    app.directive('navigator', function(){
        return {
            scope: true,
            restrict: 'E',
            controllerAs: 'navigator',
            controller: ctrl,
            templateUrl : './app/components/calculator/diractives/navigator/navigator.html'
        };

        function ctrl() {
            this.toggle = false;
            this.active = "Standard";

            this.changeToggle = () => {
                this.toggle = !this.toggle;
            };

        }
    });
}
