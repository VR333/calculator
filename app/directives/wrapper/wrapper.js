(function(){
  const app = angular.module('calculator', []);

  app.directive('calculator', function(){
    return {
      restrict: 'E',
      templateUrl : './app/directives/wrapper/wrapper.html',
      controllerAs: 'ctrl',
      controller: function() {
        this.first = '0';
        this.second = '';
        this.operator = '';

        this.list = [
        'Scientific', 'Programmer', 'Date calculation', 'Converter',
        'Currency', 'Volume', 'Length','Weight and Mass','Temperature',
        'Energy','Area','Speed','Time','Power','Data','Pressure','Angle'
        ];

        this.active = 'Standard'

        this.toggle = 0;

        this.changeToggle = (value) => {
          this.toggle = value;

          if (this.toggle) {
            document.getElementById('hider').style.width = '250px';
          } else {
            document.getElementById('hider').style.width = '0px';
          }

        };

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
