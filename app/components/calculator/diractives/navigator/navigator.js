const app = angular.module('navigator', []);

app.directive('navigator', function(){
    return {
        restrict: 'E',
        controllerAs: 'navigator',
        controller: navigateCtrl,
        templateUrl : './app/components/calculator/diractives/navigator/navigator.html'
    };

    function navigateCtrl() {
        this.toggle = 0;
        this.active = "Standard";

        this.changeToggle = (value) => {
            this.toggle = value;

            if (this.toggle) {
                document.getElementById('hider').style.left = '0px';
            } else {
                document.getElementById('hider').style.left = '-250px';
            }
        };

    }
});
