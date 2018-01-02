const app = angular.module('display', []);

app.directive('display', function(){
    return {
        restrict: 'E',
        bindToController: {
            first: '=',
            second: '=',
            operator: '='
        },
        controllerAs: 'display',
        controller: displayCtrl,
        templateUrl: './app/components/calculator/diractives/display/display.html'
    };

    function displayCtrl() {
        this.checkForDoubleScreenNeed = () => {
            if (this.first && this.operator) {
                return true;
            }
            return false;
        };
    }
});
