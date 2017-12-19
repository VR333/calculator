(function(){
  const app = angular.module('calculator', []);
  
  app.directive('calculator', function(){
    return {
      restrict: 'E',
      templateUrl : './app/directives/wrapper/wrapper.html',
      controllerAs: 'ctrl',
      controller: function($scope) {
        this.first = '0';
        this.second = '';
        this.operator = '';

        this.toggle = 0;

        this.changeToggle = (value) => {
          this.toggle = value;

          if (this.toggle) {
            document.getElementById('hider').style.width = '250px';
          } else {
            document.getElementById('hider').style.width = '0px';
          }

        }
      }
    };
  });
})();
