module.exports = function (app) {
    app.directive('navigator', function(){
        return {
            restrict: 'E',
            controllerAs: 'navigator',
            controller: ctrl,
            templateUrl : './app/components/calculator/diractives/navigator/navigator.html'
        };

        function ctrl() {
            this.toggle = 0;
            this.active = "Standard";

            this.changeToggle = () => {
                if (this.toggle) {
                    this.toggle = 0;
                } else {
                    this.toggle = 1;
                }

                if (this.toggle) {
                    document.getElementById('hider').style.left = '0px';
                } else {
                    document.getElementById('hider').style.left = '-250px';
                }
            };

        }
    });
}
