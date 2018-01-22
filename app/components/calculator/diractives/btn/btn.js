module.exports = function (app) {
    app.directive('btn', function(){
        return {
            scope: true,
            bindToController: {
                type: '@',
                value: '@',
                tooltip: '@'
            },
            restrict: 'E',
            controllerAs: 'ctrl',
            controller: ctrl,
            templateUrl: './app/components/calculator/diractives/btn/btn.html'
        };

        function ctrl(operationsService, $scope) {
            // this.tip = document.getElementsByClassName('tooltip');

            // this.tip[0].innerHTML = 'M+<span class="tooltiptext">Memory add</span>';
            // this.tip[1].innerHTML = 'M-<span class="tooltiptext">Memory subtract</span>';
            // this.tip[2].innerHTML = 'MS<span class="tooltiptext">Memory store</span>';

            this.handleClick = () => {
                operationsService.btnClick(this.type, this.value);
            };
        }
    });
}
