module.exports = function (app) {
    app.directive('btn', function(){
        return {
            restrict: 'E',
            controllerAs: 'btn',
            controller: ctrl,
            templateUrl: './app/components/calculator/diractives/btn/btn.html'
        };

        function ctrl($element, operationsService, $scope) {
            this.type = $element.attr('type');
            this.data = $element.attr('data');
            this.$scope = $scope;
            $element[0].innerText = $element.attr('data');

            this.tooltip = document.getElementsByClassName('m-btn tooltip');
            this.tooltip[0].innerHTML = 'M+<span class="tooltiptext">Memory add</span>';
            this.tooltip[1].innerHTML = 'M-<span class="tooltiptext">Memory subtract</span>';
            this.tooltip[2].innerHTML = 'MS<span class="tooltiptext">Memory store</span>';

            $element.on('click', () => {
                operationsService.btnClick(this.type, this.data);
                this.$scope.$apply();
            });

            // this.handleClick = () => {
            //     operationsService.btnClick('', '');
            // };
        }
    });
}
