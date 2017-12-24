(function(){
  require('./diractives/keyboard/keyboard.js');
  require('./diractives/button/button.js');
  require('./diractives/display/display.js');
  require('./diractives/hat/hat.js');
  require('./diractives/menu/menu.js');
  require('./diractives/navigator/navigator.js');

  const app = angular.module('calculator', ['keyboard', 'display', 'buttons', 'hat', 'menu', 'navigator']);

  app.directive('calculator', function(){
    return {
      restrict: 'E',
      templateUrl : './app/components/calculator/calculator.html',
      controllerAs: 'ctrl',
      controller: function() {
        this.first = '0';
        this.second = '';
        this.operator = '';

        this.toggle = 0;

        this.changeToggle = (value) => {
          this.toggle = value;

          if (this.toggle) {
            document.getElementById('hider').style.left = '0px';
          } else {
            document.getElementById('hider').style.left = '-250px';
          }
        };

        this.active = 'Standard';

        this.makeActiveTab = (event) => {
          console.log(event.currentTarget.innerText);
          if (event.currentTarget.className !== 'ng-scope title') {
            document.getElementsByClassName('active')[0]
                    .className = 'ng-scope version';
            event.currentTarget.className = 'ng-scope version active';
            this.active = event.currentTarget.innerText;
          }
        };
      }
    };
  });
})();
