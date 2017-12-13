(function(){
  let app = angular.module('calc-button', []);
  app.directive('button', function(){
    return {
      restrict: 'E',
      templateUrl: './app/directives/button/button.html',
      controller: function($scope) {
        this.arr = ['0','1','2','3','4','5','6','7','8','9','.', '+','-','*','/', '='];
        this.toggle = true;

        this.reset = () => {
          $scope.first = '0';
          $scope.second = '';
          $scope.operator = undefined;
          this.toggle = true;
        };

        this.back = () => {
          if (this.toggle) {
            if ($scope.first.length === 1) {
              $scope.first = '0';
              return true;
            }
            $scope.first = $scope.first.slice(0, -1);
            return true;
          }

          if ($scope.second.length === 1) {
              $scope.second = '';
              return true;
          }
          $scope.second = $scope.second.slice(0, -1);
        }

        this.setValue = value => {
          if (this.toggle) {
            this.checkFirstInput(value);
          } else {
            this.checkSecondInput(value);
          }
        };

        this.checkFirstInput = input => {
          if (this.checkFirstSymbol(input) ) {
            this.checkIfInputDigit(input);
          }
        };

        this.checkFirstSymbol = input => {
          if ($scope.first === '0' && !this.IsInputNaN(input) ) {
            $scope.first = input;
            return false;
          }

          if ($scope.first === '-' && input === '-') {
            $scope.first = '0';
            return false;
          }

          if ($scope.first === '0' && input === '-') {
            $scope.first = input;
            return false;
          }
          return true;

        };

        this.checkIfInputDigit = input => {
          if ( this.IsInputNaN(input) ) {
              if (input !== '=') {
                $scope.operator = input;
                this.toggle = false;
              }
            } else {
              $scope.first = $scope.first.concat(input);
            }
        };


        this.checkSecondInput = input => {
          if ( $scope.second === '' && !this.IsInputNaN(input) ) {
            $scope.second = input;
          } else {
            if (!this.IsInputNaN(input)) {
              $scope.second = $scope.second.concat(input);
            }

          }

          if ( this.IsInputNaN(input) ) {

            if (input !== '=' ) {
              this.toggle = false;
              if ($scope.second !== '') {
                this.makeSomeMath();
              }
              this.toggle = false;
              $scope.operator = input;
            }else {
              this.makeSomeMath();
            }
          }

        };

        this.makeSomeMath = value => {
          switch($scope.operator) {
            case '+':
                    this.add();
                    break;
            case '*':
                    this.multiple();
                    break;
            case '-':
                    this.minus();
                    break;
            case '/':
                    this.divide();
                    break;
            }
            $scope.second = '';
            $scope.operator = '';
            this.toggle = true;
        };

        this.add = () => {
          $scope.first = Number($scope.first) + Number($scope.second);
        };

        this.multiple = () => {
          $scope.first = Number($scope.first) * Number($scope.second);
        };

        this.minus = () => {
          $scope.first =  Number($scope.first) - Number($scope.second);
        };

        this.divide = () => {
          $scope.first = Number($scope.first) / Number($scope.second);
        };

        this.IsInputNaN = input => isNaN(Number(input));
      },
      controllerAs: 'button'
    };
  });
})();
